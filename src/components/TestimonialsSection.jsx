import SectionFrame from './SectionFrame';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const TESTIMONIALS = [
  {
    quote: 'Golden Line delivered our National Day trophies with exceptional craftsmanship. The attention to detail in every piece exceeded our expectations.',
    quoteAr: 'سلّم الخط الذهبي كؤوسنا في اليوم الوطني بحرفية استثنائية. الاهتمام بالتفاصيل في كل قطعة فاق توقعاتنا.',
    name: 'Ahmed Al-Rashidi', role: 'Director of Corporate Affairs', roleAr: 'مدير الشؤون المؤسسية',
    company: 'Saudi Aramco', img: '/images/Partners-07.jpg',
  },
  {
    quote: 'We trusted Golden Line with our championship shields, and the result was outstanding. The gold plating quality and precision engraving were exactly what a world-class event demands.',
    quoteAr: 'وثقنا بالخط الذهبي لتنفيذ دروع البطولة، والنتيجة كانت رائعة. جودة الطلاء الذهبي ودقة النقش كانا بمستوى الفعاليات العالمية.',
    name: 'Khalid Al-Otaibi', role: 'Events Manager', roleAr: 'مدير الفعاليات',
    company: 'Saudi Football Federation', img: '/images/Partners-08.jpg',
  },
  {
    quote: 'From concept to final delivery, the team was professional and deeply creative. The commemorative gifts became the highlight of our leadership summit.',
    quoteAr: 'من الفكرة حتى التسليم، كان الفريق محترفاً وإبداعياً. الهدايا التذكارية أصبحت نجمة قمة القيادة لدينا.',
    name: 'Noura Al-Harbi', role: 'Head of Protocol & Events', roleAr: 'رئيسة البروتوكول والفعاليات',
    company: 'Ministry of Commerce', img: '/images/Partners-09.jpg',
  },
  {
    quote: 'Every piece Golden Line creates carries a sense of luxury and purpose. Three consecutive years of partnership and the quality remains consistently outstanding.',
    quoteAr: 'كل قطعة يصنعها الخط الذهبي تحمل روح الفخامة والهدف. ثلاث سنوات متتالية من الشراكة والجودة لا تتزعزع.',
    name: 'Faisal Al-Dosari', role: 'General Manager', roleAr: 'المدير العام',
    company: 'Al-Marai Group', img: '/images/Partners-10.jpg',
  },
  {
    quote: 'A seamless experience from brief to delivery. Their team understood our brand and translated it into trophies that truly represented the prestige of our awards ceremony.',
    quoteAr: 'تجربة سلسة من الإحاطة حتى التسليم. استوعب فريقهم هويتنا وترجموها إلى كؤوس تعبّر فعلاً عن مكانة حفل جوائزنا.',
    name: 'Sara Al-Mutairi', role: 'Brand Director', roleAr: 'مديرة العلامة التجارية',
    company: 'STC', img: '/images/Partners-11.jpg',
  },
  {
    quote: 'The commemorative shields crafted for our graduation ceremony were nothing short of masterpieces. Guests were genuinely impressed by the level of finish and detail.',
    quoteAr: 'الدروع التذكارية المصنوعة لحفل التخرج لدينا كانت تحفاً فنية بكل المقاييس. انبهر الحضور بمستوى التشطيب والتفاصيل.',
    name: 'Dr. Abdullah Al-Qahtani', role: 'Academic Affairs', roleAr: 'الشؤون الأكاديمية',
    company: 'King Saud University', img: '/images/Partners-12.jpg',
  },
];

