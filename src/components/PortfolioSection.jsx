import { useState, useEffect, useCallback } from 'react';
import { images } from '../data/images';
import PdfFlipbook from './PdfFlipbook';

const PORTFOLIO = [
  {
    badge: 'Trophy',
    title: 'National Foundation Day Trophy',
    client: 'Golden Line',
    specs: 'Gold-plated brass · Engraving & forming · Premium leather box',
    imgSrc: images.portfolio.p01,
    profileUrl: '/images/Trophy-01.pdf',
  },
  {
    badge: 'Coin',
    title: 'Commemorative Coin',
    client: 'Riyadh Metro',
    specs: 'Gold-plated brass · Engraving & forming · Leather case',
    imgSrc: images.portfolio.p02,
    profileUrl: '/images/Trophy-02.pdf',
  },
  {
    badge: 'Plaque',
    title: 'Honor Shield',
    client: 'King Salman Air College',
    specs: 'Oxidized gold brass · Relief & engraving · Luxury packaging',
    imgSrc: images.portfolio.p03,
    profileUrl: '/images/Trophy-03.pdf',
  },
  {
    badge: 'Trophy',
    title: 'Sports Trophy',
    client: 'Riyadh Metro',
    specs: 'Gold-plated brass · Custom engraving · Leather case',
    imgSrc: images.portfolio.p04,
    profileUrl: '/images/Trophy-04.pdf',
  },
  {
    badge: 'Award Plaque',
    title: 'Gift of Honor',
    client: 'Air Intelligence Authority',
    specs: 'Oxidized brass logo · Relief & engraved inscription',
    imgSrc: images.portfolio.p05,
    profileUrl: '/images/Trophy-05.pdf',
  },
  {
    badge: 'Trophy',
    title: 'Handcrafted Trophy',
    client: 'Falcons Club',
    specs: 'Gold brass · Master craftsmanship · Acrylic base',
    imgSrc: images.portfolio.p06,
    profileUrl: '/images/Trophy-06.pdf',
  },
  {
    badge: 'Trophy',
    title: 'Prestige Award Trophy',
    client: 'Golden Line',
    specs: 'Gold-plated brass · Premium finish · Luxury packaging',
    imgSrc: images.portfolio.p07,
    profileUrl: '/images/Trophy-07.pdf',
  },
];


const N = PORTFOLIO.length;
function mod(n, m) { return ((n % m) + m) % m; }

