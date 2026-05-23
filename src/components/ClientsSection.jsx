const LOGOS = [
  { src: '/images/client-01.png', alt: 'Saudi Aramco' },
  { src: '/images/client-02.png', alt: 'Saudi Football Federation' },
  { src: '/images/client-03.png', alt: 'Ministry of Commerce' },
  { src: '/images/client-04.png', alt: 'Riyadh Metro' },
  { src: '/images/client-05.png', alt: 'King Salman Air College' },
  { src: '/images/client-06.png', alt: 'Air Intelligence Authority' },
  { src: '/images/client-07.png', alt: 'Al-Marai Group' },
  { src: '/images/client-08.png', alt: 'STC' },
  { src: '/images/client-09.png', alt: 'Falcons Club' },
  { src: '/images/client-10.png', alt: 'Saudi Olympic Committee' },
];

export default function ClientsSection() {
  return (
    <>
      <style>{`
        .cl {
          background: #0A0A0A;
          padding: 52px 5% 44px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #151515;
          border-bottom: 1px solid #151515;
        }

        /* ── Header ── */
        .cl-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .cl-eyebrow {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 10px;
        }
        .cl-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(20px, 2.4vw, 30px);
          font-weight: 300;
          color: #F0EDE6;
          letter-spacing: -0.01em;
        }

        /* ── Marquee container — fade mask on edges ── */
        .cl-marquee {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 18%,
            black 82%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 18%,
            black 82%,
            transparent 100%
          );
          /* Extra vertical space so scaled logos don't clip */
          padding: 24px 0;
        }

        /* ── Scrolling track ── */
        .cl-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: cl-scroll 52s linear infinite;
        }
        .cl-marquee:hover .cl-track {
          animation-play-state: paused;
        }

        @keyframes cl-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Logo item — frameless floating ──
           No border, no background card.
           Just spacing + overflow room for the scale animation.
        ─────────────────────────────────────────── */
        .cl-item {
          flex: 0 0 auto;
          width: 200px;
          height: 110px;
          margin: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: none;
          border: none;
          outline: none;
          /* Allow the scaled child to overflow the slot */
          overflow: visible;
          cursor: default;
        }

        /* ── Logo image ── */
        .cl-item img {
          max-width: 170px;
          max-height: 100px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          user-select: none;
          -webkit-user-drag: none;

          /* Quiet grayscale on dark bg — white PNG backgrounds handled by lighten */
          filter: grayscale(100%) brightness(1.5) opacity(0.50);
          mix-blend-mode: lighten;

          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            filter    0.35s ease,
            opacity   0.35s ease;
        }

        /* ── macOS Dock–style hover ──────────────────────
           Primary: hovered logo scales up and lifts.
           +1 neighbor (CSS can only reach right siblings):
             scale(1.18) slight lift.
           +2 neighbor: scale(1.08) minimal lift.
           For a "full dock" effect both ways, the JS-free
           approximation targets right siblings only — this
           still reads as an elegant ripple on a marquee.
        ─────────────────────────────────────────────────── */
        .cl-item:hover img {
          transform: scale(1.35) translateY(-8px);
          filter: grayscale(0%) brightness(1.15) opacity(1);
        }
        .cl-item:hover + .cl-item img {
          transform: scale(1.18) translateY(-4px);
          filter: grayscale(30%) brightness(1.08) opacity(0.85);
        }
        .cl-item:hover + .cl-item + .cl-item img {
          transform: scale(1.08) translateY(-2px);
          filter: grayscale(60%) brightness(1.04) opacity(0.70);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .cl { padding: 36px 4% 32px; }
          .cl-item { width: 165px; height: 90px; margin: 0 10px; }
          .cl-item img { max-width: 135px; max-height: 76px; }
          .cl-track { animation-duration: 28s; }
        }
        @media (max-width: 480px) {
          .cl-item { width: 132px; height: 72px; margin: 0 8px; }
          .cl-item img { max-width: 108px; max-height: 58px; }
          .cl-track { animation-duration: 22s; }
        }
      `}</style>

      <section className="cl" aria-label="Our success partners">
        <div className="cl-header">
          <span className="cl-eyebrow">Trusted Clients</span>
          <h2 className="cl-title">Success Partners</h2>
        </div>

        <div className="cl-marquee">
          {/* Duplicated ×2 for seamless infinite loop */}
          <div className="cl-track" aria-hidden="true">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="cl-item">
                <img src={logo.src} alt={logo.alt} draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
