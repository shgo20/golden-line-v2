import IslamicPattern from './IslamicPattern';
import SectionFrame from './SectionFrame';

const REASONS = [
  {
    num: '01',
    title: 'Design & Execution Excellence',
    body: 'Our team blends creative design with engineering expertise to craft pieces that precisely reflect our clients\' identity and the significance of every occasion.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Premium Metal Finishes',
    body: 'We apply gold, silver, nickel, and chrome plating to the highest industry standards, with protective layers that guarantee durability and lasting luxury.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4 2.4-7.4L2 9.4h7.6L12 2z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Fully Bespoke Solutions',
    body: 'No off-the-shelf templates — every project is designed from scratch in full collaboration with the client, from concept through to final delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4"  y1="21" x2="4"  y2="14"/>
        <line x1="4"  y1="10" x2="4"  y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/>
        <line x1="12" y1="8"  x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/>
        <line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1"  y1="14" x2="7"  y2="14"/>
        <line x1="9"  y1="8"  x2="15" y2="8"/>
        <line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Official Gift Expertise',
    body: 'We have fulfilled hundreds of orders for government bodies, sports organizations, and major corporations across Saudi Arabia and beyond.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8M12 17v4M7 4H4a1 1 0 00-1 1v2a4 4 0 004 4"/>
        <path d="M17 4h3a1 1 0 011 1v2a4 4 0 01-4 4"/>
        <path d="M7 4h10v7a5 5 0 01-10 0V4z"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Internationally Certified Quality',
    body: 'A comprehensive quality system covering raw material selection through to final packaging — every piece leaves our factory meeting exacting standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'On-Time Delivery Guarantee',
    body: 'We understand the value of your time. We honor agreed delivery schedules and have the capacity to handle urgent orders with efficiency.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  return (
    <>
      <style>{`
        .why {
          background: #0D0D0D;
          padding: 28px 5%;
          position: relative;
          overflow: hidden;
        }

        .why-header {
          position: relative; z-index: 1;
          text-align: center;
          margin-bottom: 72px;
        }
        .why-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 14px;
        }
        .why-eyebrow::before,
        .why-eyebrow::after { content: '◆'; font-size: 6px; opacity: 0.6; }

        .why-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          color: #F0EDE6;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }
        .why-title strong { font-weight: 700; color: #A89060; }

        .why-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #888070;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.85;
          text-align: center;
        }

        .why-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .why-card {
          background: #0D0D0D;
          border: 1px solid rgba(168,144,96,0.10);
          border-radius: var(--r-card, 10px);
          padding: 36px 28px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .why-card:hover {
          background: #111;
          border-color: rgba(168,144,96,0.28);
          transform: translateY(-3px);
        }

        .why-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: #A89060;
          transition: width 0.4s ease;
        }
        .why-card:hover::before { width: 100%; }

        .why-card-num {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(168,144,96,0.40);
          letter-spacing: 0.15em;
          margin-bottom: 18px;
        }

        .why-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          margin-bottom: 20px;
          color: rgba(168,144,96,0.65);
          transition: color 0.3s, transform 0.3s;
        }
        .why-card-icon svg {
          width: 100%; height: 100%;
        }
        .why-card:hover .why-card-icon {
          color: #C9A24D;
          transform: translateY(-2px) scale(1.08);
        }

        .why-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #F0EDE6;
          margin-bottom: 12px;
          letter-spacing: 0.01em;
          line-height: 1.3;
        }
        .why-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #777068;
          line-height: 1.85;
        }

        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .why { padding: 16px 4%; }
        }
        @media (max-width: 560px) {
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="why" className="why">
        <IslamicPattern opacity={0.07} size={80} />

        <SectionFrame pad="72px 5%">
        <div className="why-header">
          <div className="why-eyebrow">Quality &amp; Expertise</div>
          <h2 className="why-title">Why Choose <strong>Golden Line</strong>?</h2>
          <p className="why-body">
            We set quality standards at every stage of manufacturing, making us
            the first choice for those seeking luxury, precision, and reliability.
          </p>
        </div>

        <div className="why-grid">
          {REASONS.map(r => (
            <div key={r.title} className="why-card">
              <span className="why-card-num">{r.num}</span>
              <div className="why-card-icon" aria-hidden="true">{r.icon}</div>
              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-body">{r.body}</p>
            </div>
          ))}
        </div>
        </SectionFrame>
      </section>
    </>
  );
}