export default function TestimonialsSection() {
  const { lang } = useLang();
  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════
           Client Feedback — clean vertical quote cards
        ══════════════════════════════════════════════ */
        .tm {
          background: #0D0D0D;
          padding: 28px 5%;
          position: relative;
          overflow: hidden;
        }

        /* ── Header ── */
        .tm-header {
          text-align: center;
          margin-bottom: 56px;
          position: relative; z-index: 1;
        }
        .tm-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          letter-spacing: .38em; text-transform: uppercase;
          color: #A89060; margin-bottom: 12px;
        }
        .tm-eyebrow::before, .tm-eyebrow::after {
          content: '◆'; font-size: 6px; opacity: .6;
        }
        .tm-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 300; color: #F0EDE6;
          letter-spacing: .02em;
        }
        .tm-title strong { font-weight: 600; color: #A89060; }

        /* ── 3-column grid ── */
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Quote card ── */
        .tm-card {
          background: #111;
          border: 1px solid rgba(168,144,96,0.13);
          border-radius: var(--r-card, 10px);
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: border-color .3s, transform .3s, box-shadow .3s;
        }
        .tm-card:hover {
          border-color: rgba(168,144,96,0.36);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.50);
        }
        /* subtle gold shimmer on hover */
        .tm-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(168,144,96,0.04) 0%, transparent 60%);
          opacity: 0; transition: opacity .3s;
          pointer-events: none;
        }
        .tm-card:hover::before { opacity: 1; }

        /* ── Stars + quote mark row ── */
        .tm-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .tm-stars {
          font-size: 11px;
          letter-spacing: .10em;
          color: #C9A24D;
          text-shadow: 0 0 8px rgba(201,162,77,.30);
          user-select: none;
        }
        .tm-qmark {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 52px;
          line-height: .6;
          color: #A89060;
          opacity: .18;
          user-select: none;
          flex-shrink: 0;
        }

        /* ── Quote text ── */
        .tm-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(240,237,230,0.72);
          line-height: 1.80;
          font-style: italic;
          flex: 1;
          margin-bottom: 24px;
        }

        /* ── Divider ── */
        .tm-sep {
          height: 1px;
          background: linear-gradient(to right, #A89060, transparent);
          opacity: .30;
          margin-bottom: 20px;
          width: 40px;
        }

        /* ── Author row ── */
        .tm-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* ── Avatar — clean circle, no skew ── */
        .tm-avatar-wrap {
          flex-shrink: 0;
          width: 50px; height: 50px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(135deg, rgba(168,144,96,.60) 0%, rgba(168,144,96,.15) 100%);
        }
        .tm-avatar {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: brightness(.92) saturate(.90);
          transition: filter .3s;
        }
        .tm-card:hover .tm-avatar {
          filter: brightness(1) saturate(1);
        }
        /* fallback initials */
        .tm-avatar-fallback {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #1A1A1A;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #A89060;
        }

        .tm-info { min-width: 0; }
        .tm-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 600;
          color: #F0EDE6;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        .tm-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 300;
          color: rgba(168,144,96,.75);
          letter-spacing: .04em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tm-company {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px; font-weight: 400;
          color: #555048;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .tm-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .tm-grid { grid-template-columns: 1fr; gap: 14px; }
          .tm { padding: 16px 4%; }
          .tm-card { padding: 24px 20px 22px; }
        }
      `}</style>

      <section id="testimonials" className="tm">
        <SectionFrame pad="64px 5%">
        <div className="tm-header">
          <div className="tm-eyebrow">{tr(T.testimonials.eyebrow, lang)}</div>
          <h2 className="tm-title">{tr(T.testimonials.title1, lang)} <strong>{tr(T.testimonials.title2, lang)}</strong></h2>
        </div>

        <div className="tm-grid">
          {TESTIMONIALS.map((t, i) => {
            const initials = t.name.split(' ').slice(0, 2).map(w => w[0]).join('');
            return (
              <div key={i} className="tm-card">
                {/* stars + decorative quote mark */}
                <div className="tm-top">
                  <div className="tm-stars" aria-label="5 stars">★★★★★</div>
                  <div className="tm-qmark" aria-hidden="true">"</div>
                </div>

                {/* quote body */}
                <p className="tm-text">{lang === 'ar' ? t.quoteAr : t.quote}</p>

                {/* divider */}
                <div className="tm-sep" />

                {/* author */}
                <div className="tm-author">
                  <div className="tm-avatar-wrap">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="tm-avatar"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="tm-avatar-fallback" style={{ display: 'none' }}>{initials}</div>
                  </div>
                  <div className="tm-info">
                    <div className="tm-name">{t.name}</div>
                    <div className="tm-role">{lang === 'ar' ? t.roleAr : t.role}</div>
                    <div className="tm-company">{t.company}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </SectionFrame>
      </section>
    </>
  );
}
