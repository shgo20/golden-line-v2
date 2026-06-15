import { useState } from 'react';
import { images } from '../data/images';
import { useLang } from '../context/LangContext';

const WEB3FORMS_KEY = 'a53c79e7-627a-47b2-bbf4-d00e529bd130';

const POSITIONS = {
  en: [
    'Sales Representative',
    'Digital Marketing Specialist',
    'Metal Craftsman',
    'Engraving Technician',
    'Graphic Designer',
    'Production Supervisor',
    'Quality Control',
    'Other',
  ],
  ar: [
    'مندوب مبيعات',
    'مسوق إلكتروني',
    'حرفي معدني',
    'فني نقش وحفر',
    'مصمم جرافيك',
    'مشرف إنتاج',
    'مراقبة الجودة',
    'أخرى',
  ],
};

export default function CareersPage({ onBack }) {
  const { lang } = useLang();
  const ar = lang === 'ar';

  const [form, setForm] = useState({
    fullName: '', nationality: '', phone: '', email: '',
    position: '', experience: '', message: '',
  });
  const [cv, setCv]         = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject:    ar ? `طلب توظيف – ${form.position}` : `Job Application – ${form.position}`,
        from_name:  form.fullName,
        replyto:    form.email,
        message: ar
          ? `الاسم: ${form.fullName}\nالجنسية: ${form.nationality}\nالجوال: ${form.phone}\nالبريد: ${form.email}\nالوظيفة: ${form.position}\nسنوات الخبرة: ${form.experience}\n\nرسالة التقديم:\n${form.message}`
          : `Name: ${form.fullName}\nNationality: ${form.nationality}\nPhone: ${form.phone}\nEmail: ${form.email}\nPosition: ${form.position}\nExperience: ${form.experience}\n\nCover Note:\n${form.message}`,
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ fullName:'', nationality:'', phone:'', email:'', position:'', experience:'', message:'' });
        setCv(null);
      } else {
        setError(ar ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.');
      }
    } catch {
      setError(ar ? 'تعذّر الإرسال، تحقق من الاتصال.' : 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* ══════════════════════════════
           Careers Page
        ══════════════════════════════ */
        .cr-page {
          min-height: 100vh;
          background: #0A0A0A;
          color: #F0EDE6;
          display: flex;
          flex-direction: column;
          direction: ${ar ? 'rtl' : 'ltr'};
        }

        /* ── Top bar ── */
        .cr-topbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          background: rgba(10,10,10,0.96);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #1E1E1E;
        }
        .cr-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(168,144,96,0.35);
          border-radius: var(--r-btn, 8px);
          color: rgba(168,144,96,0.80);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          padding: 8px 18px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
        }
        .cr-back-btn:hover {
          border-color: #A89060;
          color: #A89060;
          background: rgba(168,144,96,0.06);
        }
        .cr-back-btn svg { width: 12px; height: 12px; }

        .cr-topbar-logo img { height: 54px; }

        /* ── Hero band ── */
        .cr-hero {
          padding: 140px 5% 60px;
          text-align: center;
          position: relative;
        }
        .cr-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 0%,
            rgba(168,144,96,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .cr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #A89060;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .cr-eyebrow::before, .cr-eyebrow::after { content: '◆'; font-size: 8px; opacity: 0.6; }
        .cr-hero h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 300;
          color: #F0EDE6;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .cr-hero h1 strong { color: #A89060; font-weight: 700; }
        .cr-hero p {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #888070;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.85;
        }

        /* ── Form container ── */
        .cr-form-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 5% 80px;
          width: 100%;
        }

        /* ── Gold divider ── */
        .cr-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .cr-divider::before, .cr-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,144,96,0.35), transparent);
        }
        .cr-divider span {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #A89060;
          white-space: nowrap;
        }

        /* ── Form grid ── */
        .cr-form { display: flex; flex-direction: column; gap: 24px; }
        .cr-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .cr-row { grid-template-columns: 1fr; } }

        .cr-field { display: flex; flex-direction: column; gap: 8px; }
        .cr-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #A89060;
        }
        .cr-label .cr-req { color: rgba(168,144,96,0.50); margin-${ar ? 'right' : 'left'}: 3px; }

        .cr-input, .cr-select, .cr-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid #2A2A2A;
          border-radius: 0;
          color: #F0EDE6;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .cr-input::placeholder, .cr-textarea::placeholder { color: #3A3A3A; }
        .cr-input:focus, .cr-select:focus, .cr-textarea:focus {
          border-color: rgba(168,144,96,0.55);
          background: rgba(168,144,96,0.04);
        }
        .cr-select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23A89060' stroke-width='1.5' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: ${ar ? 'left 14px center' : 'right 14px center'};
          padding-${ar ? 'left' : 'right'}: 36px;
        }
        .cr-select option { background: #111; color: #F0EDE6; }
        .cr-textarea { resize: vertical; min-height: 120px; }

        /* ── CV upload ── */
        .cr-upload-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 1px dashed rgba(168,144,96,0.30);
          background: rgba(168,144,96,0.03);
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
        }
        .cr-upload-label:hover {
          border-color: rgba(168,144,96,0.60);
          background: rgba(168,144,96,0.06);
        }
        .cr-upload-label svg { width: 18px; height: 18px; color: #A89060; flex-shrink: 0; }
        .cr-upload-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #666058;
        }
        .cr-upload-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #A89060;
          margin-top: 4px;
        }
        input[type="file"] { display: none; }

        /* ── Submit button ── */
        .cr-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 32px;
          background: transparent;
          border: 1px solid rgba(168,144,96,0.55);
          color: #C8B080;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.28s;
          margin-top: 8px;
        }
        .cr-submit:hover:not(:disabled) {
          background: #A89060;
          color: #0A0A0A;
          border-color: #A89060;
          box-shadow: 0 8px 28px rgba(168,144,96,0.28);
        }
        .cr-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .cr-submit svg { width: 14px; height: 14px; }

        /* ── Success state ── */
        .cr-success {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .cr-success-icon {
          width: 64px; height: 64px;
          border: 1px solid rgba(168,144,96,0.40);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .cr-success-icon svg { width: 28px; height: 28px; stroke: #A89060; stroke-width: 1.5; }
        .cr-success h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 22px;
          font-weight: 300;
          color: #F0EDE6;
        }
        .cr-success p {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #888070;
          max-width: 420px;
          line-height: 1.8;
        }

        /* ── Error ── */
        .cr-error {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #C0705A;
          letter-spacing: 0.08em;
          padding: 10px 14px;
          border: 1px solid rgba(192,112,90,0.30);
          background: rgba(192,112,90,0.06);
        }

        /* ── Spinner ── */
        .cr-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(10,10,10,0.25);
          border-top-color: #0A0A0A;
          border-radius: 50%;
          animation: cr-spin 0.7s linear infinite;
        }
        @keyframes cr-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="cr-page">

        {/* Top bar */}
        <div className="cr-topbar">
          <button className="cr-back-btn" onClick={onBack}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={ar ? "M5 2l5 5-5 5" : "M7 2L2 7l5 5"} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {ar ? 'العودة للرئيسية' : 'Back to Home'}
          </button>

          <div className="cr-topbar-logo">
            <img src={images.logo} alt="Golden Line" />
          </div>
        </div>

        {/* Hero */}
        <div className="cr-hero">
          <div className="cr-eyebrow">{ar ? 'انضم إلى فريقنا' : 'Join Our Team'}</div>
          <h1>{ar ? <>كن جزءاً من <strong>قصة التميز</strong></> : <>Be Part of Our <strong>Excellence</strong></>}</h1>
          <p>
            {ar
              ? 'نبحث عن مواهب استثنائية تشاركنا شغف الصناعة المعدنية الفاخرة وبناء الهوية السعودية. أرسل طلبك وسنتواصل معك.'
              : 'We seek exceptional talent who share our passion for premium metal craftsmanship and building Saudi identity. Send your application and we will reach out.'}
          </p>
        </div>

        {/* Form */}
        <div className="cr-form-wrap">
          <div className="cr-divider">
            <span>{ar ? 'نموذج التقديم' : 'Application Form'}</span>
          </div>

          {sent ? (
            <div className="cr-success">
              <div className="cr-success-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{ar ? 'تم إرسال طلبك بنجاح!' : 'Application Sent!'}</h3>
              <p>
                {ar
                  ? 'شكراً لاهتمامك بالانضمام إلى فريق Golden Line. سنراجع طلبك ونتواصل معك في أقرب وقت.'
                  : 'Thank you for your interest in joining Golden Line. We will review your application and get back to you soon.'}
              </p>
            </div>
          ) : (
            <form className="cr-form" onSubmit={handleSubmit} noValidate>

              <div className="cr-row">
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'الاسم الكامل' : 'Full Name'}<span className="cr-req">*</span>
                  </label>
                  <input
                    className="cr-input"
                    name="fullName"
                    type="text"
                    required
                    placeholder={ar ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'الجنسية' : 'Nationality'}<span className="cr-req">*</span>
                  </label>
                  <input
                    className="cr-input"
                    name="nationality"
                    type="text"
                    required
                    placeholder={ar ? 'مثال: سعودي' : 'e.g. Saudi'}
                    value={form.nationality}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cr-row">
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'رقم الجوال' : 'Phone'}<span className="cr-req">*</span>
                  </label>
                  <input
                    className="cr-input"
                    name="phone"
                    type="tel"
                    required
                    placeholder={ar ? 'مثال: 0501234567' : 'e.g. +966 50 123 4567'}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'البريد الإلكتروني' : 'Email'}<span className="cr-req">*</span>
                  </label>
                  <input
                    className="cr-input"
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cr-row">
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'الوظيفة المطلوبة' : 'Position'}<span className="cr-req">*</span>
                  </label>
                  <select
                    className="cr-select"
                    name="position"
                    required
                    value={form.position}
                    onChange={handleChange}
                  >
                    <option value="">{ar ? '— اختر الوظيفة —' : '— Select position —'}</option>
                    {POSITIONS[lang].map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="cr-field">
                  <label className="cr-label">
                    {ar ? 'سنوات الخبرة' : 'Years of Experience'}<span className="cr-req">*</span>
                  </label>
                  <select
                    className="cr-select"
                    name="experience"
                    required
                    value={form.experience}
                    onChange={handleChange}
                  >
                    <option value="">{ar ? '— اختر —' : '— Select —'}</option>
                    <option value={ar ? 'أقل من سنة' : 'Less than 1 year'}>{ar ? 'أقل من سنة' : 'Less than 1 year'}</option>
                    <option value={ar ? '1–3 سنوات' : '1–3 years'}>{ar ? '1–3 سنوات' : '1–3 years'}</option>
                    <option value={ar ? '3–5 سنوات' : '3–5 years'}>{ar ? '3–5 سنوات' : '3–5 years'}</option>
                    <option value={ar ? 'أكثر من 5 سنوات' : '5+ years'}>{ar ? 'أكثر من 5 سنوات' : '5+ years'}</option>
                  </select>
                </div>
              </div>

              <div className="cr-field">
                <label className="cr-label">{ar ? 'رسالة التقديم' : 'Cover Note'}</label>
                <textarea
                  className="cr-textarea"
                  name="message"
                  placeholder={ar ? 'أخبرنا عن نفسك ولماذا تريد الانضمام إلينا...' : 'Tell us about yourself and why you want to join Golden Line...'}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="cr-error">{error}</div>}

              <button type="submit" className="cr-submit" disabled={loading}>
                {loading ? (
                  <span className="cr-spinner" />
                ) : (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {loading
                  ? (ar ? 'جارٍ الإرسال...' : 'Sending...')
                  : (ar ? 'إرسال الطلب' : 'Submit Application')}
              </button>

            </form>
          )}
        </div>
      </div>
    </>
  );
}
