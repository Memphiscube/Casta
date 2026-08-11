"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase";

type PlayerProfile = {
  username: string;
  level: number;
  xp: number;
  balance: number;
  streak: number;
};

type AuthContextValue = {
  user: User | null;
  profile: PlayerProfile;
  loading: boolean;
  configured: boolean;
  refreshProfile: () => Promise<void>;
  setGuestBalance: (balance: number) => void;
  signOut: () => Promise<void>;
};

const defaultProfile: PlayerProfile = {
  username: "Traveler",
  level: 7,
  xp: 1640,
  balance: 5000,
  streak: 3,
};

const AuthContext = createContext<AuthContextValue | null>(null);
const GUEST_BALANCE_KEY = "casta_guest_balance";
const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PlayerProfile>(defaultProfile);
  const [loading, setLoading] = useState(supabaseConfigured);

  const loadProfile = useCallback(
    async (userId: string, fallbackEmail?: string) => {
      if (!supabase) return;

      const [{ data: profileRow }, { data: walletRow }, { data: rewardRow }] =
        await Promise.all([
          supabase.from("profiles").select("username,level,xp").eq("id", userId).maybeSingle(),
          supabase.from("wallets").select("balance").eq("user_id", userId).maybeSingle(),
          supabase.from("daily_rewards").select("streak").eq("user_id", userId).maybeSingle(),
        ]);

      setProfile({
        username: profileRow?.username ?? fallbackEmail?.split("@")[0] ?? "Player",
        level: profileRow?.level ?? 1,
        xp: profileRow?.xp ?? 0,
        balance: walletRow?.balance ?? 5000,
        streak: rewardRow?.streak ?? 0,
      });
    },
    [supabase],
  );

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id, user.email);
  }, [loadProfile, user]);

  useEffect(() => {
    const storedBalance = Number(window.localStorage.getItem(GUEST_BALANCE_KEY));
    if (Number.isFinite(storedBalance) && storedBalance >= 0) {
      queueMicrotask(() => {
        setProfile((current) => ({ ...current, balance: storedBalance }));
      });
    }

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        loadProfile(sessionUser.id, sessionUser.email).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) void loadProfile(sessionUser.id, sessionUser.email);
      if (!sessionUser) setProfile(defaultProfile);
    });

    return () => listener.subscription.unsubscribe();
  }, [loadProfile, supabase]);

  const setGuestBalance = useCallback((balance: number) => {
    const safeBalance = Math.max(0, Math.round(balance));
    window.localStorage.setItem(GUEST_BALANCE_KEY, String(safeBalance));
    setProfile((current) => ({ ...current, balance: safeBalance }));
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setProfile(defaultProfile);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured: supabaseConfigured,
        refreshProfile,
        setGuestBalance,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
