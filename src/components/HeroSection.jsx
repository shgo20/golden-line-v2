import { useEffect, useRef } from 'react';
import IslamicPattern from './IslamicPattern';

/*
  Ambient metallic letter field — two material types only:

  GOLD   : stroke-only outline, no fill — warm champagne stroke colour
  SILVER : semi-transparent platinum gradient fill + silver stroke

  Letters rise slowly from bottom to top with smooth organic sway,
  gentle 3-D tumble, metallic shimmer sweep (silver only),
  micro-sparkle light points, and low peak opacity so the whole field
  reads as an animated atmospheric background layer.
*/

const LETTERS = [
  /* ── Near (layer 2) ── */
  { char:'G', xPct: 8,  period:18000, phase:0.00, swayAmp:18, swayFreq:0.62, rotAmp:7, glintAt:0.44, layer:2, size:78, mat:'gold'   },
  { char:'D', xPct:34,  period:16400, phase:0.30, swayAmp:20, swayFreq:0.72, rotAmp:6, glintAt:0.56, layer:2, size:80, mat:'gold'   },
  { char:'O', xPct:58,  period:20000, phase:0.60, swayAmp:14, swayFreq:0.76, rotAmp:8, glintAt:0.36, layer:2, size:72, mat:'silver' },
  { char:'E', xPct:84,  period:16200, phase:0.14, swayAmp:16, swayFreq:0.68, rotAmp:6, glintAt:0.66, layer:2, size:70, mat:'silver' },
  /* ── Mid (layer 1) ── */
  { char:'L', xPct:20,  period:19200, phase:0.46, swayAmp:14, swayFreq:0.54, rotAmp:7, glintAt:0.34, layer:1, size:60, mat:'silver' },
  { char:'N', xPct:46,  period:16800, phase:0.72, swayAmp:16, swayFreq:0.82, rotAmp:6, glintAt:0.74, layer:1, size:56, mat:'gold'   },
  { char:'I', xPct:68,  period:18000, phase:0.24, swayAmp:12, swayFreq:0.70, rotAmp:5, glintAt:0.48, layer:1, size:58, mat:'silver' },
  { char:'G', xPct:82,  period:15600, phase:0.54, swayAmp:13, swayFreq:0.64, rotAmp:6, glintAt:0.52, layer:1, size:54, mat:'gold'   },
  { char:'E', xPct:12,  period:19000, phase:0.84, swayAmp:12, swayFreq:0.80, rotAmp:5, glintAt:0.38, layer:1, size:58, mat:'silver' },
  /* ── Far (layer 0) ── */
  { char:'O', xPct:28,  period:23000, phase:0.10, swayAmp: 7, swayFreq:0.84, rotAmp:4, glintAt:0.62, layer:0, size:38, mat:'gold'   },
  { char:'L', xPct:50,  period:25000, phase:0.38, swayAmp: 5, swayFreq:0.66, rotAmp:3, glintAt:0.50, layer:0, size:34, mat:'silver' },
  { char:'D', xPct:74,  period:22000, phase:0.64, swayAmp: 6, swayFreq:0.78, rotAmp:4, glintAt:0.70, layer:0, size:30, mat:'gold'   },
  { char:'N', xPct:90,  period:24000, phase:0.20, swayAmp: 5, swayFreq:0.70, rotAmp:3, glintAt:0.42, layer:0, size:28, mat:'gold'   },
  { char:'G', xPct:38,  period:26000, phase:0.78, swayAmp: 6, swayFreq:0.58, rotAmp:4, glintAt:0.58, layer:0, size:32, mat:'silver' },
  { char:'E', xPct:62,  period:21000, phase:0.48, swayAmp: 5, swayFreq:0.74, rotAmp:3, glintAt:0.32, layer:0, size:26, mat:'gold'   },
  { char:'L', xPct:16,  period:25500, phase:0.90, swayAmp: 6, swayFreq:0.62, rotAmp:4, glintAt:0.68, layer:0, size:30, mat:'silver' },
];

/* ── Materials ─────────────────────────────────────────────────────
   Gold  : stroke only — no background fill at all
   Silver: semi-transparent platinum gradient + silver stroke
   backgroundPositionX swept per frame only for silver
*/
const MAT = {
  gold: {
    stroke:    '0.62px rgba(212,172,52,0.80)',
    sparkRGB:  '255,240,120',
    glowRGB:   '212,172,52',
    glintPk:   4.0,
    hasFill:   false,
  },
  silver: {
    stroke:    '0.58px rgba(175,180,204,0.72)',
    bg: 'linear-gradient(125deg,' +
        'rgba(30,30,40,0.28) 0%,' +
        'rgba(118,122,146,0.50) 14%,' +
        'rgba(198,202,222,0.68) 30%,' +
        'rgba(136,140,164,0.54) 50%,' +
        'rgba(204,206,228,0.72) 68%,' +
        'rgba(118,122,146,0.50) 82%,' +
        'rgba(30,30,40,0.28) 100%)',
    sparkRGB:  '208,212,234',
    glowRGB:   '175,180,204',
    glintPk:   3.4,
    hasFill:   true,
  },
};

