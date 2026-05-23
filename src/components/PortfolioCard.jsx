/*
  PortfolioCard.jsx — FINAL v3
  Same parallelogram as ServiceCard — unified direction
  No card box · No bg · No border · No rotate · No tiltDir
*/

export default function PortfolioCard({ title, client, badge, specs, imgSrc, imgAlt }) {
  return (
    <>
      <style>{`
        /* Transparent layout wrapper */
        .pc {
          display: flex;
          flex-direction: column;
          background: transparent;
          border: none;
          position: relative;
        }

        /* ── Same parallelogram as ServiceCard ──
           Unified direction across ALL image cards.
        ─────────────────────────────────────── */
        .pc-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          position: relative;
          flex-shrink: 0;

          clip-path: polygon(
            0%   0%,
            84%  0%,
            100% 100%,
            16%  100%
          );

          filter:
            drop-shadow(0 18px 44px rgba(0,0,0,0.70))
            drop-shadow(0  4px 14px rgba(0,0,0,0.48));

          transition: filter 0.35s ease;
        }

        .pc:hover .pc-img {
          filter:
            drop-shadow(0 26px 58px rgba(0,0,0,0.82))
            drop-shadow(0  6px 18px rgba(0,0,0,0.58));
        }

        .pc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.84);
          transition: filter 0.35s ease, transform 0.45s ease;
        }
        .pc:hover .pc-img img {
          filter: brightness(1);
          transform: scale(1.05);
        }

        .pc-img-ph {
          width: 100%;
          height: 100%;
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 60%, #222 100%);
          color: #2A2A2A;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        /* Subtle bottom fade on hover */
        .pc-img-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,10,10,0.60) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }
        .pc:hover .pc-img-fade { opacity: 1; }

        /* Badge — top area, offset for the slant */
        .pc-badge {
          position: absolute;
          top: 12px;
          right: 24px;
          background: rgba(10,10,10,0.90);
          padding: 4px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #F0EDE6;
          border: 1px solid rgba(255,255,255,0.12);
          z-index: 2;
        }

        /* ── Straight text below — no box ── */
        .pc-body {
          padding: 14px 6px 0;
          background: transparent;
        }

        .pc-client {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888070;
          margin-bottom: 5px;
        }

        .pc-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #F0EDE6;
          margin-bottom: 5px;
          line-height: 1.4;
        }

        .pc-specs {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #888070;
          font-style: italic;
          line-height: 1.55;
        }

        @media (max-width: 768px) {
          .pc-img {
            clip-path: polygon(
              0%   0%,
              90%  0%,
              100% 100%,
              10%  100%
            );
          }
        }
      `}</style>

      <div className="pc">
        <div className="pc-img">
          {imgSrc
            ? <img src={imgSrc} alt={imgAlt || title} />
            : <div className="pc-img-ph">[ portfolio — 800×600px ]</div>
          }
          <div className="pc-img-fade" />
          {badge && <span className="pc-badge">{badge}</span>}
        </div>

        <div className="pc-body">
          <p className="pc-client">Client / {client}</p>
          <h3 className="pc-title">{title}</h3>
          {specs && <p className="pc-specs">{specs}</p>}
        </div>
      </div>
    </>
  );
}
