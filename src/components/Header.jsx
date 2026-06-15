import { useState, useEffect } from 'react';
import { images } from '../data/images';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const NAV_LINKS = [
  { key: 'home',      href: '#hero'      },
  { key: 'about',     href: '#about'     },
  { key: 'services',  href: '#services'  },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact',   href: '#contact'   },
];

export default function Header({ onJoin }) {
  const { lang, switchLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => switchLang(lang === 'en' ? 'ar' : 'en');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      /* iOS Safari fix: position:fixed بدلاً من overflow:hidden
         overflow:hidden على body يكسر position:fixed على iOS */
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${scrollY}px`;
      document.body.style.width    = '100%';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .gl-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          transition: background 0.4s, border-color 0.4s;
          overflow: visible;
        }
        @media (max-width: 768px) {
          .gl-header { height: 76px; }
        }
        .gl-header.scrolled {
          background: rgba(10,10,10,0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #2A2A2A;
        }

        /* ── Logo entrance ── */
        @keyframes gl-logo-enter {
          0%   { opacity: 0; transform: scale(0.88) translateY(-6px); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* ── Breathing gold glow ── */
        @keyframes gl-logo-pulse {
          0%, 100% { filter: drop-shadow(0 2px 10px rgba(168,144,96,0.10)) drop-shadow(0 0 0 transparent); }
          50%       { filter: drop-shadow(0 2px 20px rgba(168,144,96,0.28)) drop-shadow(0 0 6px rgba(168,144,96,0.10)); }
        }

        /* ── Shimmer sweep keyframe ── */
        @keyframes gl-logo-shimmer {
          0%   { transform: translateX(-180%) skewX(-12deg); }
          100% { transform: translateX(180%)  skewX(-12deg); }
        }

        .gl-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          position: relative;
          animation: gl-logo-enter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        /* Shimmer sweep layer */
        .gl-logo::before {
          content: '';
          position: absolute;
          inset: -10px 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(168,144,96,0.22) 50%,
            transparent 75%
          );
          transform: translateX(-180%) skewX(-12deg);
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .gl-logo:hover::before {
          opacity: 1;
          animation: gl-logo-shimmer 0.9s ease forwards;
        }

        /* Gold corner brackets — top-left + bottom-right */
        .gl-logo::after {
          content: '';
          position: absolute;
          inset: -5px -4px;
          border-top:    1px solid transparent;
          border-left:   1px solid transparent;
          border-bottom: 1px solid transparent;
          border-right:  1px solid transparent;
          transition:
            border-color 0.4s ease,
            inset        0.4s ease;
          pointer-events: none;
        }
        .gl-logo:hover::after {
          border-color: rgba(168,144,96,0.30);
          inset: -7px -6px;
        }

        .gl-logo-img {
          height: 110px;
          width: auto;
          display: block;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 2px 10px rgba(168,144,96,0.10));
          animation: gl-logo-pulse 5s ease-in-out infinite;
          transition: filter 0.5s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @media (max-width: 768px) {
          .gl-logo-img { height: 72px; }
        }
        .gl-logo:hover .gl-logo-img {
          filter:
            drop-shadow(0 0 22px rgba(168,144,96,0.42))
            drop-shadow(0 3px 10px rgba(168,144,96,0.20));
          transform: scale(1.04);
          animation-play-state: paused;
        }

        .gl-logo-fallback { display: none; flex-direction: column; line-height: 1; }
        .gl-logo-top {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px; font-weight: 300;
          color: #F0EDE6; letter-spacing: 0.12em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .gl-logo-bottom {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px; font-weight: 400;
          color: #A89060; letter-spacing: 0.25em; text-transform: uppercase;
        }
        .gl-logo:hover .gl-logo-top { color: #C8B88A; }

        .gl-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .gl-nav a {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #B0A898;
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          position: relative;
        }
        .gl-nav a::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1px;
          background: #A89060;
          transition: width 0.3s;
        }
        .gl-nav a:hover { color: #F0EDE6; }
        .gl-nav a:hover::after { width: 100%; }

        .gl-lang {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
        }
        .gl-lang { cursor: pointer; }
        .gl-lang-active { color: #A89060; font-weight: 500; }
        .gl-lang-sep { color: #333; }
        .gl-lang-other { color: #555; transition: color 0.2s; }
        .gl-lang:hover .gl-lang-other { color: #A89060; }
        @media (max-width: 1024px) { .gl-lang { display: none; } }

        .gl-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          position: relative;
          z-index: 1200;
        }
        .gl-burger span {
          display: block;
          width: 22px; height: 1.5px;
          background: #F0EDE6;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .gl-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .gl-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gl-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .gl-mobile-nav {
          position: fixed;
          inset: 0;
          background: rgba(10,10,10,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 36px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
          touch-action: none;
          -webkit-overflow-scrolling: touch;
        }
        .gl-mobile-nav.open {
          opacity: 1;
          pointer-events: auto;
        }
        .gl-mobile-nav a {
          font-family: 'DM Sans', sans-serif;
          font-size: 28px;
          font-weight: 300;
          color: #F0EDE6;
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .gl-mobile-nav a:hover { color: #A89060; }

        .gl-mobile-close {
          position: absolute;
          top: 24px;
          right: 5%;
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .gl-mobile-close:hover {
          border-color: #A89060;
          background: rgba(168,144,96,0.1);
        }
        .gl-mobile-close svg {
          width: 16px; height: 16px;
          stroke: #F0EDE6;
          stroke-width: 1.5;
          stroke-linecap: round;
        }

        /* ── Join Us button ── */
        .gl-join-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 20px;
          background: transparent;
          border: 1px solid rgba(168,144,96,0.55);
          border-radius: var(--r-btn, 8px);
          color: #C8B080;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.28s, color 0.28s, border-color 0.28s,
            transform 0.28s, box-shadow 0.28s;
          white-space: nowrap;
        }
        .gl-join-btn:hover {
          background: #A89060;
          color: #0A0A0A;
          border-color: #A89060;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(168,144,96,0.28);
        }
        .gl-join-btn svg { width: 11px; height: 11px; opacity: 0.75; transition: opacity 0.24s; }
        .gl-join-btn:hover svg { opacity: 1; }
        @media (max-width: 768px) { .gl-join-btn { display: none; } }

        @media (max-width: 1024px) {
          .gl-nav { display: none; }
          .gl-burger { display: flex; }
        }

        /* ── Arabic typography ── */
        :root:lang(ar) .gl-nav a,
        :root:lang(ar) .gl-mobile-nav a {
          font-family: 'Almarai', sans-serif;
          font-weight: 700;
          letter-spacing: 0;
        }
        :root:lang(ar) .gl-lang {
          font-family: 'Almarai', sans-serif;
          font-weight: 600;
          letter-spacing: 0;
        }
      `}</style>

      <header className={`gl-header${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="gl-logo">
          <img
            src={images.logo}
            alt="Golden Line"
            className="gl-logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="gl-logo-fallback">
            <span className="gl-logo-top">GOLDEN</span>
            <span className="gl-logo-bottom">LINE</span>
          </span>
        </a>

        <nav>
          <ul className="gl-nav">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>{tr(T.nav[l.key], lang)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
          <button className="gl-join-btn" onClick={onJoin}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="6" cy="4" r="2.2"/>
              <path d="M1.5 10.5c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" strokeLinecap="round"/>
            </svg>
            {lang === 'ar' ? 'انضم إلينا' : 'Join Us'}
          </button>

          <div className="gl-lang" role="button" tabIndex={0} aria-label="Switch language" onClick={toggleLang} onKeyDown={e => e.key === 'Enter' && toggleLang()}>
            <span className={lang === 'en' ? 'gl-lang-active' : 'gl-lang-other'}>EN</span>
            <span className="gl-lang-sep">|</span>
            <span className={lang === 'ar' ? 'gl-lang-active' : 'gl-lang-other'}>AR</span>
          </div>
        </div>

        <button
          className={`gl-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      <nav className={`gl-mobile-nav${menuOpen ? ' open' : ''}`}>
        {/* زر الإغلاق داخل المينيو */}
        <button className="gl-mobile-close" onClick={close} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={close}>{tr(T.nav[l.key], lang)}</a>
        ))}
        <button
          onClick={() => { close(); onJoin && onJoin(); }}
          style={{background:'transparent', border:'1px solid rgba(168,144,96,0.55)', borderRadius:'var(--r-btn,8px)', color:'#C8B080', fontFamily:'inherit', fontSize:'20px', fontWeight:'300', letterSpacing:'0.08em', textTransform:'uppercase', padding:'10px 32px', cursor:'pointer'}}
        >
          {lang === 'ar' ? 'انضم إلينا' : 'Join Us'}
        </button>
      </nav>
    </>
  );
}
