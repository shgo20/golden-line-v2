import { contactInfo } from '../data/contact';
import { images } from '../data/images';

export default function CTASection() {
  return (
    <>
      <style>{`
        .cta-section {
          background: #4A5A3A;
          position: relative;
          overflow: visible;
          /* leave breathing room above so the floating trophy isn't cut by the
             sibling section above — the section above must not have overflow:hidden */
          isolation: isolate;
        }
        .cta-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          min-height: 240px;
          padding: 60px 5%;
        }
        .cta-title-en {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(240,237,230,0.60);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
          font-style: italic;
        }
        .cta-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(20px, 2.5vw, 30px);
          font-weight: 300;
          color: #F0EDE6;
          line-height: 1.25;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }
        .cta-title strong { font-weight: 600; }
        .cta-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(176,168,152,0.85);
          line-height: 1.8;
          max-width: 440px;
          margin-bottom: 28px;
        }
        .cta-buttons { display: flex; gap: 14px; flex-wrap: wrap; }

        .btn-wa-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: transparent;
          color: #A89060;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(168,144,96,0.55);
          border-radius: var(--r-btn, 8px);
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.2s, box-shadow 0.3s;
          white-space: nowrap;
        }
        .btn-wa-gold:hover {
          background: rgba(168,144,96,0.10);
          border-color: #A89060;
          color: #D4B87A;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(168,144,96,0.18);
        }
        .btn-wa-gold svg { width: 18px; height: 18px; fill: currentColor; flex-shrink: 0; }

        /* ── Image — positioned relative to .cta-section directly ── */
        .cta-image-wrap {
          /* empty grid-column spacer, keeps the 55/45 layout intact */
          pointer-events: none;
        }
        .cta-img {
          /* anchored to .cta-section (position:relative), not to the grid column */
          position: absolute;
          right: 2%;
          bottom: 0;           /* base touches section's own bottom edge */
          width: 825px;
          max-width: none;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          filter:
            drop-shadow(0 22px 28px rgba(0,0,0,0.38))
            drop-shadow(0 -8px 28px rgba(201,162,77,0.18));
          z-index: 2;
        }

        @media (max-width: 1100px) {
          .cta-img { width: 600px; right: 0; }
        }

        @media (max-width: 900px) {
          .cta-inner {
            grid-template-columns: 1fr;
            padding: 52px 6% 48px;
          }
          .cta-img { display: none; }
          .cta-section { overflow: hidden; }
        }
        @media (max-width: 480px) {
          .cta-buttons { flex-direction: column; }
          .cta-buttons a { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="cta-section">
        {/* diagonal-lines hidden */}
        <div className="cta-inner">
          <div>
            <span className="cta-title-en">Start your award-creation journey.</span>
            <h2 className="cta-title">
              Begin Your<br />
              <strong>Award Design</strong> Journey
            </h2>
            <p className="cta-body">
              Contact us today for a complimentary design consultation and a detailed
              quote for your award project. Our team is ready to transform your vision
              into a masterpiece.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn-primary">Get a Quote</a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-wa-gold">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* empty spacer keeps the 55/45 grid column */}
          <div className="cta-image-wrap" aria-hidden="true" />
        </div>

        {/* image is a direct child of .cta-section so bottom:0 anchors
            to the section's own bottom edge, not the grid column */}
        <img
          src={images.cta}
          alt="Golden Line trophies"
          className="cta-img"
        />
      </section>
    </>
  );
}
