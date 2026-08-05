-- CASTA MVP: authentication profile, virtual wallet, rewards, game sessions,
-- and a cosmetic-only shop. No real-money value or cash-out path exists.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (char_length(username) between 2 and 30),
  level integer not null default 1 check (level > 0),
  xp integer not null default 0 check (xp >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance bigint not null default 5000 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_rewards (
  user_id uuid primary key references auth.users(id) on delete cascade,
  streak integer not null default 0 check (streak between 0 and 7),
  last_claimed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  status text not null default 'coming_soon' check (status in ('live', 'coming_soon')),
  created_at timestamptz not null default now()
);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  game_slug text not null references public.games(slug),
  wager integer not null check (wager > 0),
  multiplier integer not null check (multiplier >= 0),
  reward bigint not null check (reward >= 0),
  balance_after bigint not null check (balance_after >= 0),
  created_at timestamptz not null default now()
);

create index if not exists game_sessions_user_created_idx
  on public.game_sessions (user_id, created_at desc);

create table if not exists public.shop_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  item_type text not null,
  price bigint not null check (price > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid not null references public.shop_items(id) on delete cascade,
  acquired_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.daily_rewards enable row level security;
alter table public.games enable row level security;
alter table public.game_sessions enable row level security;
alter table public.shop_items enable row level security;
alter table public.inventory enable row level security;

create policy "players read own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "players read own wallet"
  on public.wallets for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "players read own reward state"
  on public.daily_rewards for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "games are public"
  on public.games for select to anon, authenticated
  using (true);

create policy "players read own game sessions"
  on public.game_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "shop catalog is public"
  on public.shop_items for select to anon, authenticated
  using (is_active = true);

create policy "players read own inventory"
  on public.inventory for select to authenticated
  using ((select auth.uid()) = user_id);

grant select on public.profiles, public.wallets, public.daily_rewards,
  public.game_sessions, public.inventory to authenticated;
grant select on public.games, public.shop_items to anon, authenticated;

insert into public.games (slug, title, status)
values
  ('jungle-wheel', 'Jungle Wheel', 'live'),
  ('cherry-club', 'Cherry Club', 'coming_soon'),
  ('moon-mansion', 'Moon Mansion', 'coming_soon'),
  ('gem-society', 'Gem Society', 'coming_soon')
on conflict (slug) do update set title = excluded.title, status = excluded.status;

insert into public.shop_items (slug, name, item_type, price)
values
  ('midnight-avatar', 'Midnight Crown', 'avatar_frame', 2400),
  ('jungle-trail', 'Jungle Trail', 'win_effect', 3200),
  ('coral-card', 'Coral Club', 'profile_theme', 1800),
  ('founder-pin', 'Founder Pin', 'badge', 5000)
on conflict (slug) do update
set name = excluded.name, item_type = excluded.item_type, price = excluded.price;

create or replace function public.handle_new_player()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    left(
      case
        when char_length(coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1), 'Player')) >= 2
          then coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1), 'Player')
        else 'Player'
      end,
      30
    )
  )
  on conflict (id) do nothing;

  insert into public.wallets (user_id, balance)
  values (new.id, 5000)
  on conflict (user_id) do nothing;

  insert into public.daily_rewards (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_player();

create or replace function public.spin_jungle_wheel(p_bet integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_balance bigint;
  v_roll integer;
  v_sector integer;
  v_multiplier integer;
  v_win bigint;
  v_new_balance bigint;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_bet not in (50, 100, 250, 500) then
    raise exception 'Invalid virtual coin wager';
  end if;

  insert into public.wallets (user_id, balance)
  values (v_user_id, 5000)
  on conflict (user_id) do nothing;

  select balance into v_balance
  from public.wallets
  where user_id = v_user_id
  for update;

  if v_balance < p_bet then
    raise exception 'Not enough virtual coins';
  end if;

  v_roll := floor(random() * 1000)::integer;
  if v_roll < 300 then v_sector := 0; v_multiplier := 1;
  elsif v_roll < 350 then v_sector := 1; v_multiplier := 5;
  elsif v_roll < 500 then v_sector := 2; v_multiplier := 2;
  elsif v_roll < 720 then v_sector := 3; v_multiplier := 0;
  elsif v_roll < 800 then v_sector := 4; v_multiplier := 3;
  elsif v_roll < 820 then v_sector := 5; v_multiplier := 10;
  elsif v_roll < 920 then v_sector := 6; v_multiplier := 2;
  else v_sector := 7; v_multiplier := 0;
  end if;

  v_win := p_bet::bigint * v_multiplier;
  v_new_balance := v_balance - p_bet + v_win;

  update public.wallets
  set balance = v_new_balance, updated_at = now()
  where user_id = v_user_id;

  update public.profiles
  set xp = xp + 20, level = greatest(1, ((xp + 20) / 500) + 1), updated_at = now()
  where id = v_user_id;

  insert into public.game_sessions
    (user_id, game_slug, wager, multiplier, reward, balance_after)
  values
    (v_user_id, 'jungle-wheel', p_bet, v_multiplier, v_win, v_new_balance);

  return jsonb_build_object(
    'sector_index', v_sector,
    'multiplier', v_multiplier,
    'win', v_win,
    'balance', v_new_balance
  );
end;
$$;

create or replace function public.claim_daily_reward()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_streak integer;
  v_last_claimed timestamptz;
  v_amount integer;
  v_balance bigint;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  insert into public.daily_rewards (user_id)
  values (v_user_id)
  on conflict (user_id) do nothing;

  insert into public.wallets (user_id, balance)
  values (v_user_id, 5000)
  on conflict (user_id) do nothing;

  select streak, last_claimed_at into v_streak, v_last_claimed
  from public.daily_rewards
  where user_id = v_user_id
  for update;

  if v_last_claimed is not null and v_last_claimed::date = current_date then
    raise exception 'Daily reward already claimed';
  end if;

  if v_last_claimed is not null and v_last_claimed::date = current_date - 1 then
    v_streak := case when v_streak >= 7 then 1 else v_streak + 1 end;
  else
    v_streak := 1;
  end if;

  v_amount := (array[250, 350, 500, 650, 900, 1250, 2500])[v_streak];

  update public.daily_rewards
  set streak = v_streak, last_claimed_at = now(), updated_at = now()
  where user_id = v_user_id;

  update public.wallets
  set balance = balance + v_amount, updated_at = now()
  where user_id = v_user_id
  returning balance into v_balance;

  return jsonb_build_object('amount', v_amount, 'balance', v_balance, 'streak', v_streak);
end;
$$;

create or replace function public.purchase_shop_item(p_item_slug text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_item_id uuid;
  v_price bigint;
  v_balance bigint;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select id, price into v_item_id, v_price
  from public.shop_items
  where slug = p_item_slug and is_active = true;

  if v_item_id is null then
    raise exception 'Item not found';
  end if;

  if exists (
    select 1 from public.inventory
    where user_id = v_user_id and item_id = v_item_id
  ) then
    raise exception 'Item already owned';
  end if;

  select balance into v_balance
  from public.wallets
  where user_id = v_user_id
  for update;

  if v_balance < v_price then
    raise exception 'Not enough virtual coins';
  end if;

  update public.wallets
  set balance = balance - v_price, updated_at = now()
  where user_id = v_user_id
  returning balance into v_balance;

  insert into public.inventory (user_id, item_id)
  values (v_user_id, v_item_id);

  return jsonb_build_object('balance', v_balance, 'item_slug', p_item_slug);
end;
$$;

revoke execute on function public.handle_new_player() from public, anon, authenticated;
revoke execute on function public.spin_jungle_wheel(integer) from public, anon;
revoke execute on function public.claim_daily_reward() from public, anon;
revoke execute on function public.purchase_shop_item(text) from public, anon;

grant execute on function public.spin_jungle_wheel(integer) to authenticated;
grant execute on function public.claim_daily_reward() to authenticated;
grant execute on function public.purchase_shop_item(text) to authenticated;
