import { useState } from 'react';
import IslamicPattern from './IslamicPattern';
import SectionFrame from './SectionFrame';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const FAQS = [
  {
    q: 'What types of products do you manufacture?',
    qAr: 'ما أنواع المنتجات التي تصنعونها؟',
    a: 'We specialize in premium metal awards and gifts — trophies, shields, medals, plaques, commemorative coins, 3D sculptures, custom corporate gifts, and metal décor & signage. All products are available in gold, silver, nickel, and chrome finishes.',
    aAr: 'نتخصص في الجوائز والهدايا المعدنية الفاخرة — كؤوس، دروع، ميداليات، ألواح تذكارية، عملات، مجسمات ثلاثية الأبعاد، هدايا مؤسسية، وديكور معدني. تتوفر جميع المنتجات بتشطيبات الذهب والفضة والنيكل والكروم.',
  },
  {
    q: 'What is the minimum order quantity?',
    qAr: 'ما هي الحد الأدنى لكمية الطلب؟',
    a: 'We accept orders of any size — from a single handcrafted piece for a special occasion to thousands of units for large-scale national events. Contact us and we will tailor a quote to suit your requirements.',
    aAr: 'نقبل الطلبات بأي كمية — من قطعة واحدة لمناسبة خاصة إلى آلاف الوحدات للفعاليات الوطنية الكبرى. تواصل معنا وسنُعدّ عرض سعر يناسب احتياجاتك.',
  },
  {
    q: 'Can I see a prototype before placing a large order?',
    qAr: 'هل يمكنني رؤية نموذج أولي قبل تقديم طلب كبير؟',
    a: 'Yes. For significant orders we produce a pre-production sample (master copy) for your full approval before manufacturing begins. This ensures every detail — engraving, finish, weight — meets your exact specifications.',
    aAr: 'نعم. للطلبات الكبيرة نُنتج نموذجاً أولياً للموافقة الكاملة قبل بدء التصنيع، مما يضمن أن كل تفصيل — نقش، تشطيب، وزن — يطابق مواصفاتك تماماً.',
  },
  {
    q: 'What finishes and materials do you offer?',
    qAr: 'ما التشطيبات والمواد التي تقدمونها؟',
    a: 'Our standard finishes include 24K gold plating, silver plating, nickel plating, and chrome plating applied over brass or zinc-alloy bases. We also offer oxidized antique gold and silver treatments for a heritage aesthetic.',
    aAr: 'تشمل تشطيباتنا الطلاء بالذهب عيار 24 قيراط، الفضة، النيكل، والكروم على قواعد نحاسية أو زنك. كما نقدم معالجات الذهب والفضة المؤكسدة للطابع التراثي.',
  },
  {
    q: 'How long does production take?',
    qAr: 'كم تستغرق مدة الإنتاج؟',
    a: 'Standard orders are typically ready in 2–3 weeks. Rush orders can be accommodated — contact us to discuss express options. For high-volume orders (500+ pieces) we will agree on a production schedule tailored to your event date.',
    aAr: 'الطلبات العادية جاهزة عادةً في 2–3 أسابيع. نستوعب الطلبات المستعجلة — تواصل معنا لمناقشة خيارات التسريع. للطلبات الضخمة (500+ قطعة) نتفق على جدول إنتاج مخصص.',
  },
  {
    q: 'Do you deliver across Saudi Arabia and the GCC?',
    qAr: 'هل تُوصّلون إلى جميع مناطق المملكة ودول الخليج؟',
    a: 'Yes. We deliver to all cities across the Kingdom and ship to GCC countries. Our luxury packaging is engineered to protect each piece in transit and arrives ready for presentation.',
    aAr: 'نعم. نوصّل إلى جميع مدن المملكة ونشحن لدول مجلس التعاون. تغليفنا الفاخر مصمم لحماية كل قطعة أثناء النقل وتصل جاهزة للتقديم.',
  },
  {
    q: 'Can you create a fully custom design from scratch?',
    qAr: 'هل يمكنكم تصميم قطعة فريدة من الصفر؟',
    a: 'Absolutely. Our in-house design team guides you from the initial concept through technical drawings, 3D renders, and material selection — all the way to the finished piece. No templates, no off-the-shelf shapes: every order is unique.',
    aAr: 'بالتأكيد. يرافقك فريق التصميم الداخلي لدينا من الفكرة الأولى عبر الرسومات الفنية والنماذج ثلاثية الأبعاد واختيار المواد — حتى القطعة النهائية. لا قوالب جاهزة: كل طلب فريد.',
  },
];

