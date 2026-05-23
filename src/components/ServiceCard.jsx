/*
  ServiceCard.jsx — FINAL v3
  Parallelogram clipped image (like red shape in reference)
  Top edge: near-horizontal
  Bottom edge: near-horizontal
  Left side: slanted
  Right side: slanted — same direction
  No card box · No bg · No border · No rotate
*/

export default function ServiceCard({ title, points, badge, imgSrc, imgAlt }) {
  return (
    <>
      <style>{`
        /* Transparent layout wrapper — nothing visual here */
        .sc {
          display: flex;
          flex-direction: column;
          background: transparent;
          border: none;
          position: relative;
        }

        /* ── Parallelogram image — reference shape ──
           polygon matches the red shape:
             top-left  : 16% 0%   (slanted left side starts here)
             top-right : 100% 0%  (no chamfer top-right)
             bot-right : 84% 100% (slanted right side ends here)
             bot-left  : 0% 100%  (slanted left side ends here)
           Both vertical sides lean the SAME direction.
           drop-shadow follows the clipped polygon exactly.
        ─────────────────────────────────────────────── */
        .sc-img {
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
            drop-shadow(0 18px 44px rgba(0,0,0,0.68))
            drop-shadow(0  4px 12px rgba(0,0,0,0.45));

          transition: filter 0.35s ease;
        }

        .sc:hover .sc-img {
          filter:
            drop-shadow(0 26px 56px rgba(0,0,0,0.80))
            drop-shadow(0  6px 18px rgba(0,0,0,0.55));
        }

        .sc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.88);
          transition: filter 0.35s ease, transform 0.45s ease;
        }
        .sc:hover .sc-img img {
          filter: brightness(1);
          transform: scale(1.04);
        }

        .sc-img-ph {
          width: 100%;
          height: 100%;
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

        /* Badge inside the parallelogram — bottom right area */
        .sc-badge {
          position: absolute;
          bottom: 14px;
          right: 22px;
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
        .sc-body {
          padding: 16px 6px 0;
          background: transparent;
        }

        .sc-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #F0EDE6;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .sc-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .sc-points li {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #888070;
          line-height: 1.65;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .sc-points li::before {
          content: '–';
          color: #A89060;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Mobile: reduce slant offset slightly */
        @media (max-width: 768px) {
          .sc-img {
            clip-path: polygon(
              0%   0%,
              90%  0%,
              100% 100%,
              10%  100%
            );
          }
        }
      `}</style>

      <div className="sc">
        <div className="sc-img">
          {imgSrc
            ? <img src={imgSrc} alt={imgAlt || title} />
            : <div className="sc-img-ph">[ {imgAlt || title} ]</div>
          }
          {badge && <span className="sc-badge">{badge}</span>}
        </div>

        <div className="sc-body">
          <h3 className="sc-title">{title}</h3>
          <ul className="sc-points">
            {points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}
