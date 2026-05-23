import { useState, useEffect, useRef } from 'react';
import { images } from '../data/images';
import IslamicPattern from './IslamicPattern';
import SectionFrame from './SectionFrame';

const STATS = [
  { value: 10,  suffix: '+', label: 'Years of Experience', delay: 0   },
  { value: 500, suffix: '+', label: 'Projects Delivered',  delay: 140 },
  { value: 200, suffix: '+', label: 'Trusted Clients',     delay: 280 },
  { value: 7,   suffix: '',  label: 'Core Services',       delay: 420 },
];

/* ── easing: fast start → gentle stop ── */
function easeOutQuart(t) { return 1 - (1 - t) ** 4; }

/* ── Individual animated stat card ── */
function StatItem({ value, suffix, label, delay, active }) {
  const [displayed, setDisplayed] = useState(0);
  const [done,      setDone]      = useState(false);
  const rafRef   = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    timerRef.current = setTimeout(() => {
      const duration = Math.max(1000, Math.min(value * 4, 2000));
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        setDisplayed(Math.round(easeOutQuart(t) * value));
        if (t < 1) { rafRef.current = requestAnimationFrame(step); }
        else        { setDone(true); }
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, value, delay]);

  const pct = value > 0 ? (displayed / value) * 100 : 0;

  return (
    <div className={`stat-item${done ? ' done' : ''}`}>
      {/* corner accent */}
      <div className="stat-corner" />

      <span className="stat-num">
        {displayed}
        <span className={`stat-suf${done ? ' vis' : ''}`}>{suffix}</span>
      </span>

      {/* animated gold bar */}
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${pct}%` }} />
      </div>

      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   AboutSection
══════════════════════════════════════════════════════ */
export default function AboutSection() {
  const [triggered, setTriggered] = useState(false);
  const statsRef = useRef(null);

  /* trigger once when stats grid enters viewport */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about {
          background: #111111;
          padding: 28px 5%;
          position: relative;
          overflow: hidden;
        }

        .about-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* ── ornament ── */
        .about-ornament {
          display: flex; align-items: center;
          gap: 10px; margin-bottom: 14px;
        }
        .about-ornament-line {
          flex: 1; max-width: 40px; height: 1px;
          background: linear-gradient(to right, transparent, #A89060);
        }
        .about-ornament-line.right {
          background: linear-gradient(to left, transparent, #A89060);
        }
        .about-ornament-diamond {
          width: 8px; height: 8px;
          background: #A89060;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .about-eyebrow {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 16px;
        }
        .about-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 300;
          color: #F0EDE6;
          line-height: 1.18;
          margin-bottom: 26px;
          letter-spacing: -0.01em;
        }
        .about-title strong { font-weight: 700; color: #A89060; }

        .about-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #888070;
          line-height: 1.88;
          margin-bottom: 16px;
          text-align: justify;
        }
        .about-body:last-of-type { margin-bottom: 34px; }

        /* ══════════════════════════════════
           STATS  — animated count-up grid
        ══════════════════════════════════ */
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 14px;
        }

        .stat-item {
          background: #0D0D0D;
          border: 1px solid rgba(168,144,96,0.12);
          border-radius: var(--r-card, 10px);
          padding: 30px 20px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.35s, border-color 0.35s;
        }
        .stat-item:hover { background: #121212; border-color: rgba(168,144,96,0.28); }

        /* corner accent */
        .stat-corner {
          position: absolute;
          top: 0; right: 0;
          width: 18px; height: 18px;
          border-top: 1px solid rgba(168,144,96,0.30);
          border-right: 1px solid rgba(168,144,96,0.30);
          transition: width .4s, height .4s, border-color .4s;
        }
        .stat-item.done .stat-corner {
          width: 26px; height: 26px;
          border-color: rgba(168,144,96,0.70);
        }

        /* number */
        .stat-num {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 42px;
          font-weight: 600;
          color: #A89060;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          transition: text-shadow .5s;
          font-variant-numeric: tabular-nums;
        }
        .stat-item.done .stat-num {
          text-shadow:
            0 0 20px rgba(168,144,96,.40),
            0 0 40px rgba(168,144,96,.15);
        }

        /* suffix ( + ) */
        .stat-suf {
          font-size: 0.52em;
          font-weight: 400;
          letter-spacing: 0;
          vertical-align: super;
          margin-left: 1px;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity .35s, transform .35s;
          display: inline-block;
        }
        .stat-suf.vis {
          opacity: 1;
          transform: translateY(0);
        }

        /* animated gold bar */
        .stat-track {
          height: 2px;
          background: rgba(168,144,96,0.10);
          width: 56px;
          margin: 10px auto 12px;
          overflow: hidden;
          border-radius: 1px;
        }
        .stat-fill {
          height: 100%;
          background: linear-gradient(to right, #8A7048, #D4B87A, #A89060);
          transition: width 0.05s linear;
          border-radius: 1px;
        }

        /* label */
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 400;
          color: #555048;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color .4s;
        }
        .stat-item.done .stat-label { color: #7A7060; }

        /* ── image frame ── */
        .about-img-wrap    { position: relative; cursor: pointer; }
        .about-img-outer {
          position: relative; padding: 12px;
          border: 1px solid rgba(168,144,96,0.18);
          background: transparent;
        }
        .about-img-outer::before {
          content: ''; position: absolute;
          top: -1px; left: -1px;
          width: 28px; height: 28px;
          border-top: 2px solid #A89060;
          border-left: 2px solid #A89060;
        }
        .about-img-outer::after {
          content: ''; position: absolute;
          bottom: -1px; right: -1px;
          width: 28px; height: 28px;
          border-bottom: 2px solid #A89060;
          border-right: 2px solid #A89060;
        }
        .about-img-corners { position: absolute; inset: -1px; pointer-events: none; }
        .about-img-corners::before {
          content: ''; position: absolute;
          top: -1px; right: -1px;
          width: 28px; height: 28px;
          border-top: 2px solid #A89060;
          border-right: 2px solid #A89060;
        }
        .about-img-corners::after {
          content: ''; position: absolute;
          bottom: -1px; left: -1px;
          width: 28px; height: 28px;
          border-bottom: 2px solid #A89060;
          border-left: 2px solid #A89060;
        }
        .about-img-frame {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #1A1A1A;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .about-img-wrap:hover .about-img-frame { transform: scale(1.01); }
        .about-img-frame::after {
          content: ''; position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
          background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%);
          transform: translateX(-120%);
          transition: transform 0.75s ease;
        }
        .about-img-wrap:hover .about-img-frame::after { transform: translateX(120%); }
        .about-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 30%;
          display: block;
          transition: transform 0.65s ease, filter 0.5s ease;
          filter: brightness(0.90);
        }
        .about-img-wrap:hover .about-img { transform: scale(1.04); filter: brightness(1.0); }
        .about-img-placeholder {
          width: 100%; height: 100%; min-height: 260px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #1A1A1A, #0D0D0D);
          color: #2A2A2A; font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
        }

        /* ── vision block ── */
        .about-vision {
          background: #0D0D0D;
          border: 1px solid rgba(168,144,96,0.18);
          border-left: 3px solid #A89060;
          border-radius: var(--r-card, 10px);
          padding: 22px 20px 22px 24px;
          margin-top: 20px;
          position: relative;
        }
        .about-vision::before {
          content: '◆'; position: absolute;
          top: -8px; left: 20px;
          font-size: 8px; color: #A89060;
          background: #0D0D0D; padding: 0 6px;
        }
        .about-vision-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600;
          color: #A89060; margin-bottom: 10px;
          letter-spacing: 0.18em; text-transform: uppercase;
        }
        .about-vision-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300;
          color: #777068; line-height: 1.88;
          text-align: justify;
        }

        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; gap: 52px; }
          .about { padding: 16px 4%; }
          .about-img-outer { padding: 8px; }
        }
      `}</style>

      <section id="about" className="about">
        <IslamicPattern opacity={0.055} size={90} />

        <SectionFrame pad="72px 5%">
        <div className="about-inner">
          <div className="about-text">
            <div className="about-ornament">
              <div className="about-ornament-line" />
              <div className="about-ornament-diamond" />
              <div className="about-ornament-line right" />
            </div>

            <span className="about-eyebrow">Who We Are</span>
            <h2 className="about-title">
              Golden Line<br />
              <strong>Metal Industries</strong>
            </h2>

            <p className="about-body">
              Golden Line Metal Industries Factory is a Saudi manufacturer specializing
              in the design and production of premium metal trophies, medals, plaques,
              and luxury gifts. We combine refined craftsmanship, modern production
              techniques, and elegant finishing to deliver pieces that reflect value,
              recognition, and prestige.
            </p>

            <p className="about-body">
              From the heart of Saudi Arabia, we develop innovative solutions for
              government entities, sports organizations, educational institutions,
              and major corporations — with full capability to execute custom projects
              and exceptional orders.
            </p>

            <p className="about-body">
              Our factory employs advanced manufacturing technologies including metal
              forming, casting, laser cutting, luxury plating (gold, silver, nickel),
              and meticulous hand finishing.
            </p>

            <a href="#contact" className="btn-primary">Get in Touch</a>

            {/* ── Animated stats grid ── */}
            <div className="about-stats" ref={statsRef}>
              {STATS.map(s => (
                <StatItem key={s.label} {...s} active={triggered} />
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-img-wrap">
              <div className="about-img-outer">
                <div className="about-img-corners" />
                <div className="about-img-frame">
                  {images.about
                    ? <img src={images.about} alt="Golden Line factory workshop" className="about-img" />
                    : <div className="about-img-placeholder">[ factory-workshop.jpg ]</div>
                  }
                </div>
              </div>
            </div>

            <div className="about-vision">
              <div className="about-vision-title">Vision &amp; Mission</div>
              <p className="about-vision-body">
                We are committed to delivering a complete experience — from design and
                production to luxury packaging and on-time delivery — making us the
                trusted partner for those seeking premium metal gifts that endure and
                commemorate memorable milestones.
              </p>
            </div>
          </div>
        </div>
        </SectionFrame>
      </section>
    </>
  );
}