export default function PortfolioSection() {
  const [active,     setActive]     = useState(0);
  const [paused,     setPaused]     = useState(false);
  const [modalItem,  setModalItem]  = useState(null); // snapshot of the item whose PDF is open

  const [useFallback, setUseFallback] = useState(false);

  const openModal  = (item) => {
    setUseFallback(false);
    setModalItem({ pdfUrl: item.profileUrl, title: item.title, badge: item.badge });
  };
  const closeModal = () => setModalItem(null);

  const next = useCallback(() => setActive(i => mod(i + 1, N)), []);
  const prev = useCallback(() => setActive(i => mod(i - 1, N)), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  useEffect(() => {
    if (!modalItem) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalItem]);

  const getOffset = (idx) => {
    let o = idx - active;
    if (o >  N / 2) o -= N;
    if (o < -N / 2) o += N;
    return o;
  };

  const cur = PORTFOLIO[active];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════
           Portfolio — Cover Flow Gallery
        ══════════════════════════════════════ */
        .pf {
          background: transparent;
          padding: 72px 0 0;
          position: relative;
          overflow: visible;
        }

        /* ── Section header ── */
        .pf-header {
          text-align: center;
          padding: 0 5%;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .pf-eyebrow {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 12px;
        }
        .pf-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          color: #F0EDE6;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
        }
        .pf-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #888070;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.85;
        }

        /* ══ Cover Flow Stage ══ */
        .pf-stage {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 560px;
          perspective: 1300px;
          perspective-origin: 50% 50%;
        }

        /* ── Cover Flow card — outer transform layer ── */
        .pf-card {
          position: absolute;
          width: 280px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition:
            transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity   0.65s ease;
          will-change: transform, opacity;
        }

        .pf-card[data-offset="0"] {
          transform: translateX(0)     rotateY(0deg)   scale(2.22);
          opacity: 1;
          z-index: 5;
          pointer-events: auto;
        }
        .pf-card[data-offset="-1"] {
          transform: translateX(-365px) rotateY(28deg)  scale(0.84);
          opacity: 0.58;
          z-index: 4;
          pointer-events: auto;
        }
        .pf-card[data-offset="1"] {
          transform: translateX(365px)  rotateY(-28deg) scale(0.84);
          opacity: 0.58;
          z-index: 4;
          pointer-events: auto;
        }
        .pf-card[data-offset="-2"] {
          transform: translateX(-620px) rotateY(40deg)  scale(0.65);
          opacity: 0.22;
          z-index: 3;
          pointer-events: none;
        }
        .pf-card[data-offset="2"] {
          transform: translateX(620px)  rotateY(-40deg) scale(0.65);
          opacity: 0.22;
          z-index: 3;
          pointer-events: none;
        }

        /* ── Dock hover lift — inner layer ──
           position:relative enables the ::reflection child.
        ─────────────────────────────────────── */
        .pf-card-inner {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pf-card:hover .pf-card-inner {
          transform: translateY(-10px);
        }

        /* ── Real floor reflection — all cards, intensity by distance ── */
        .pf-card[data-offset="0"] .pf-card-inner {
          -webkit-box-reflect: below 12px
            linear-gradient(transparent 50%, rgba(0,0,0,0.30));
        }
        .pf-card[data-offset="-1"] .pf-card-inner,
        .pf-card[data-offset="1"]  .pf-card-inner {
          -webkit-box-reflect: below 8px
            linear-gradient(transparent 55%, rgba(0,0,0,0.55));
        }
        .pf-card[data-offset="-2"] .pf-card-inner,
        .pf-card[data-offset="2"]  .pf-card-inner {
          -webkit-box-reflect: below 6px
            linear-gradient(transparent 62%, rgba(0,0,0,0.72));
        }

        /* ── Image frame — gold border style ──
           No white background — clean dark frame with gold accents.
        ─────────────────────────────────────────────────── */
        .pf-img-frame {
          width: 100%;
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: visible;
          background: transparent;
          padding: 0;
          border: 1px solid rgba(168,144,96,0.18);
          transition:
            filter       0.65s ease,
            border-color 0.65s ease,
            box-shadow   0.65s ease;
        }

        /* inner — clips the actual image */
        .pf-img-frame-inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #1A1A1A;
        }

        /* ── Shimmer sweep on hover ── */
        .pf-img-frame-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.14) 50%,
            transparent 70%
          );
          transform: translateX(-120%);
          transition: transform 0.75s ease;
        }
        .pf-card:hover .pf-img-frame-inner::after {
          transform: translateX(120%);
        }

        /* ── 4 corner brackets on the frame ── */
        .pf-img-c {
          position: absolute;
          width: 14px; height: 14px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease, border-color 0.4s ease;
        }
        .pf-img-tl { top: -1px;    left: -1px;
          border-top:  2px solid #A89060;
          border-left: 2px solid #A89060; }
        .pf-img-tr { top: -1px;    right: -1px;
          border-top:   2px solid #A89060;
          border-right: 2px solid #A89060; }
        .pf-img-bl { bottom: -1px; left: -1px;
          border-bottom: 2px solid rgba(168,144,96,0.70);
          border-left:   2px solid rgba(168,144,96,0.70); }
        .pf-img-br { bottom: -1px; right: -1px;
          border-bottom: 2px solid rgba(168,144,96,0.70);
          border-right:  2px solid rgba(168,144,96,0.70); }

        /* Active: full gold frame + glowing corners */
        .pf-card[data-offset="0"] .pf-img-frame {
          filter: blur(0px) brightness(1.05);
          border-color: rgba(168,144,96,0.55);
          box-shadow:
            0 0 0 1px rgba(168,144,96,0.08),
            0 16px 48px rgba(0,0,0,0.60),
            0 0 28px rgba(168,144,96,0.12);
        }
        .pf-card[data-offset="0"] .pf-img-c { opacity: 1; }

        /* ±1: faint gold, blurred */
        .pf-card[data-offset="-1"] .pf-img-frame,
        .pf-card[data-offset="1"]  .pf-img-frame {
          filter: blur(2px) brightness(0.62);
          border-color: rgba(168,144,96,0.10);
        }
        .pf-card[data-offset="-1"] .pf-img-c,
        .pf-card[data-offset="1"]  .pf-img-c { opacity: 0.35; }

        /* ±2: very faint, more blurred */
        .pf-card[data-offset="-2"] .pf-img-frame,
        .pf-card[data-offset="2"]  .pf-img-frame {
          filter: blur(4px) brightness(0.48);
          border-color: rgba(168,144,96,0.05);
        }

        /* Hover lifts non-active slightly */
        .pf-card:not([data-offset="0"]):hover .pf-img-frame {
          filter: blur(1px) brightness(0.80);
          border-color: rgba(168,144,96,0.22);
        }

        .pf-img-frame-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pf-img-ph {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1C1C18 0%, #0E0E0B 60%, #1A1A16 100%);
          color: #2A2A20;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Floor reflection — handled by -webkit-box-reflect on active card ── */

        /* Small badge on side cards */
        .pf-card-label {
          position: absolute;
          bottom: 10px;
          right: 12px;
          background: rgba(10,10,10,0.88);
          border: 1px solid rgba(168,144,96,0.22);
          padding: 3px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #A89060;
          z-index: 2;
        }

        /* ══ Active item info panel ══ */
        .pf-info {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 32px 5% 0;
          min-height: 90px;
        }
        .pf-info-badge {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 8px;
        }
        .pf-info-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 400;
          color: #F0EDE6;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .pf-info-client {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 6px;
        }
        .pf-info-client::before {
          content: '';
          display: inline-block;
          width: 18px; height: 1px;
          background: rgba(168,144,96,0.55);
        }
        .pf-info-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #888070;
          letter-spacing: 0.04em;
        }
        .pf-info-sep {
          color: #3A3A3A;
          margin: 0 8px;
        }

        /* ══ Navigation ══ */
        .pf-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 32px 0 56px;
          position: relative;
          z-index: 2;
        }

        .pf-arrow {
          width: 40px; height: 40px;
          border: 1px solid #2A2A2A;
          border-radius: var(--r-btn, 8px);
          background: transparent;
          color: #888070;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .pf-arrow:hover { border-color: #A89060; color: #A89060; }
        .pf-arrow svg { width: 14px; height: 14px; }

        .pf-dots { display: flex; gap: 8px; }
        .pf-dot {
          width: 20px; height: 2px;
          background: #2A2A2A;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          padding: 0;
        }
        .pf-dot.active { background: #A89060; width: 32px; }

/* ══ Hover overlay on center card image ══ */
        .pf-img-overlay {
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
        /* Only activate on the center card hover — targets inner */
        .pf-card[data-offset="0"]:hover .pf-img-frame-inner .pf-img-overlay {
          background: rgba(0,0,0,0.18);
          opacity: 1;
          pointer-events: auto;
        }

        .pf-img-overlay-btn {
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
          cursor: pointer;
          transform: translateY(10px);
          transition:
            background  0.28s ease,
            color       0.28s ease,
            transform   0.28s ease,
            box-shadow  0.28s ease;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .pf-card[data-offset="0"]:hover .pf-img-overlay-btn {
          transform: translateY(0);
        }
        .pf-img-overlay-btn:hover {
          background: #A89060;
          color: #0A0A0A;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(168,144,96,0.32);
        }
        .pf-img-overlay-btn svg {
          width: 11px; height: 11px;
          opacity: 0.80;
          transition: opacity 0.24s;
        }
        .pf-img-overlay-btn:hover svg { opacity: 1; }

        /* ══ View Project Profile button — below info panel ══ */
        .pf-profile-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 18px;
          padding: 8px 22px;
          background: transparent;
          border: 1px solid rgba(168,144,96,0.55);
          border-radius: var(--r-btn, 8px);
          color: rgba(168,144,96,0.70);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            background    0.28s ease,
            color         0.28s ease,
            border-color  0.28s ease,
            transform     0.28s ease,
            box-shadow    0.28s ease;
        }
        .pf-profile-btn:hover {
          background: #A89060;
          color: #0A0A0A;
          border-color: #A89060;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(168,144,96,0.26);
        }
        .pf-profile-btn svg {
          width: 11px; height: 11px;
          opacity: 0.65;
          transition: opacity 0.24s;
        }
        .pf-profile-btn:hover svg { opacity: 1; }

        /* Mobile: hide overlay, keep bottom button as primary */
        @media (max-width: 768px) {
          .pf-img-overlay { display: none; }
          .pf-profile-btn {
            border-color: #A89060;
            color: #A89060;
            padding: 10px 26px;
            font-size: 11px;
          }

          /* Modal full-screen on mobile */
          .pf-modal-overlay { padding: 0; align-items: flex-end; }
          .pf-modal {
            width: 100vw;
            max-width: 100vw;
            height: 92vh;
            max-height: 92vh;
            border-left: none;
            border-right: none;
            border-bottom: none;
            border-radius: 0;
          }
          .pf-modal-bar { padding: 12px 14px; }
          .pf-modal-title { font-size: 13px; }
          .pf-modal-badge { font-size: 8px; }
        }

        /* ══ PDF Modal overlay ══ */
        .pf-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4,4,4,0.90);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: pf-modal-fade 0.28s ease;
        }
        @keyframes pf-modal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .pf-modal {
          position: relative;
          width: 90vw;
          max-width: 1400px;
          height: 82vh;
          max-height: 920px;
          background: #111111;
          border: 1px solid #2A2A2A;
          display: flex;
          flex-direction: column;
          animation: pf-modal-rise 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
          box-shadow:
            0 48px 120px rgba(0,0,0,0.92),
            0 0 0 1px rgba(168,144,96,0.12);
        }
        @keyframes pf-modal-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* Modal top bar */
        .pf-modal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid #1E1E1E;
          flex-shrink: 0;
        }
        .pf-modal-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pf-modal-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #A89060;
        }
        .pf-modal-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #F0EDE6;
          letter-spacing: -0.01em;
        }

        /* Modal action buttons */
        .pf-modal-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pf-modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 18px;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #888070;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .pf-modal-btn:hover { border-color: #A89060; color: #A89060; }
        .pf-modal-btn svg { width: 11px; height: 11px; }

        .pf-modal-close {
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #888070;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, color 0.2s;
          flex-shrink: 0;
          margin-left: 6px;
        }
        .pf-modal-close:hover { border-color: #A89060; color: #A89060; }
        .pf-modal-close svg { width: 14px; height: 14px; }

        /* Viewer container — hosts either flipbook or iframe fallback */
        .pf-modal-viewer {
          flex: 1;
          overflow: hidden;
          position: relative;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .pf-modal-viewer iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          min-height: 62vh;
        }

        /* Fallback notice */
        .pf-fallback-notice {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: #555048;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-align: center;
          padding: 6px 0 2px;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .pf-stage { height: 510px; }
          .pf-card { width: 240px; }
          .pf-card[data-offset="0"]  { transform: translateX(0)      rotateY(0deg)   scale(2.08); }
          .pf-card[data-offset="-1"] { transform: translateX(-320px) rotateY(28deg)  scale(0.84); }
          .pf-card[data-offset="1"]  { transform: translateX(320px)  rotateY(-28deg) scale(0.84); }
          .pf-card[data-offset="-2"] { transform: translateX(-560px) rotateY(40deg)  scale(0.65); }
          .pf-card[data-offset="2"]  { transform: translateX(560px)  rotateY(-40deg) scale(0.65); }
        }
        @media (max-width: 768px) {
          .pf { padding: 80px 0 0; }
          .pf-stage { height: 460px; }
          .pf-card { width: 200px; }
          .pf-card[data-offset="0"]  { transform: translateX(0)       rotateY(0deg)   scale(1.98); }
          .pf-card[data-offset="-1"] { transform: translateX(-260px)  rotateY(22deg)  scale(0.82); opacity: 0.45; }
          .pf-card[data-offset="1"]  { transform: translateX(260px)   rotateY(-22deg) scale(0.82); opacity: 0.45; }
          .pf-card[data-offset="-2"], .pf-card[data-offset="2"] { opacity: 0; pointer-events: none; }

        }
        @media (max-width: 480px) {
          .pf-stage { height: 260px; }
          .pf-card { width: 170px; }
          .pf-card[data-offset="-1"] { transform: translateX(-178px) rotateY(22deg) scale(0.82); }
          .pf-card[data-offset="1"]  { transform: translateX(178px)  rotateY(-22deg) scale(0.82); }
        }
      `}</style>

      <section id="portfolio" className="pf">

        {/* diagonal-lines hidden */}

        {/* Header */}
        <div className="pf-header">
          <span className="pf-eyebrow">Portfolio</span>
          <h2 className="pf-title">Our Work</h2>
          <p className="pf-subtitle">
            A curated selection reflecting our expertise in premium metal trophies,
            medals, plaques, and gifts for government, sports, and corporate clients
            across Saudi Arabia.
          </p>
        </div>

        {/* Cover Flow Stage */}
        <div
          className="pf-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {PORTFOLIO.map((item, i) => {
            const offset = getOffset(i);
            if (Math.abs(offset) > 2) return null;
            return (
              <div
                key={item.title}
                className="pf-card"
                data-offset={String(offset)}
                onClick={() => offset !== 0 && setActive(i)}
              >
                {/* Dock hover layer — position:relative anchors the reflection */}
                <div className="pf-card-inner">
                  {/* Gold-frame layer — corner brackets + border */}
                  <div className="pf-img-frame">
                    {/* 4 corner brackets */}
                    <span className="pf-img-c pf-img-tl" aria-hidden="true" />
                    <span className="pf-img-c pf-img-tr" aria-hidden="true" />
                    <span className="pf-img-c pf-img-bl" aria-hidden="true" />
                    <span className="pf-img-c pf-img-br" aria-hidden="true" />

                    {/* Inner layer clips the image */}
                    <div className="pf-img-frame-inner">
                      {item.imgSrc
                        ? <img src={item.imgSrc} alt={item.title} />
                        : <div className="pf-img-ph">[ {item.badge} ]</div>
                      }
                      {/* Small label only on non-center cards */}
                      {offset !== 0 && (
                        <span className="pf-card-label">{item.badge}</span>
                      )}
                      {/* Hover overlay with CTA — center card only */}
                      {offset === 0 && item.profileUrl && (
                        <div className="pf-img-overlay">
                          <button
                            className="pf-img-overlay-btn"
                            onClick={(e) => { e.stopPropagation(); openModal(item); }}
                          >
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                              <rect x="1" y="1" width="10" height="10" rx="1"/>
                              <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round"/>
                            </svg>
                            View Project Profile
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* reflection handled by -webkit-box-reflect */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active item info — updates on slide change */}
        <div className="pf-info" key={active}>
          <span className="pf-info-badge">{cur.badge}</span>
          <h3 className="pf-info-title">{cur.title}</h3>
          <div className="pf-info-client">{cur.client}</div>
          <p className="pf-info-meta">{cur.specs}</p>

          {cur.profileUrl && (
            <button
              className="pf-profile-btn"
              onClick={() => openModal(cur)}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="1" y="1" width="10" height="10" rx="1"/>
                <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" strokeLinecap="round"/>
              </svg>
              View Project Profile
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="pf-controls">
          <button className="pf-arrow" onClick={prev} aria-label="Previous project">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="pf-dots">
            {PORTFOLIO.map((_, i) => (
              <button
                key={i}
                className={`pf-dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button className="pf-arrow" onClick={next} aria-label="Next project">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </section>

      {/* ── PDF Profile Modal — shows snapshot of the item clicked, isolated from slider ── */}
      {modalItem && (
        <div
          className="pf-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="pf-modal">
            {/* Top bar */}
            <div className="pf-modal-bar">
              <div className="pf-modal-meta">
                <span className="pf-modal-badge">{modalItem.badge}</span>
                <span className="pf-modal-title">{modalItem.title}</span>
              </div>

              <div className="pf-modal-actions">
                <button
                  className="pf-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer — flipbook primary, iframe fallback */}
            <div className="pf-modal-viewer">
              {useFallback ? (
                <>
                  <p className="pf-fallback-notice">Showing standard PDF viewer</p>
                  <iframe src={modalItem.pdfUrl} title={modalItem.title} />
                </>
              ) : (
                <PdfFlipbook
                  key={modalItem.pdfUrl}
                  pdfUrl={modalItem.pdfUrl}
                  onLoadError={() => setUseFallback(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