/* Layer settings */
const LAYER = [
  { peakOp:0.10, depth: 6,  baseBlur:0.4 },   // 0 far
  { peakOp:0.16, depth:14,  baseBlur:0.0 },   // 1 mid
  { peakOp:0.22, depth:24,  baseBlur:0.0 },   // 2 near
];

const lerp    = (a, b, t) => a + (b - a) * t;
const clamp01 = t => (t < 0 ? 0 : t > 1 ? 1 : t);

/* Smooth quintic ease — more fluid than cubic */
const easeOut5 = t => 1 - (1 - t) ** 5;
const easeIO   = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/* Gentler triple-harmonic sway — reduced amplitudes for smoother drift */
const turbSway = (amp, freq, pos) =>
  amp * (
    Math.sin(pos * Math.PI * 2 * freq) +
    0.22 * Math.sin(pos * Math.PI * 2 * freq * 2.37) +
    0.08 * Math.sin(pos * Math.PI * 2 * freq * 4.13)
  );

export default function HeroSection() {
  const heroRef    = useRef(null);
  const letterRefs = useRef([]);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const targetRef  = useRef({ x: 0, y: 0 });
  const rafRef     = useRef(null);

  useEffect(() => {
    const dims = letterRefs.current.map(el => ({
      w: el?.offsetWidth  || 48,
      h: el?.offsetHeight || 72,
    }));

    const start = performance.now();

    const tick = now => {
      const hw      = window.innerWidth;
      const hh      = window.innerHeight;
      const elapsed = now - start;
      const mobile  = hw < 768;

      /* Slower mouse lerp for a calmer parallax feel */
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, 0.028);
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, 0.028);

      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        /* الجوال: أخفِ نصف الطبقة البعيدة فقط للأداء، أبقِ القريبة والمتوسطة كاملة */
        if (mobile && LETTERS[i].layer === 0 && i % 2 !== 0) { el.style.opacity = '0'; return; }

        const d  = LETTERS[i];
        const dw = dims[i];
        const lv = LAYER[d.layer];
        const m  = MAT[d.mat];

        const pos = ((elapsed + d.phase * d.period) % d.period) / d.period;

        /* ── Opacity: smooth quintic fade in/out ──────────────── */
        /* على الجوال (بدون صورة خلفية) نرفع الـ opacity لتبدو الحروف أوضح */
        const opMul = mobile ? 1.8 : 1.0;
        let opacity, shimmer = 1;
        if (pos < 0.12) {
          opacity = easeOut5(pos / 0.12) * lv.peakOp * opMul;
        } else if (pos < 0.78) {
          shimmer = 1 + 0.18 * Math.sin(elapsed / 1100 + d.phase * 20);
          const breathe = 0.90 + 0.10 * Math.sin(((pos - 0.12) / 0.66) * Math.PI);
          opacity = lv.peakOp * opMul * clamp01(shimmer) * breathe;
        } else {
          opacity = easeOut5(1 - (pos - 0.78) / 0.22) * lv.peakOp * opMul;
        }
        opacity = Math.min(opacity, 0.85); /* لا تتجاوز 85% حتى تبقى خلفية */

        /* ── Position: smooth turbulent sway + linear rise ────── */
        const cx = hw * d.xPct / 100 + turbSway(d.swayAmp, d.swayFreq, pos);
        const cy = lerp(hh + dw.h + 40, -(dw.h + 40), pos);

        /* ── Gentle 3-D rotation ────────────────────────────────── */
        const f  = d.swayFreq;
        const rZ = d.rotAmp        * Math.sin(pos * Math.PI * 2 * f + 0.40);
        const rX = d.rotAmp * 0.45 * Math.sin(pos * Math.PI * 2 * f * 1.28 + 1.20);
        const rY = d.rotAmp * 0.32 * Math.sin(pos * Math.PI * 2 * f * 0.72 + 2.10);
        const scale = lerp(0.80, 1.10, pos);

        /* ── Metallic glint flash ────────────────────────────────── */
        const gd = Math.abs(pos - d.glintAt);
        const brightness = gd < 0.015
          ? 1 + (m.glintPk - 1) * Math.sin(clamp01(1 - gd / 0.015) * Math.PI)
          : 1;

        /* ── Shimmer sweep for silver only ───────────────────────── */
        if (m.hasFill) {
          el.style.backgroundPositionX = `${(pos * 150).toFixed(0)}%`;
        }

        /* ── Micro-sparkles ──────────────────────────────────────── */
        const ts  = elapsed / 1200;
        const rgb = m.sparkRGB;
        const s1a = clamp01(0.44 * Math.sin(ts * 1.15 + d.phase * 18));
        const s2a = clamp01(0.32 * Math.sin(ts * 0.88 + d.phase * 14 + 2.1));
        const s3a = clamp01(0.38 * Math.sin(ts * 1.42 + d.phase * 22 + 4.3));
        const s1x = (10 * Math.sin(ts * 0.65 + 1.0)).toFixed(1);
        const s1y = (-14 - 5 * Math.cos(ts * 0.48)).toFixed(1);
        const s2x = (-12 * Math.sin(ts * 0.55 + 2.4)).toFixed(1);
        const s2y = (-9  - 4 * Math.sin(ts * 0.76)).toFixed(1);
        const s3x = (6   * Math.cos(ts * 0.84 + 3.7)).toFixed(1);
        const s3y = (-20 - 6 * Math.cos(ts * 0.38 + 1.2)).toFixed(1);

        /* ── Blur: sharper in mid-rise ────────────────────────────── */
        const edgeDist  = Math.abs(pos - 0.5) * 2;
        const totalBlur = lerp(0, 1.8, edgeDist * edgeDist) + lv.baseBlur;

        /* ── Glow at shimmer peak ─────────────────────────────────── */
        const glowA = clamp01((shimmer - 1.06) * 5) * 0.24;

        /* ── Composite filter ─────────────────────────────────────── */
        const filters = [];
        if (totalBlur  > 0.08) filters.push(`blur(${totalBlur.toFixed(2)}px)`);
        if (brightness > 1.02) filters.push(`brightness(${brightness.toFixed(2)})`);
        if (glowA      > 0.01) filters.push(`drop-shadow(0 0 8px rgba(${m.glowRGB},${glowA.toFixed(2)}))`);
        if (s1a > 0.04) filters.push(`drop-shadow(${s1x}px ${s1y}px 1.2px rgba(${rgb},${s1a.toFixed(2)}))`);
        if (s2a > 0.04) filters.push(`drop-shadow(${s2x}px ${s2y}px 1.0px rgba(${rgb},${s2a.toFixed(2)}))`);
        if (s3a > 0.04) filters.push(`drop-shadow(${s3x}px ${s3y}px 0.8px rgba(${rgb},${s3a.toFixed(2)}))`);

        /* ── Mouse parallax ───────────────────────────────────────── */
        const tx = cx + mouseRef.current.x * lv.depth - dw.w / 2;
        const ty = cy + mouseRef.current.y * lv.depth - dw.h / 2;

        el.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) rotateZ(${rZ.toFixed(2)}deg)`;
        el.style.opacity   = clamp01(opacity).toFixed(3);
        el.style.filter    = filters.length ? filters.join(' ') : 'none';
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseMove = e => {
      targetRef.current.x = e.clientX / window.innerWidth  - 0.5;
      targetRef.current.y = e.clientY / window.innerHeight - 0.5;
    };

    /* Touch parallax للجوال */
    const onTouchMove = e => {
      const t = e.touches[0];
      targetRef.current.x = t.clientX / window.innerWidth  - 0.5;
      targetRef.current.y = t.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: transparent;
          overflow: hidden;
        }

        .hero-bg-image {
          position: absolute;
          top: 0; right: 0;
          width: 62%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          z-index: 0;
          filter: brightness(0.92);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to right,
            #0A0A0A 30%,
            rgba(10,10,10,0.88) 48%,
            rgba(10,10,10,0.35) 72%,
            rgba(10,10,10,0.05) 100%
          );
        }

        /* ── Letters layer ── */
        .hero-letters {
          position: absolute; inset: 0;
          z-index: 2; pointer-events: none; overflow: hidden;
          perspective: 900px;
        }

        .hero-letter {
          position: absolute;
          top: 0; left: 0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
          -webkit-text-fill-color: transparent;
          user-select: none;
          -webkit-user-select: none;
          will-change: transform, opacity, filter;
          opacity: 0;
          transform-origin: center center;
          white-space: nowrap;
        }

        /* ── زخرفة هندسية — بديل الشريط المائل ── */
        .hero-geo-accent {
          position: absolute;
          bottom: 60px; left: 5%;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }
        .hero-geo-accent-diamond {
          width: 10px; height: 10px;
          background: #A89060;
          transform: rotate(45deg);
          opacity: 0.8;
        }
        .hero-geo-accent-line {
          width: 60px; height: 1px;
          background: linear-gradient(to right, #A89060, transparent);
          opacity: 0.5;
        }
        .hero-geo-bottom-border {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(168,144,96,0.15) 20%,
            rgba(168,144,96,0.50) 50%,
            rgba(168,144,96,0.15) 80%,
            transparent 100%
          );
          z-index: 2;
        }

        /* ── Content ── */
        .hero-inner {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 140px 5% 80px;
          max-width: 680px;
        }

        .hero-eyebrow {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #A89060;
          font-weight: 400;
          margin-bottom: 22px;
        }

        .hero-h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 300;
          color: #F0EDE6;
          line-height: 1.12;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .hero-h1 strong { font-weight: 600; color: #F0EDE6; }

        .hero-h1-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1vw, 13px);
          font-weight: 400;
          color: #888070;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .hero-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #B0A898;
          line-height: 1.8;
          max-width: 480px;
          margin-bottom: 40px;
        }

        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .hero-bg-image { display: none; }
          .hero-overlay  { display: none; }
          .hero-inner {
            max-width: 100%;
            padding: 110px 6% 60px;
            text-align: center;
          }
          .hero-geo-accent { display: none; }
          .hero-body { max-width: 100%; margin-left: auto; margin-right: auto; }
          .hero-buttons { justify-content: center; }
        }

        @media (max-width: 768px) {
          .hero-inner { padding: 96px 5% 52px; }
        }

        @media (max-width: 480px) {
          .hero-inner { padding: 88px 4% 44px; }
          .hero-buttons { flex-direction: row; flex-wrap: wrap; gap: 10px; justify-content: center; }
          .hero-buttons a { flex: 1; min-width: 0; justify-content: center; font-size: 10px; padding: 12px 10px; letter-spacing: 0.10em; }
        }

        .hero .btn-primary {
          background: linear-gradient(
            135deg,
            #A08848 0%,
            #D4C080 28%,
            #F0E8C0 52%,
            #C8A858 76%,
            #A08848 100%
          );
          background-size: 200% 100%;
          color: #111111;
          border: none;
          transition: background-position 0.55s ease, box-shadow 0.25s ease, transform 0.15s ease;
        }
        .hero .btn-primary:hover {
          background-position: 100% 0;
          box-shadow: 0 6px 28px rgba(168,144,96,0.55);
          transform: translateY(-1px);
        }
      `}</style>

      <section id="hero" className="hero" ref={heroRef}>

        <img
          src="/images/hero-trophy.webp"
          alt="Golden Line premium trophy"
          className="hero-bg-image"
        />
        <div className="hero-overlay" />

        {/* باترن المثلثات — طبقة خلفية خفيفة خلف كل المحتوى */}
        <IslamicPattern opacity={0.04} size={72} style={{ zIndex: 0 }} />

        {/* 16 letters — gold stroke-only + silver gradient fill */}
        <div className="hero-letters" aria-hidden="true">
          {LETTERS.map((d, i) => (
            <span
              key={i}
              className="hero-letter"
              ref={el => { letterRefs.current[i] = el; }}
              style={d.mat === 'gold' ? {
                /* Gold: pure stroke outline, zero fill */
                fontSize:            `${d.size}px`,
                WebkitTextStroke:    MAT.gold.stroke,
                WebkitTextFillColor: 'transparent',
              } : {
                /* Silver: platinum gradient fill + silver stroke */
                fontSize:             `${d.size}px`,
                WebkitTextStroke:     MAT.silver.stroke,
                background:           MAT.silver.bg,
                backgroundSize:       '260% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip:       'text',
                WebkitTextFillColor:  'transparent',
              }}
            >
              {d.char}
            </span>
          ))}
        </div>

        {/* زخرفة هندسية سفلية */}
        <div className="hero-geo-accent" aria-hidden="true">
          <div className="hero-geo-accent-diamond" />
          <div className="hero-geo-accent-line" />
        </div>
        <div className="hero-geo-bottom-border" />

        <div className="hero-inner">
          <span className="hero-eyebrow">
            ◆ &nbsp; Saudi-Based Premier Metal Awards Manufacturer
          </span>
          <h1 className="hero-h1">
            Crafting<br />
            <strong>Excellence</strong>
          </h1>
          <p className="hero-h1-sub">Awards · Plaques · Trophies · Luxury Gifts</p>
          <p className="hero-body">
            Golden Line Metal Industries is a leading Saudi factory specializing
            in the design and production of premium metal trophies, medals,
            plaques, and luxury gifts — combining master craftsmanship with
            precision engineering.
          </p>
          <div className="hero-buttons">
            <a href="#portfolio" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Explore Our Work
            </a>
          </div>
        </div>

      </section>
    </>
  );
}
