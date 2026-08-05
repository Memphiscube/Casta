import { Coins, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark"><Sparkles size={17} /></span>
            <span>CASTA</span>
          </Link>
          <p className="footer-copy">
            Social casino для відпочинку, колекцій і дружнього суперництва.
          </p>
        </div>
        <div className="footer-note">
          <ShieldCheck size={20} />
          <span>18+ · Без ставок і виграшів у реальних грошах</span>
        </div>
        <div className="footer-note">
          <Coins size={20} />
          <span>Віртуальні монети не мають грошової вартості</span>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} CASTA</span>
        <div>
          <Link href="/how-it-works">Як це працює</Link>
          <Link href="/games">Ігри</Link>
          <Link href="/rewards">Нагороди</Link>
          <Link href="/login">Акаунт</Link>
        </div>
      </div>
    </footer>
  );
}
