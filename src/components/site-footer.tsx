import { Coins, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <Image
              className="brand-logo"
              src="/logo.png"
              alt="CASTA"
              width={911}
              height={236}
            />
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

      <aside className="site-container footer-responsible-panel" aria-label="Responsible social casino information">
        <div className="footer-age-badge" aria-label="For adults aged 18 and over">
          18+
        </div>
        <div className="footer-responsible-copy">
          <p>
            This is a free social casino game intended solely for entertainment. No real money gambling is
            offered, no prizes or items of monetary value can be won, and playing this game does not imply
            future success in real-money gambling.
          </p>
          <div className="footer-help-links" aria-label="Help and support websites">
            <strong>Help &amp; support:</strong>
            <a href="https://www.chciodvykat.cz/" target="_blank" rel="noopener noreferrer">
              chciodvykat.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href="https://podaneruce.cz/" target="_blank" rel="noopener noreferrer">
              podaneruce.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href="https://poradna.adiktologie.cz/" target="_blank" rel="noopener noreferrer">
              poradna.adiktologie.cz <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>

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
