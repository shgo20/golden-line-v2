import { useState, useEffect } from 'react';
import { contactInfo } from '../data/contact';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════
           Floating WhatsApp — circular, large
        ══════════════════════════════════════ */
        .wa-wrap {
          position: fixed;
          bottom: 32px;
          left: 32px;
          z-index: 9999;
          width: 62px;
          height: 62px;
        }

        /* ── Two sonar rings ── */
        .wa-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(168,144,96,0.65);
          opacity: 0;
          pointer-events: none;
          animation: wa-sonar 2.6s ease-out infinite;
        }
        .wa-ring:nth-child(2) { animation-delay: 1.3s; }

        @keyframes wa-sonar {
          0%   { inset: 0;     opacity: 0.70; }
          100% { inset: -22px; opacity: 0; }
        }

        /* ── Main button ── */
        .wa-float {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          /* thin gold ring */
          box-shadow:
            0 0 0 1.5px rgba(168,144,96,0.40),
            0 8px 32px rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;

          opacity: 0;
          transform: scale(0.6) translateY(14px);
          pointer-events: none;

          /* spring entry + hover */
          transition:
            opacity     0.5s ease,
            transform   0.5s cubic-bezier(0.34,1.56,0.64,1),
            background  0.3s ease,
            box-shadow  0.35s ease;
        }

        .wa-wrap.visible .wa-float {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }

        /* ── Hover: spring bounce + glow ── */
        .wa-float:hover {
          transform: scale(1.22) translateY(-5px);
          background: rgba(168,144,96,0.16);
          box-shadow:
            0 0 0 2px rgba(168,144,96,0.70),
            0 0 28px 6px rgba(168,144,96,0.22),
            0 14px 40px rgba(0,0,0,0.50);
        }

        /* icon */
        .wa-float svg {
          width: 30px;
          height: 30px;
          fill: #A89060;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition:
            fill      0.3s ease,
            transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
        }
        /* icon spring-jump on hover */
        .wa-float:hover svg {
          fill: #E8CC80;
          transform: scale(1.15) rotate(-8deg);
        }

        /* pause rings on hover — attention stays on icon */
        .wa-wrap:hover .wa-ring {
          animation-play-state: paused;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        /* don't animate rings before visible */
        .wa-wrap:not(.visible) .wa-ring {
          animation-play-state: paused;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .wa-wrap  { bottom: 22px; left: 18px; width: 54px; height: 54px; }
          .wa-float { width: 54px; height: 54px; }
          .wa-float svg { width: 26px; height: 26px; }
        }
      `}</style>

      <div className={`wa-wrap${visible ? ' visible' : ''}`}>
        <span className="wa-ring" aria-hidden="true" />
        <span className="wa-ring" aria-hidden="true" />

        <a
          className="wa-float"
          href={contactInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
