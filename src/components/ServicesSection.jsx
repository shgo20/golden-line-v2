import { useState, useEffect, useCallback, useRef } from 'react';
import IslamicPattern from './IslamicPattern';
import SectionFrame from './SectionFrame';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const SERVICES = [
  {
    label: 'Trophies & Awards',      labelAr: 'الكؤوس والجوائز',
    title: 'Trophies & Awards',      titleAr: 'الكؤوس والجوائز',
    imgSrc: '/images/SLAUDER-01.jpg', imgAlt: 'Trophies and awards',
    desc: 'Design and execution of exclusive trophies and awards for sports championships, national competitions, and major events.',
    descAr: 'تصميم وتنفيذ كؤوس وجوائز حصرية للبطولات الرياضية والمنافسات الوطنية والفعاليات الكبرى.',
    icon: '🏆',
    profileUrl: '/images/services1.pdf',
  },
  {
    label: 'Honorary Shields',       labelAr: 'الدروع التكريمية',
    title: 'Honorary Shields',       titleAr: 'الدروع التكريمية',
    imgSrc: '/images/SLAUDER-02.jpg', imgAlt: 'Honorary shields',
    desc: 'Luxury shields combining metal, acrylic, wood, and marble — reflecting the value of recognition and the status of honorees.',
    descAr: 'دروع فاخرة تجمع بين المعدن والأكريليك والخشب والرخام، لتعكس قيمة التكريم ومكانة المكرَّمين.',
    icon: '🏅',
    profileUrl: '/images/services2.pdf',
  },
  {
    label: 'Commemorative Sculptures', labelAr: 'المجسمات التذكارية',
    title: 'Commemorative Sculptures', titleAr: 'المجسمات التذكارية',
    imgSrc: '/images/SLAUDER-03.jpg', imgAlt: 'Commemorative sculptures',
    desc: 'Transforming landmarks, projects, logos, and national symbols into artistic pieces for gifting and display.',
    descAr: 'تحويل المعالم والمشاريع والشعارات والرموز الوطنية إلى قطع فنية قابلة للإهداء والعرض.',
    icon: '🏛',
    profileUrl: '/images/services3.pdf',
  },
  {
    label: 'Protocol Gifts',         labelAr: 'الهدايا البروتوكولية',
    title: 'Protocol Gifts',         titleAr: 'الهدايا البروتوكولية',
    imgSrc: '/images/SLAUDER-04.jpg', imgAlt: 'Protocol gifts',
    desc: 'Official gifting solutions for leaders, delegations, and VIPs — reflecting prestige, luxury, and identity.',
    descAr: 'حلول إهداء رسمية للقيادات والوفود والشخصيات المهمة، تعكس الهيبة والفخامة والهوية.',
    icon: '🎁',
    profileUrl: '/images/services4.pdf',
  },
  {
    label: 'Special Heritage Works', labelAr: 'الأعمال التراثية الخاصة',
    title: 'Special Heritage Works', titleAr: 'الأعمال التراثية الخاصة',
    imgSrc: '/images/SLAUDER-07.jpg', imgAlt: 'Heritage works',
    desc: 'Works inspired by Saudi Sadu, Salmani engraving, Najdi architecture, and Arabic calligraphy — embodying the spirit of the Kingdom in contemporary products.',
    descAr: 'أعمال مستوحاة من السدو السعودي، النقش السلماني، العمارة النجدية، والخط العربي، لتجسيد روح المملكة في منتجات معاصرة.',
    icon: '✨',
    profileUrl: '/images/services7.pdf',
  },
];

const N = SERVICES.length;

