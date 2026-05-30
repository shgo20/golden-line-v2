import { contactInfo } from '../data/contact';
import { images } from '../data/images';
import IslamicPattern from './IslamicPattern';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const NAV_LINKS = [
  { key: 'home',      href: '#hero'      },
  { key: 'about',     href: '#about'     },
  { key: 'services',  href: '#services'  },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact',   href: '#contact'   },
];

const SOCIAL = [
  { label:'Instagram', href:'https://instagram.com/goldenline',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { label:'TikTok', href:'https://tiktok.com/@goldenline',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg> },
  { label:'X', href:'https://x.com/goldenline',
    icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label:'Facebook', href:'https://facebook.com/goldenline',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label:'YouTube', href:'https://youtube.com/@goldenline',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function Footer() {
  const { lang } = useLang();
  return (
    <>
      <style>{`
        .footer {
          background: #0A0A0A;
          border-top: 1px solid rgba(168,144,96,0.18);
          padding: 48px 5% 28px;
          position: relative;
          overflow: hidden;
        }
        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .footer-logo { display:flex; align-items:center; text-decoration:none; }
        .footer-logo-img { height: 88px; width: auto; display: block; }
        .footer-logo-fallback { display: none; flex-direction: column; line-height: 1; }
        .footer-logo-top    { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:300; color:#F0EDE6; letter-spacing:.12em; text-transform:uppercase; }
        .footer-logo-bottom { font-family:'DM Sans',sans-serif; font-size:16px; font-weight:400; color:#A89060; letter-spacing:.25em; text-transform:uppercase; }
        .footer-nav { display:flex; gap:24px; list-style:none; flex-wrap:wrap; }
        .footer-nav a { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400; color:#888070; text-decoration:none; letter-spacing:0.08em; text-transform:uppercase; transition:color .2s; }
        .footer-nav a:hover { color:#F0EDE6; }
        .footer-divider {
          border: none;
          height: 1px;
          margin: 0 0 24px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(168,144,96,0.10) 15%,
            rgba(168,144,96,0.40) 50%,
            rgba(168,144,96,0.10) 85%,
            transparent 100%
          );
        }
        .footer-bottom { display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
        .footer-contact { font-family:'DM Sans',sans-serif; font-size:11px; color:#888070; display:flex; gap:16px; flex-wrap:wrap; align-items:center; }
        .footer-contact a { color:#888070; text-decoration:none; transition:color .2s; }
        .footer-contact a:hover { color:#A89060; }
        .footer-social { display:flex; gap:16px; align-items:center; }
        .footer-social a { display:flex; align-items:center; justify-content:center; color:#555048; text-decoration:none; transition:color .25s, transform .25s cubic-bezier(0.34,1.56,0.64,1); }
        .footer-social a:hover { color:#A89060; transform:translateY(-3px) scale(1.18); }
        .footer-copy { width:100%; text-align:center; font-family:'DM Sans',sans-serif; font-size:10px; color:#555; margin-top:20px; letter-spacing:.04em; }
        @media (max-width:700px) {
          .footer-top    { flex-direction:column; align-items:center; text-align:center; }
          .footer-nav    { justify-content:center; }
          .footer-bottom { flex-direction:column; align-items:center; text-align:center; }
          .footer-contact { flex-direction:column; gap:6px; align-items:center; }
          .footer-social { justify-content:center; }
        }
      `}</style>

      <footer className="footer">
        <IslamicPattern opacity={0.04} size={70} />
        <div className="footer-top">
          <a href="#hero" className="footer-logo">
            <img
              src={images.logo}
              alt="Golden Line"
              className="footer-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="footer-logo-fallback">
              <span className="footer-logo-top">GOLDEN</span>
              <span className="footer-logo-bottom">LINE</span>
            </span>
          </a>
          <nav>
            <ul className="footer-nav">
              {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{tr(T.nav[l.key], lang)}</a></li>)}
            </ul>
          </nav>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-contact">
            <span>📍 {contactInfo.address}</span>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <a href={`tel:+${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
          </div>
          <div className="footer-social">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>

        <p className="footer-copy">
          {tr(T.footer.copy, lang)} &nbsp;|&nbsp;
          C.R. {contactInfo.cr} &nbsp;|&nbsp; VAT {contactInfo.vat}
        </p>
      </footer>
    </>
  );
}
