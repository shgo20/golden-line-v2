import { useState, useRef, useEffect } from 'react';
import { contactInfo } from '../data/contact';
import SectionFrame from './SectionFrame';
import { useLang } from '../context/LangContext';
import { T, tr } from '../lib/translations';

const SERVICES = [
  { key: 'shields',  label: 'Shields & Plaques',    labelAr: 'الدروع والألواح',       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v5c0 5 4 9 9 10 5-1 9-5 9-10V7L12 2z"/></svg> },
  { key: 'trophies', label: 'Trophies & Medals',    labelAr: 'الكؤوس والميداليات',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4H4a1 1 0 00-1 1v2a4 4 0 004 4"/><path d="M17 4h3a1 1 0 011 1v2a4 4 0 01-4 4"/><path d="M7 4h10v7a5 5 0 01-10 0V4z"/></svg> },
  { key: 'gifts',    label: 'Custom Gifts',          labelAr: 'الهدايا المخصصة',       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><rect x="5" y="12" width="14" height="9" rx="1"/><path d="M12 8v13M9 8c-1.5 0-3-1.5-1.5-3S12 5 12 8M15 8c1.5 0 3-1.5 1.5-3S12 5 12 8"/></svg> },
  { key: 'decor',    label: 'Metal Decor & Signage', labelAr: 'الديكور المعدني',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 21h10M12 17v4"/><path d="M7 8h10M7 11h6"/></svg> },
  { key: '3d',       label: '3D Design & Mfg',       labelAr: 'التصميم ثلاثي الأبعاد', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"/><path d="M12 2v18M4 6.5l8 4.5 8-4.5"/></svg> },
  { key: 'awards',   label: 'Awards & Medals',       labelAr: 'الجوائز والأوسمة',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 21l3-3 3 3M12 15v3"/><path d="M12 6l1.5 3 3 .5-2 2 .5 3L12 13l-3 1.5.5-3-2-2 3-.5L12 6z"/></svg> },
  { key: 'luxury',   label: 'Luxury Gift Pieces',    labelAr: 'الهدايا الفاخرة',       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 6h6.5l-5 4 2 6.5L12 15l-6 3.5 2-6.5-5-4h6.5L12 2z"/></svg> },
];

const MATERIALS = [
  { key: 'gold',    label: 'Gold Plated',    labelAr: 'مطلي بالذهب'  },
  { key: 'silver',  label: 'Silver Plated',  labelAr: 'مطلي بالفضة'  },
  { key: 'chrome',  label: 'Chrome',         labelAr: 'كروم'           },
  { key: 'nickel',  label: 'Nickel',         labelAr: 'نيكل'           },
  { key: 'bronze',  label: 'Bronze',         labelAr: 'برونز'          },
  { key: 'custom',  label: 'Custom',         labelAr: 'مخصص'          },
];

const SIZES = [
  { key: 'xs',     label: 'XS',     sub: '< 15 cm'  },
  { key: 'sm',     label: 'S',      sub: '15–25 cm' },
  { key: 'md',     label: 'M',      sub: '25–40 cm' },
  { key: 'lg',     label: 'L',      sub: '40–60 cm' },
  { key: 'xl',     label: 'XL',     sub: '> 60 cm'  },
  { key: 'custom', label: 'Custom', sub: 'Any size'  },
];

export default function ContactSection() {
  const { lang } = useLang();
  const now   = new Date();
  const CY    = now.getFullYear();   // current year
  const CM    = now.getMonth() + 1;  // current month 1-12
  const CD    = now.getDate();       // current day

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  /* days in a given month/year (Gregorian) */
  const daysIn = (m, y) => new Date(y, m, 0).getDate();

  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', dd:'', mm:'', yyyy:'', quantity:'', message:'' });
  const [services,      setServices]      = useState([]);
  const [serviceConfigs, setServiceConfigs] = useState({});
  const [activeService, setActiveService] = useState(null);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const svcSectionRef = useRef(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  /* ── Card click ──
     • غير محدد → اختيار + فتح الـ dropdown
     • محدد + dropdown مفتوح → إغلاق الـ dropdown فقط (الاختيار يبقى)
     • محدد + dropdown مغلق → فتح الـ dropdown (الاختيار يبقى)
     إلغاء الاختيار: فقط بالضغط على علامة ✓ (deselect)
  ── */
  const handleCardClick = key => {
    if (activeService === key && services.includes(key)) {
      /* dropdown مفتوح + محدد → الضغطة الثانية تلغي الاختيار */
      deselect(null, key);
    } else if (activeService === key) {
      setActiveService(null);
    } else {
      setActiveService(key);
      if (!services.includes(key))
        setServices(prev => [...prev, key]);
    }
  };

  /* ── إلغاء الاختيار — يعمل من الزر ✓ ومن داخل الـ dropdown ── */
  const deselect = (e, key) => {
    if (e) e.stopPropagation();
    setServices(prev => prev.filter(k => k !== key));
    setServiceConfigs(prev => { const n = {...prev}; delete n[key]; return n; });
    setActiveService(null);
  };

  /* ── Click outside entire service section → close dropdown ── */
  useEffect(() => {
    const handler = e => {
      if (svcSectionRef.current && !svcSectionRef.current.contains(e.target)) {
        setActiveService(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Dropdown selections ── */
  const selectMaterial = (svcKey, matKey) => {
    setServiceConfigs(prev => ({ ...prev, [svcKey]: { ...(prev[svcKey] || {}), material: matKey, size: '' } }));
    if (!services.includes(svcKey)) setServices(prev => [...prev, svcKey]);
  };
  const selectSize = (svcKey, sizeKey) =>
    setServiceConfigs(prev => ({ ...prev, [svcKey]: { ...(prev[svcKey] || {}), size: sizeKey, customSize: '' } }));

  const setCustomSize = (svcKey, val) =>
    setServiceConfigs(prev => ({ ...prev, [svcKey]: { ...(prev[svcKey] || {}), customSize: val } }));

  const activeMat  = activeService ? serviceConfigs[activeService]?.material : null;
  const activeSize = activeService ? serviceConfigs[activeService]?.size     : null;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    const deliveryDate = (form.dd && form.mm && form.yyyy)
      ? `${form.dd} ${MONTHS[+form.mm - 1]} ${form.yyyy}`
      : 'Not specified';
    const svcLines = services.length > 0
      ? services.map(k => {
          const s = SERVICES.find(sv => sv.key === k);
          const c = serviceConfigs[k] || {};
          const matLabel  = c.material ? MATERIALS.find(m => m.key === c.material)?.label : null;
          const sizeLabel = c.size === 'custom' && c.customSize
            ? `Custom ${c.customSize} cm`
            : c.size ? SIZES.find(z => z.key === c.size)?.label : null;
          let line = `• ${s?.label}`;
          if (matLabel)  line += `  |  Finish: ${matLabel}`;
          if (sizeLabel) line += `  |  Size: ${sizeLabel}`;
          return line;
        }).join('\n')
      : 'Not selected';

    try {
      const payload = {
        access_key:    'a53c79e7-627a-47b2-bbf4-d00e529bd130',
        subject:       `New Golden Line Inquiry — ${form.name || 'Website'}`,
        from_name:     'Golden Line Website',
        replyto:       form.email,
        /* ── بيانات العميل ── */
        name:          form.name,
        company:       form.company       || '—',
        email:         form.email,
        phone:         `+966 ${form.phone}`,
        /* ── تفاصيل الطلب ── */
        services:      svcLines,
        delivery_date: deliveryDate,
        quantity:      form.quantity      || '—',
        message:       form.message       || '—',
      };
      const res = await fetch('https://api.web3forms.com/submit', { method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, body:JSON.stringify(payload) });
      const result = await res.json();
      if (res.ok && result.success) { setSent(true); }
      else { setError(result.message || 'Something went wrong.'); }
    } catch { setError('Something went wrong. Please try again or contact us on WhatsApp.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .contact {
          background:
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(168,144,96,0.04) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,10,10,0.72) 0%, rgba(15,15,15,0.85) 50%, rgba(10,10,10,0.72) 100%);
          padding: 28px 5%; position:relative; overflow:hidden;
        }
        .contact::before {
          content:'';
          position:absolute; inset:0; z-index:0;
          background: rgba(10,10,10,0.60);
          pointer-events:none;
        }
        .contact-inner {
          position:relative; z-index:1; display:grid;
          grid-template-columns:1fr 1.6fr; gap:80px; align-items:start;
        }
        .contact-info { border-left:3px solid #A89060; padding-left:28px; }
        .contact-eyebrow { display:block; font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:#A89060; margin-bottom:14px; }
        .contact-title { font-family:'DM Sans',sans-serif; font-size:clamp(22px,2.5vw,30px); font-weight:300; color:#F0EDE6; line-height:1.3; margin-bottom:36px; }
        .contact-item { display:flex; gap:16px; align-items:flex-start; margin-bottom:28px; transition:transform 0.2s; cursor:default; }
        .contact-item:hover { transform:translateX(4px); }
        .contact-icon { width:48px; height:48px; display:flex; align-items:center; justify-content:center; color:#A89060; flex-shrink:0; transition:color 0.3s, transform 0.3s; }
        .contact-item:hover .contact-icon { color:#D4B87A; transform: scale(1.15); }
        .contact-icon svg { width:22px; height:22px; fill:currentColor; }
        .contact-item-label { font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:#A89060; margin-bottom:4px; }
        .contact-item-value { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:#B0A898; text-decoration:none; transition:color 0.2s; display:block; }
        .contact-item-value:hover { color:#F0EDE6; }
        .contact-divider { width:100%; height:1px; background:linear-gradient(to right,rgba(168,144,96,0.5),transparent); margin:8px 0 28px; }
        .contact-wa { display:inline-flex; align-items:center; gap:10px; padding:13px 28px; background:transparent; color:#A89060; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(168,144,96,0.55); border-radius:var(--r-btn,8px); transition:background 0.3s,border-color 0.3s,color 0.3s,transform 0.2s,box-shadow 0.3s; }
        .contact-wa:hover { background:rgba(168,144,96,0.10); border-color:#A89060; color:#D4B87A; transform:translateY(-2px); box-shadow:0 8px 24px rgba(168,144,96,0.18); }
        .contact-wa svg { width:18px; height:18px; fill:currentColor; flex-shrink:0; }

        /* ── Form ── */
        .contact-form-title { font-family:'DM Sans',sans-serif; font-size:18px; font-weight:600; color:#F0EDE6; margin-bottom:6px; }
        .contact-form-sub { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:#888070; margin-bottom:36px; line-height:1.7; }
        .form-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px; }
        .form-group { margin-bottom:24px; position:relative; }
        .field-label { display:block; font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#A89060; margin-bottom:8px; }
        .field-wrap { position:relative; }
        .field-input { width:100%; background:transparent; border:none; border-bottom:1px solid #2A2A2A; color:#F0EDE6; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; padding:8px 0 10px; outline:none; box-sizing:border-box; transition:border-color 0.3s; }
        .field-input::placeholder { color:#3A3A3A; }
        .field-input:focus { border-bottom-color:#A89060; }
        .field-line { position:absolute; bottom:0; left:0; width:0; height:1px; background:linear-gradient(to right,#A89060,#F0E1B0,#A89060); transition:width 0.45s ease; pointer-events:none; }
        .field-input:focus ~ .field-line { width:100%; }
        textarea.field-input { resize:vertical; min-height:100px; padding-top:8px; }
        .date-selects { display:grid; grid-template-columns:1fr 1.6fr 1.1fr; gap:10px; }
        .date-sel-wrap { display:flex; flex-direction:column; gap:4px; }
        .date-sel {
          width:100%; background:transparent; border:none; border-bottom:1px solid #2A2A2A;
          color:#F0EDE6; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300;
          padding:8px 4px 10px; outline:none; cursor:pointer; appearance:none;
          -webkit-appearance:none; transition:border-color 0.3s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A89060'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 4px center; background-size:8px;
          padding-right:20px;
        }
        .date-sel:focus { border-bottom-color:#A89060; }
        .date-sel option { background:#111; color:#F0EDE6; }
        .date-sel-label { font-family:'DM Sans',sans-serif; font-size:8px; letter-spacing:0.15em; color:#555; text-transform:uppercase; }
        .phone-wrap { display:flex; align-items:flex-end; }
        .phone-prefix { padding:8px 12px 10px; border-bottom:1px solid #2A2A2A; color:#A89060; font-size:12px; font-family:'DM Sans',sans-serif; display:flex; align-items:center; white-space:nowrap; flex-shrink:0; background:transparent; transition:border-color 0.3s; }
        .phone-wrap:focus-within .phone-prefix { border-bottom-color:#A89060; }
        .phone-wrap .field-wrap { flex:1; }

        /* ── Service cards ── */
        .chip-section { margin-bottom:28px; position:relative; }
        .chip-section-label { font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#A89060; margin-bottom:14px; display:block; }
        .svc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .svc-card {
          border:1px solid #222; background:rgba(255,255,255,0.02);
          padding:16px 10px 14px; display:flex; flex-direction:column;
          align-items:center; gap:10px; cursor:pointer; position:relative;
          overflow:hidden; transition:border-color 0.3s,background 0.3s,transform 0.2s;
        }
        .svc-card::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.10) 50%,transparent 70%); transform:translateX(-120%); transition:transform 0.6s ease; pointer-events:none; }
        .svc-card:hover::after { transform:translateX(120%); }
        .svc-card:hover, .svc-card.hovered { border-color:rgba(168,144,96,0.6); transform:translateY(-2px); background:rgba(168,144,96,0.06); }
        .svc-card.active { border-color:#A89060; background:rgba(168,144,96,0.12); }
        .svc-card.active .svc-icon { color:#F0E1B0; }
        .svc-card.active .svc-check { opacity:1; }
        .svc-icon { color:#555; transition:color 0.3s; width:26px; height:26px; flex-shrink:0; }
        .svc-icon svg { width:100%; height:100%; }
        .svc-label { font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:#888070; text-align:center; line-height:1.4; transition:color 0.3s; }
        .svc-card.active .svc-label { color:#C8B88A; }
        .svc-check { position:absolute; top:6px; right:10px; width:16px; height:16px; border:1px solid #A89060; border-radius:50%; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.3s, background 0.2s; cursor:pointer; z-index:2; }
        .svc-check:hover { background:rgba(168,144,96,0.25); }
        .svc-check svg { width:8px; height:8px; stroke:#A89060; fill:none; pointer-events:none; }

        /* ── Dropdown panel ── */
        .svc-dropdown {
          border:1px solid rgba(168,144,96,0.28);
          border-top:2px solid #A89060;
          background:rgba(10,10,10,0.96);
          backdrop-filter:blur(12px);
          padding:20px 22px 18px;
          margin-top:10px;
          animation:dropFade 0.22s ease;
          position:relative;
        }
        @keyframes dropFade {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .svc-dropdown-title {
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:0.25em; text-transform:uppercase;
          color:#A89060; margin-bottom:12px; display:flex;
          align-items:center; gap:8px;
        }
        .svc-dropdown-title span { color:#F0EDE6; font-size:10px; font-weight:500; letter-spacing:0.05em; text-transform:none; }
        .svc-dropdown-row { margin-bottom:16px; }
        .svc-dropdown-row:last-child { margin-bottom:0; }
        .chip-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .chip {
          padding:7px 16px; border:1px solid #2A2A2A;
          background:transparent; color:#888070;
          font-family:'DM Sans',sans-serif; font-size:10px;
          letter-spacing:0.12em; text-transform:uppercase; cursor:pointer;
          transition:border-color 0.25s,color 0.25s,background 0.25s;
          white-space:nowrap; position:relative; overflow:hidden;
        }
        .chip::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.12) 50%,transparent 70%); transform:translateX(-120%); transition:transform 0.55s ease; pointer-events:none; }
        .chip:hover::after { transform:translateX(120%); }
        .chip:hover { border-color:#A89060; color:#C8B88A; }
        .chip.active { border-color:#A89060; background:rgba(168,144,96,0.14); color:#F0E1B0; }
        .size-chip { padding:10px 18px; display:flex; flex-direction:column; align-items:center; gap:2px; }
        .size-chip-main { font-size:12px; font-weight:600; letter-spacing:0.08em; }
        .size-chip-sub  { font-size:8px; color:#666; letter-spacing:0.1em; }
        .size-chip.active .size-chip-sub { color:#A89060; }
        .size-sub-label { animation:dropFade 0.2s ease; }
        .custom-size-wrap { animation:dropFade 0.22s ease; margin-top:14px; display:flex; align-items:center; gap:10px; }
        .custom-size-wrap label { font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:#A89060; white-space:nowrap; flex-shrink:0; }
        .custom-size-input { background:transparent; border:none; border-bottom:1px solid #2A2A2A; color:#F0EDE6; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; padding:6px 8px 8px; outline:none; width:120px; transition:border-color 0.3s; }
        .custom-size-input:focus { border-bottom-color:#A89060; }
        .custom-size-input::placeholder { color:#3A3A3A; }
        .custom-size-unit { font-family:'DM Sans',sans-serif; font-size:11px; color:#555; letter-spacing:0.1em; }

        /* ── Submit ── */
        .form-submit { display:flex; justify-content:flex-end; margin-top:8px; }
        .form-submit button { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; min-width:180px; display:inline-flex; align-items:center; justify-content:center; gap:10px; }
        /* override global clip-path for this section only */
        .form-submit .btn-primary { clip-path: none; }
        .form-submit button:disabled { opacity:0.6; cursor:not-allowed; }
        .btn-spinner { width:14px; height:14px; border:2px solid rgba(10,10,10,0.25); border-top-color:#0A0A0A; border-radius:50%; animation:spin 0.7s linear infinite; flex-shrink:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .form-success { display:flex; flex-direction:column; align-items:center; text-align:center; padding:56px 20px; border:1px solid rgba(168,144,96,0.20); position:relative; overflow:hidden; }
        .form-success::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(to right,transparent,#A89060,transparent); }
        .form-success-icon { width:56px; height:56px; border:1px solid #A89060; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .form-success-icon svg { width:24px; height:24px; stroke:#A89060; fill:none; }
        .form-success h3 { font-family:'DM Sans',sans-serif; font-size:20px; font-weight:600; color:#F0EDE6; margin-bottom:10px; }
        .form-success p { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:300; color:#888070; line-height:1.8; max-width:340px; }
        .form-error { font-family:'DM Sans',sans-serif; font-size:12px; color:#C97070; margin-bottom:12px; line-height:1.6; border-left:2px solid #C97070; padding-left:10px; }
        input[type="number"]::-webkit-inner-spin-button { opacity:0.3; }

        @media (max-width:900px) {
          .contact-inner { grid-template-columns:1fr; gap:48px; }
          .contact { padding:16px 4%; }
          .contact-info { border-left:none; border-top:3px solid #A89060; padding-left:0; padding-top:20px; }
          .svc-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:560px) {
          .form-grid-2 { grid-template-columns:1fr; }
          .svc-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      <section id="contact" className="contact">
        <SectionFrame pad="72px 5%">
        <div className="contact-inner">

          {/* ── Info ── */}
          <div className="contact-info">
            <span className="contact-eyebrow">{tr(T.contact.eyebrow, lang)}</span>
            <h2 className="contact-title">{tr(T.contact.title, lang)}</h2>
            <div className="contact-item">
              <div className="contact-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg></div>
              <div><div className="contact-item-label">{tr(T.contact.labelAddress, lang)}</div><span className="contact-item-value">{contactInfo.address}</span></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
              <div><div className="contact-item-label">{tr(T.contact.labelEmail, lang)}</div><a href={`mailto:${contactInfo.email}`} className="contact-item-value">{contactInfo.email}</a></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div>
              <div><div className="contact-item-label">{tr(T.contact.labelPhone, lang)}</div><a href={`tel:+${contactInfo.phone}`} className="contact-item-value">{contactInfo.phoneDisplay}</a></div>
            </div>
            <div className="contact-divider" />
            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-wa">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {tr(T.contact.whatsapp, lang)}
            </a>
          </div>

          {/* ── Form ── */}
          <div>
            <div className="contact-form-title">{tr(T.contact.formTitle, lang)}</div>
            <p className="contact-form-sub">{tr(T.contact.formSub, lang)}</p>

            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>{tr(T.contact.successTitle, lang)}</h3>
                <p>{tr(T.contact.successBody, lang)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="field-label" htmlFor="name">{tr(T.contact.labelName, lang)}</label>
                    <div className="field-wrap"><input id="name" name="name" type="text" required className="field-input" placeholder={tr(T.contact.phName, lang)} value={form.name} onChange={handleChange}/><span className="field-line"/></div>
                  </div>
                  <div className="form-group">
                    <label className="field-label" htmlFor="company">{tr(T.contact.labelCompany, lang)}</label>
                    <div className="field-wrap"><input id="company" name="company" type="text" className="field-input" placeholder={tr(T.contact.phCompany, lang)} value={form.company} onChange={handleChange}/><span className="field-line"/></div>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="field-label" htmlFor="email">{tr(T.contact.labelEmail2, lang)}</label>
                    <div className="field-wrap"><input id="email" name="email" type="email" required className="field-input" placeholder={contactInfo.email} value={form.email} onChange={handleChange}/><span className="field-line"/></div>
                  </div>
                  <div className="form-group">
                    <label className="field-label" htmlFor="phone">{tr(T.contact.labelPhone2, lang)}</label>
                    <div className="phone-wrap">
                      <span className="phone-prefix">🇸🇦 +966</span>
                      <div className="field-wrap"><input id="phone" name="phone" type="tel" required className="field-input" placeholder="5X XXX XXXX" value={form.phone} onChange={handleChange}/><span className="field-line"/></div>
                    </div>
                  </div>
                </div>

                {/* ── Service cards + cascading dropdown ── */}
                <div className="chip-section" ref={svcSectionRef}>
                  <span className="chip-section-label">{tr(T.contact.selectService, lang)}</span>
                  <div className="svc-grid">
                    {SERVICES.map(s => (
                      <button key={s.key} type="button"
                        className={`svc-card${services.includes(s.key) ? ' active' : ''}${activeService === s.key ? ' hovered' : ''}`}
                        onClick={() => handleCardClick(s.key)}>
                        <span className="svc-check" onClick={e => deselect(e, s.key)} title="Remove">
                          <svg viewBox="0 0 10 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 5 4 7 8 3"/></svg>
                        </span>
                        <span className="svc-icon">{s.icon}</span>
                        <span className="svc-label">{lang === 'ar' ? s.labelAr : s.label}</span>
                        {serviceConfigs[s.key]?.material && (
                          <span style={{fontSize:'7px',color:'#A89060',letterSpacing:'0.1em',textTransform:'uppercase'}}>
                            {lang === 'ar' ? MATERIALS.find(m=>m.key===serviceConfigs[s.key].material)?.labelAr : MATERIALS.find(m=>m.key===serviceConfigs[s.key].material)?.label}
                            {serviceConfigs[s.key]?.size
                              ? ` · ${serviceConfigs[s.key].size === 'custom' && serviceConfigs[s.key].customSize
                                  ? `${serviceConfigs[s.key].customSize} cm`
                                  : SIZES.find(z=>z.key===serviceConfigs[s.key].size)?.label || 'Custom'}`
                              : ''}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* ── Cascading dropdown — stays open until next click ── */}
                  {activeService && (
                    <div className="svc-dropdown">
                      <div className="svc-dropdown-title">
                        {tr(T.contact.matFinish, lang)}
                        <span>— {lang === 'ar' ? SERVICES.find(s=>s.key===activeService)?.labelAr : SERVICES.find(s=>s.key===activeService)?.label}</span>
                        <div style={{marginLeft:'auto',display:'flex',gap:'8px',alignItems:'center'}}>
                          {services.includes(activeService) && (
                            <button type="button" onClick={() => deselect(null, activeService)}
                              style={{background:'none',border:'1px solid rgba(180,80,80,0.4)',color:'rgba(200,100,100,0.8)',cursor:'pointer',fontSize:'9px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 10px',fontFamily:"'DM Sans',sans-serif",lineHeight:1.4,transition:'border-color 0.2s,color 0.2s'}}
                              onMouseEnter={e=>{e.target.style.borderColor='rgba(200,80,80,0.8)';e.target.style.color='#e07070';}}
                              onMouseLeave={e=>{e.target.style.borderColor='rgba(180,80,80,0.4)';e.target.style.color='rgba(200,100,100,0.8)';}}>
                              {tr(T.contact.remove, lang)}
                            </button>
                          )}
                          <button type="button" onClick={() => setActiveService(null)}
                            style={{background:'none',border:'none',color:'#444',cursor:'pointer',fontSize:'15px',lineHeight:1,padding:'0 2px',transition:'color 0.2s'}}
                            onMouseEnter={e=>e.target.style.color='#888'}
                            onMouseLeave={e=>e.target.style.color='#444'}>✕</button>
                        </div>
                      </div>
                      <div className="svc-dropdown-row">
                        <div className="chip-grid">
                          {MATERIALS.map(m => (
                            <button key={m.key} type="button"
                              className={`chip${activeMat === m.key ? ' active' : ''}`}
                              onClick={() => selectMaterial(activeService, m.key)}>
                              {lang === 'ar' ? m.labelAr : m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {activeMat && (
                        <div className="svc-dropdown-row size-sub-label">
                          <div className="svc-dropdown-title" style={{marginBottom:'10px'}}>{tr(T.contact.sizeLabel, lang)}</div>
                          <div className="chip-grid">
                            {SIZES.map(sz => (
                              <button key={sz.key} type="button"
                                className={`chip size-chip${activeSize === sz.key ? ' active' : ''}`}
                                onClick={() => selectSize(activeService, sz.key)}>
                                <span className="size-chip-main">{sz.label}</span>
                                <span className="size-chip-sub">{sz.sub}</span>
                              </button>
                            ))}
                          </div>

                          {/* Custom size input — shown only when Custom is selected */}
                          {activeSize === 'custom' && (
                            <div className="custom-size-wrap">
                              <label>{tr(T.contact.customSize, lang)}</label>
                              <input
                                type="number"
                                min="1"
                                className="custom-size-input"
                                placeholder="e.g. 35"
                                value={serviceConfigs[activeService]?.customSize || ''}
                                onChange={e => setCustomSize(activeService, e.target.value)}
                                onClick={e => e.stopPropagation()}
                              />
                              <span className="custom-size-unit">cm</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Delivery + Quantity */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="field-label">{tr(T.contact.labelDelivery, lang)}</label>
                    <div className="date-selects">

                      {/* Day */}
                      <div className="date-sel-wrap">
                        <select name="dd" className="date-sel" value={form.dd} onChange={handleChange}>
                          <option value="">{tr(T.contact.labelDay, lang)}</option>
                          {Array.from({ length: daysIn(+form.mm || 1, +form.yyyy || CY) }, (_, i) => i + 1)
                            .filter(d => {
                              if (!form.mm || !form.yyyy) return true;
                              const y = +form.yyyy, m = +form.mm;
                              if (y > CY) return true;
                              if (y === CY && m > CM) return true;
                              if (y === CY && m === CM) return d >= CD;
                              return false;
                            })
                            .map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <span className="date-sel-label">{tr(T.contact.labelDay, lang)}</span>
                      </div>

                      {/* Month */}
                      <div className="date-sel-wrap">
                        <select name="mm" className="date-sel" value={form.mm}
                          onChange={e => { handleChange(e); setForm(p => ({ ...p, dd: '' })); }}>
                          <option value="">{tr(T.contact.labelMonth, lang)}</option>
                          {MONTHS.map((m, i) => {
                            const mNum = i + 1;
                            const yr = +form.yyyy || CY;
                            if (yr === CY && mNum < CM) return null;
                            return <option key={mNum} value={mNum}>{m}</option>;
                          })}
                        </select>
                        <span className="date-sel-label">{tr(T.contact.labelMonth, lang)}</span>
                      </div>

                      {/* Year */}
                      <div className="date-sel-wrap">
                        <select name="yyyy" className="date-sel" value={form.yyyy}
                          onChange={e => { handleChange(e); setForm(p => ({ ...p, dd: '', mm: '' })); }}>
                          <option value="">{tr(T.contact.labelYear, lang)}</option>
                          {[0,1,2,3,4].map(n => <option key={n} value={CY + n}>{CY + n}</option>)}
                        </select>
                        <span className="date-sel-label">{tr(T.contact.labelYear, lang)}</span>
                      </div>

                    </div>
                  </div>
                  <div className="form-group">
                    <label className="field-label" htmlFor="quantity">{tr(T.contact.labelQuantity, lang)}</label>
                    <div className="field-wrap"><input id="quantity" name="quantity" type="number" min="1" className="field-input" placeholder={tr(T.contact.phQuantity, lang)} value={form.quantity} onChange={handleChange}/><span className="field-line"/></div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="field-label" htmlFor="message">{tr(T.contact.labelMessage, lang)}</label>
                  <div className="field-wrap"><textarea id="message" name="message" className="field-input" rows="4" placeholder={tr(T.contact.phMessage, lang)} value={form.message} onChange={handleChange}/><span className="field-line"/></div>
                </div>

                {error && <p className="form-error">{error}</p>}
                <div className="form-submit">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading && <span className="btn-spinner"/>}
                    {loading ? tr(T.contact.sending, lang) : tr(T.contact.submit, lang)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        </SectionFrame>
      </section>
    </>
  );
}