export default function ServicesSection() {
  const { lang } = useLang();
  const [variant, setVariant] = useState(1);
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setActive(i => (i + 1) % N), []);
  const prev = useCallback(() => setActive(i => (i - 1 + N) % N), []);

  useEffect(() => {
    if (paused || variant === 2) return;
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next, paused, variant]);

  /* reset active when switching variant */
  useEffect(() => { setActive(0); }, [variant]);

  return (
    <>
      <style>{`
        /* ════════════════════════════════════════
           Services section — 3 interchangeable layouts
        ════════════════════════════════════════ */
        .sv {
          background: #0D0D0D;
          padding: 28px 5%;
          position: relative;
          overflow: hidden;
        }

        /* ── shared header ── */
        .sv-header {
          text-align:center; padding:0 5%;
          margin-bottom:48px; position:relative; z-index:3;
        }
        .sv-eyebrow {
          display:inline-flex; align-items:center; gap:12px;
          font-family:'DM Sans',sans-serif; font-size:10px;
          letter-spacing:.38em; text-transform:uppercase;
          color:#A89060; margin-bottom:12px;
        }
        .sv-eyebrow::before,.sv-eyebrow::after { content:'◆'; font-size:6px; opacity:.6; }
        .sv-title {
          font-family:'DM Sans',sans-serif;
          font-size:clamp(22px,3vw,36px); font-weight:300;
          color:#F0EDE6; letter-spacing:.04em; text-transform:uppercase;
        }
        .sv-title strong { font-weight:700; color:#A89060; }

        /* ── Layout switcher ── */
        .sv-switcher {
          position:relative; z-index:10;
          display:flex; align-items:center; justify-content:center;
          gap:4px; margin-bottom:40px;
        }
        .sv-sw-btn {
          width:40px; height:40px; border:1px solid #222;
          border-radius: var(--r-btn, 8px);
          background:transparent; color:#444;
          cursor:pointer; transition:all .25s;
          display:flex; align-items:center; justify-content:center;
          position:relative;
        }
        .sv-sw-btn.active {
          border-color:rgba(168,144,96,.6);
          background:rgba(168,144,96,.08);
          color:#A89060;
        }
        .sv-sw-btn:hover:not(.active) { border-color:#383838; color:#888; }
        /* tooltip */
        .sv-sw-btn::after {
          content:attr(data-tip);
          position:absolute; bottom:calc(100% + 8px); left:50%;
          transform:translateX(-50%) translateY(4px);
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:.15em; text-transform:uppercase;
          color:#A89060; background:#111; border:1px solid #2A2A2A;
          border-radius: var(--r-sm, 6px);
          padding:4px 8px; white-space:nowrap;
          opacity:0; pointer-events:none;
          transition:opacity .2s, transform .2s;
        }
        .sv-sw-btn:hover::after {
          opacity:1; transform:translateX(-50%) translateY(0);
        }

        /* ═══════════════════════════════
           VARIANT 1 — Split-Screen Tabs
        ═══════════════════════════════ */
        .sv1 {
          display:flex; align-items:stretch;
          max-width:1200px; margin:0 auto; padding:0 5%;
          gap:0; position:relative; z-index:2;
          min-height:520px;
        }

        /* Left: service list */
        .sv1-list {
          flex:0 0 340px; display:flex; flex-direction:column;
          justify-content:center; padding-right:48px;
          border-right:1px solid rgba(168,144,96,.15);
        }
        .sv1-tab {
          display:flex; align-items:center; gap:20px;
          padding:16px 0; background:none; border:none;
          cursor:pointer; text-align:left; border-bottom:1px solid #1A1A1A;
          transition:all .25s; position:relative;
        }
        .sv1-tab::before {
          content:''; position:absolute; left:-48px;
          top:0; bottom:0; width:3px;
          background:#A89060; transform:scaleY(0);
          transition:transform .3s cubic-bezier(.4,0,.2,1);
        }
        .sv1-tab.active::before { transform:scaleY(1); }
        .sv1-num {
          font-family:'DM Sans',sans-serif; font-size:11px;
          font-weight:300; color:#3A3A3A; letter-spacing:.12em;
          transition:color .25s; flex-shrink:0;
        }
        .sv1-name {
          font-family:'DM Sans',sans-serif; font-size:13px;
          font-weight:400; color:#666; letter-spacing:.04em;
          text-transform:uppercase; transition:color .25s;
        }
        .sv1-tab.active .sv1-num { color:#A89060; }
        .sv1-tab.active .sv1-name { color:#F0EDE6; }
        .sv1-tab:hover .sv1-name { color:#C8C0B0; }

        /* Right: image + detail */
        .sv1-panel {
          flex:1; padding-left:52px;
          display:flex; flex-direction:column; justify-content:center;
          gap:20px;
        }
        .sv1-img-wrap {
          position:relative; width:100%; aspect-ratio:16/9;
          overflow:hidden;
        }
        .sv1-img-wrap img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform .6s ease, opacity .4s ease;
        }
        .sv1-img-wrap:hover img { transform:scale(1.04); }
        /* gold corner accents */
        .sv1-img-wrap::before {
          content:''; position:absolute; top:-1px; left:-1px;
          width:24px; height:24px; z-index:2;
          border-top:2px solid #A89060; border-left:2px solid #A89060;
        }
        .sv1-img-wrap::after {
          content:''; position:absolute; bottom:-1px; right:-1px;
          width:24px; height:24px; z-index:2;
          border-bottom:2px solid #A89060; border-right:2px solid #A89060;
        }

        /* ── Info block — centered ── */
        .sv1-info {
          display:flex; flex-direction:column; align-items:center;
          text-align:center; gap:8px;
          padding:0 8px;
        }
        .sv1-info-divider {
          width:32px; height:1px;
          background:linear-gradient(90deg, transparent, #A89060, transparent);
          margin:2px 0;
        }
        .sv1-detail-title {
          font-family:'DM Sans',sans-serif; font-size:17px; font-weight:300;
          color:#F0EDE6; letter-spacing:-.01em;
        }
        .sv1-detail-title strong { color:#A89060; font-weight:600; }
        .sv1-detail-desc {
          font-family:'DM Sans',sans-serif; font-size:9px; font-weight:300;
          color:#666058; line-height:1.70;
        }
        .sv1-controls-row {
          display:flex; align-items:center; justify-content:center;
          gap:12px;
        }
        .sv1-arrow {
          width:36px; height:36px; border:1px solid rgba(168,144,96,.30);
          background:transparent; color:#888070; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all .25s; flex-shrink:0;
        }
        .sv1-arrow:hover { border-color:#A89060; color:#A89060; }
        .sv1-arrow svg { width:12px; height:12px; }

        /* ── divider between arrows and button ── */
        .sv1-ctrl-sep {
          width:1px; height:24px;
          background:rgba(168,144,96,.18); flex-shrink:0;
        }

        /* ── Profile CTA button — full-width centered block ── */
        .sv-profile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          padding: 14px 24px;
          background: transparent;
          border: 1px solid rgba(168,144,96,0.55);
          border-radius: var(--r-btn, 8px);
          color: rgba(168,144,96,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: #F0EDE6;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition:
            background    0.28s ease,
            color         0.28s ease,
            border-color  0.28s ease,
            transform     0.28s ease,
            box-shadow    0.28s ease;
        }
        .sv-profile-btn:hover {
          background: #A89060;
          color: #0A0A0A;
          border-color: #A89060;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(168,144,96,0.26);
        }
        .sv-profile-btn svg { width:12px; height:12px; opacity:.65; transition:opacity .24s; }
        .sv-profile-btn:hover svg { opacity:1; }

        /* ── Image hover overlay CTA — same style as Portfolio ── */
        .sv1-img-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 22px;
          background: rgba(0,0,0,0);
          opacity: 0;
          pointer-events: none;
          transition: background 0.32s ease, opacity 0.32s ease;
        }
        .sv1-img-wrap:hover .sv1-img-overlay {
          background: rgba(0,0,0,0.18);
          opacity: 1;
          pointer-events: auto;
        }
        .sv1-img-overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 22px;
          background: rgba(10,10,10,0.72);
          border: 1px solid #A89060;
          border-radius: var(--r-btn, 8px);
          color: #A89060;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transform: translateY(10px);
          transition: background 0.28s ease, color 0.28s ease,
            transform 0.28s ease, box-shadow 0.28s ease;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .sv1-img-wrap:hover .sv1-img-overlay-btn { transform: translateY(0); }
        .sv1-img-overlay-btn:hover {
          background: #A89060;
          color: #0A0A0A;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(168,144,96,0.32);
        }
        .sv1-img-overlay-btn svg { width:11px; height:11px; opacity:.80; transition:opacity .24s; }
        .sv1-img-overlay-btn:hover svg { opacity:1; }

        @media(max-width:900px) {
          .sv1 { flex-direction:column; }
          .sv1-list { flex:none; padding-right:0; border-right:none;
            border-bottom:1px solid rgba(168,144,96,.15); padding-bottom:24px; margin-bottom:24px;
            display:grid; grid-template-columns:1fr 1fr; gap:0; }
          .sv1-tab::before { display:none; }
          .sv1-panel { padding-left:0; }
        }

        /* ═════════════════════════════
           VARIANT 2 — Bento Grid
        ═════════════════════════════ */
        .sv2 {
          max-width:1200px; margin:0 auto; padding:0 5%;
          position:relative; z-index:2;
        }
        .sv2-grid {
          display:grid;
          grid-template-columns:repeat(12, 1fr);
          grid-template-rows:280px 200px;
          gap:10px;
        }
        /* card 0: big hero, spans 5 cols × 2 rows */
        .sv2-card:nth-child(1) { grid-column:1/6;  grid-row:1/3; }
        /* card 1: top-right area */
        .sv2-card:nth-child(2) { grid-column:6/9;  grid-row:1/2; }
        /* card 2: top-right area */
        .sv2-card:nth-child(3) { grid-column:9/13; grid-row:1/2; }
        /* card 3: wide bottom-centre */
        .sv2-card:nth-child(4) { grid-column:6/10; grid-row:2/3; }
        /* card 4: bottom */
        .sv2-card:nth-child(5) { grid-column:10/13; grid-row:2/3; }
        /* cards 5 & 6 overflow into a 3rd row on wide screens only */
        .sv2-card:nth-child(6) { grid-column:1/7;  grid-row:3/4; }
        .sv2-card:nth-child(7) { grid-column:7/13; grid-row:3/4; }

        .sv2-grid { grid-template-rows:280px 200px 190px; }

        .sv2-card {
          position:relative; overflow:hidden; cursor:pointer;
          border:1px solid rgba(168,144,96,.12);
          transition:border-color .3s;
        }
        .sv2-card:hover { border-color:rgba(168,144,96,.50); }
        .sv2-card img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform .55s ease, filter .4s ease;
          filter:brightness(.80);
        }
        .sv2-card:hover img { transform:scale(1.06); filter:brightness(.95); }
        .sv2-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,
            rgba(0,0,0,.85) 0%, rgba(0,0,0,.30) 45%, transparent 100%);
          display:flex; flex-direction:column;
          justify-content:flex-end; padding:18px 20px;
          pointer-events:none;
        }
        .sv2-num {
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:.30em; color:#A89060; margin-bottom:4px;
          text-transform:uppercase;
        }
        .sv2-card-name {
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:400;
          color:#F0EDE6; letter-spacing:.04em; text-transform:uppercase;
        }
        /* big card shows description */
        .sv2-card:nth-child(1) .sv2-card-name { font-size:17px; }
        .sv2-desc {
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:300;
          color:#B0A898; line-height:1.7; margin-top:6px;
          max-height:0; overflow:hidden;
          transition:max-height .4s ease, opacity .4s ease; opacity:0;
        }
        .sv2-card:hover .sv2-desc { max-height:80px; opacity:1; }
        /* corner accent for big card */
        .sv2-card:nth-child(1)::before {
          content:''; position:absolute; top:-1px; left:-1px;
          width:22px; height:22px; z-index:3;
          border-top:2px solid #A89060; border-left:2px solid #A89060;
        }
        .sv2-card:nth-child(1)::after {
          content:''; position:absolute; bottom:-1px; right:-1px;
          width:22px; height:22px; z-index:3;
          border-bottom:2px solid #A89060; border-right:2px solid #A89060;
        }

        @media(max-width:900px) {
          .sv2-grid {
            grid-template-columns:1fr 1fr;
            grid-template-rows:repeat(4,180px);
          }
          .sv2-card:nth-child(1) { grid-column:1/3; grid-row:1/2; }
          .sv2-card:nth-child(2) { grid-column:1/2; grid-row:2/3; }
          .sv2-card:nth-child(3) { grid-column:2/3; grid-row:2/3; }
          .sv2-card:nth-child(4) { grid-column:1/2; grid-row:3/4; }
          .sv2-card:nth-child(5) { grid-column:2/3; grid-row:3/4; }
          .sv2-card:nth-child(6) { grid-column:1/2; grid-row:4/5; }
          .sv2-card:nth-child(7) { grid-column:2/3; grid-row:4/5; }
        }

        /* ═══════════════════════════════════
           VARIANT 3 — Fullscreen Cinematic
        ═══════════════════════════════════ */
        .sv3 {
          position:relative; z-index:2;
          height:580px; overflow:hidden;
        }
        .sv3-slide {
          position:absolute; inset:0;
          opacity:0; transition:opacity .65s ease;
        }
        .sv3-slide.active { opacity:1; }
        .sv3-slide img {
          width:100%; height:100%; object-fit:cover; display:block;
          filter:brightness(.60);
        }
        .sv3-overlay {
          position:absolute; inset:0;
          background:linear-gradient(
            105deg,
            rgba(0,0,0,.80) 0%, rgba(0,0,0,.50) 40%, transparent 75%
          );
        }
        .sv3-content {
          position:absolute; bottom:64px; left:8%;
          max-width:460px;
        }
        .sv3-num {
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:.38em; color:#A89060; text-transform:uppercase;
          margin-bottom:12px; display:block;
        }
        .sv3-title {
          font-family:'DM Sans',sans-serif;
          font-size:clamp(22px,3vw,34px); font-weight:300;
          color:#F0EDE6; line-height:1.2; margin-bottom:16px;
          letter-spacing:-.01em;
        }
        .sv3-desc {
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300;
          color:#B0A898; line-height:1.85;
        }

        /* Progress bar */
        .sv3-progress {
          position:absolute; bottom:0; left:0; right:0;
          display:flex; height:2px;
        }
        .sv3-prog-seg {
          flex:1; background:rgba(255,255,255,.08);
          position:relative; overflow:hidden;
        }
        .sv3-prog-seg::after {
          content:''; position:absolute; inset:0;
          background:#A89060; transform:scaleX(0);
          transform-origin:left; transition:none;
        }
        .sv3-prog-seg.active::after {
          transform:scaleX(1);
          transition:transform 4s linear;
        }

        /* Nav controls */
        .sv3-nav {
          position:absolute; right:6%; bottom:56px;
          display:flex; gap:10px; z-index:3;
        }
        .sv3-btn {
          width:44px; height:44px;
          border:1px solid rgba(168,144,96,.40); background:rgba(0,0,0,.40);
          color:#A89060; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all .25s; backdrop-filter:blur(4px);
        }
        .sv3-btn:hover { background:rgba(168,144,96,.15); border-color:#A89060; }
        .sv3-btn svg { width:14px; height:14px; }

        /* Slide counter */
        .sv3-counter {
          position:absolute; top:40px; right:6%;
          font-family:'DM Sans',sans-serif; font-size:10px;
          letter-spacing:.15em; color:#666; z-index:3;
        }
        .sv3-counter strong { color:#A89060; }

        @media(max-width:768px) {
          .sv3 { height:440px; }
          .sv3-content { bottom:50px; left:5%; }
        }
      `}</style>

      <section id="services" className="sv">
        <IslamicPattern opacity={0.05} size={72} />

        <SectionFrame pad="60px 0 52px">
        <div className="sv-header">
          <div className="sv-eyebrow">{tr(T.services.eyebrow, lang)}</div>
          <h2 className="sv-title">{tr(T.services.title1, lang)} <strong>{tr(T.services.title2, lang)}</strong></h2>
        </div>

        {/* ── Layout Switcher ── */}
        <div className="sv-switcher">
          {/* Variant 1 — Split / List */}
          <button
            className={`sv-sw-btn${variant === 1 ? ' active' : ''}`}
            onClick={() => setVariant(1)}
            aria-label="Split view"
            data-tip="LIST VIEW"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2" y="3" width="6" height="12" rx="0.5"/>
              <line x1="11" y1="5"  x2="16" y2="5"/>
              <line x1="11" y1="9"  x2="16" y2="9"/>
              <line x1="11" y1="13" x2="16" y2="13"/>
            </svg>
          </button>

          {/* Variant 2 — Bento Grid */}
          <button
            className={`sv-sw-btn${variant === 2 ? ' active' : ''}`}
            onClick={() => setVariant(2)}
            aria-label="Grid view"
            data-tip="GRID VIEW"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2"  y="2"  width="6" height="8" rx="0.5"/>
              <rect x="10" y="2"  width="6" height="4" rx="0.5"/>
              <rect x="10" y="8"  width="6" height="8" rx="0.5"/>
              <rect x="2"  y="12" width="6" height="4" rx="0.5"/>
            </svg>
          </button>

          {/* Variant 3 — Cinematic */}
          <button
            className={`sv-sw-btn${variant === 3 ? ' active' : ''}`}
            onClick={() => setVariant(3)}
            aria-label="Cinematic view"
            data-tip="CINEMATIC"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2" y="4" width="14" height="10" rx="0.5"/>
              <line x1="2"  y1="7"  x2="16" y2="7"/>
              <line x1="2"  y1="11" x2="16" y2="11"/>
              <line x1="5"  y1="4"  x2="5"  y2="14"/>
              <line x1="13" y1="4"  x2="13" y2="14"/>
            </svg>
          </button>
        </div>

        {/* ════ VARIANT 1 — Split Screen ════ */}
        {variant === 1 && (
          <div className="sv1">
            <div className="sv1-list">
              {SERVICES.map((s, i) => (
                <button
                  key={i}
                  className={`sv1-tab${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="sv1-num">0{i + 1}</span>
                  <span className="sv1-name">{lang === 'ar' ? s.labelAr : s.label}</span>
                </button>
              ))}
            </div>

            <div className="sv1-panel">
              <div className="sv1-img-wrap">
                <img
                  key={active}
                  src={SERVICES[active].imgSrc}
                  alt={SERVICES[active].imgAlt}
                />
                {/* Hover overlay CTA on the image */}
                {SERVICES[active].profileUrl && (
                  <div className="sv1-img-overlay">
                    <a
                      className="sv1-img-overlay-btn"
                      href={SERVICES[active].profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <rect x="1" y="1" width="10" height="10" rx="1"/>
                        <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round"/>
                      </svg>
                      {lang === 'ar' ? 'عرض ملف الخدمة' : 'View Service Profile'}
                    </a>
                  </div>
                )}
              </div>

              <div className="sv1-info">
                <div className="sv1-info-divider" />
                <div className="sv1-detail-title">
                  {lang === 'ar' ? SERVICES[active].titleAr : SERVICES[active].title}
                </div>
                <p className="sv1-detail-desc">{lang === 'ar' ? SERVICES[active].descAr : SERVICES[active].desc}</p>
              </div>

              <div className="sv1-controls-row">
                <button className="sv1-arrow" onClick={next} aria-label="Next">
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="sv1-arrow" onClick={prev} aria-label="Previous">
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {SERVICES[active].profileUrl && (
                <a
                  className="sv-profile-btn"
                  href={SERVICES[active].profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="1" y="1" width="10" height="10" rx="1"/>
                    <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round"/>
                  </svg>
                  {lang === 'ar'
                    ? `شاهد ${SERVICES[active].labelAr}`
                    : `View ${SERVICES[active].label}`}
                </a>
              )}
            </div>
          </div>
        )}

        {/* ════ VARIANT 2 — Bento Grid ════ */}
        {variant === 2 && (
          <div className="sv2">
            <div className="sv2-grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="sv2-card">
                  <img src={s.imgSrc} alt={s.imgAlt} />
                  <div className="sv2-overlay">
                    <span className="sv2-num">0{i + 1}</span>
                    <div className="sv2-card-name">{lang === 'ar' ? s.labelAr : s.label}</div>
                    {i === 0 && <p className="sv2-desc">{s.desc}</p>}
                    {i !== 0 && <p className="sv2-desc">{s.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ VARIANT 3 — Fullscreen Cinematic ════ */}
        {variant === 3 && (
          <div
            className="sv3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {SERVICES.map((s, i) => (
              <div key={i} className={`sv3-slide${i === active ? ' active' : ''}`}>
                <img src={s.imgSrc} alt={s.imgAlt} />
                <div className="sv3-overlay" />
                <div className="sv3-content">
                  <span className="sv3-num">0{i + 1} / 0{N} — {lang === 'ar' ? s.labelAr : s.label}</span>
                  <h3 className="sv3-title">{lang === 'ar' ? s.titleAr : s.title}</h3>
                  <p className="sv3-desc">{lang === 'ar' ? s.descAr : s.desc}</p>
                  {s.profileUrl && (
                    <a
                      className="sv-profile-btn"
                      href={s.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: '20px' }}
                    >
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <rect x="1" y="1" width="10" height="10" rx="1"/>
                        <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round"/>
                      </svg>
                      {lang === 'ar'
                        ? `شاهد ${s.labelAr}`
                        : `View ${s.label}`}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* slide counter */}
            <div className="sv3-counter">
              <strong>{String(active + 1).padStart(2, '0')}</strong> / {String(N).padStart(2, '0')}
            </div>

            {/* nav arrows */}
            <div className="sv3-nav">
              <button className="sv3-btn" onClick={prev} aria-label="Previous">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="sv3-btn" onClick={next} aria-label="Next">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* progress bar */}
            <div className="sv3-progress">
              {SERVICES.map((_, i) => (
                <div
                  key={i}
                  className={`sv3-prog-seg${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        )}
        </SectionFrame>
      </section>
    </>
  );
}