export default function FAQSection() {
  const { lang } = useLang();
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(prev => prev === i ? null : i);

  return (
    <>
      <style>{`
        .faq {
          background: #0A0A0A;
          padding: 28px 5%;
          position: relative;
          overflow: hidden;
        }
        .faq-border-top  { top: 0; }
        .faq-border-bottom { bottom: 0; }

        .faq-inner {
          position: relative; z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .faq-eyebrow {
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
        .faq-eyebrow::before, .faq-eyebrow::after { content: '◆'; font-size: 6px; opacity: 0.6; }
        .faq-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 300;
          color: #F0EDE6;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .faq-title strong { font-weight: 700; color: #A89060; }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-item {
          border-bottom: 1px solid #1E1E1E;
        }
        .faq-item:first-child { border-top: 1px solid #1E1E1E; }

        .faq-q {
          width: 100%;
          background: none;
          border: none;
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          cursor: pointer;
          text-align: left;
        }
        .faq-q-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #C8C0B0;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .faq-item.is-open .faq-q-text,
        .faq-q:hover .faq-q-text { color: #F0EDE6; }

        .faq-icon {
          flex-shrink: 0;
          width: 28px; height: 28px;
          border: 1px solid #2A2A2A;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A89060;
          font-size: 16px;
          line-height: 1;
          transition: border-color 0.3s, background 0.3s, transform 0.35s;
        }
        .faq-item.is-open .faq-icon {
          border-color: rgba(168,144,96,0.55);
          background: rgba(168,144,96,0.08);
          transform: rotate(45deg);
        }

        .faq-a-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.42s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-item.is-open .faq-a-wrap {
          max-height: 260px;
        }
        .faq-a {
          padding: 0 40px 24px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #888070;
          line-height: 1.9;
        }

        .faq-cta {
          text-align: center;
          margin-top: 56px;
          padding-top: 48px;
          border-top: 1px solid #1A1A1A;
        }
        .faq-cta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #888070;
          margin-bottom: 20px;
        }
        .faq-cta-label strong { color: #C8B88A; font-weight: 400; }

        @media (max-width: 768px) {
          .faq { padding: 16px 4%; }
          .faq-q-text { font-size: 14px; }
          .faq-a { padding-right: 16px; }
        }
      `}</style>

      <section className="faq">
        <IslamicPattern opacity={0.055} size={80} />

        <SectionFrame maxWidth="narrow" pad="72px 5%">
        <div className="faq-inner">
          <div className="faq-header">
            <div className="faq-eyebrow">{tr(T.faq.eyebrow, lang)}</div>
            <h2 className="faq-title">
              {tr(T.faq.title1, lang)} <strong>{tr(T.faq.title2, lang)}</strong>
            </h2>
          </div>

          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div key={i} className={`faq-item${open === i ? ' is-open' : ''}`}>
                <button className="faq-q" onClick={() => toggle(i)} aria-expanded={open === i}>
                  <span className="faq-q-text">{lang === 'ar' ? item.qAr : item.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-a-wrap" aria-hidden={open !== i}>
                  <p className="faq-a">{lang === 'ar' ? item.aAr : item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <p className="faq-cta-label">
              {tr(T.faq.ctaLabel, lang)}<br/>
              <strong>{tr(T.faq.ctaStrong, lang)}</strong>
            </p>
            <a href="https://wa.me/966560341878" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {tr(T.faq.ctaBtn, lang)}
            </a>
          </div>
        </div>
        </SectionFrame>
      </section>
    </>
  );
}
