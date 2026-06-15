import { Component, useState } from 'react';
import './globals.css';
import { LangProvider } from './context/LangContext';
import CareersPage from './components/CareersPage';

import Header            from './components/Header';
import HeroSection       from './components/HeroSection';
import AboutSection      from './components/AboutSection';
import ClientsSection    from './components/ClientsSection';
import ServicesSection   from './components/ServicesSection';
import PortfolioSection  from './components/PortfolioSection';
import WhyChooseUsSection   from './components/WhyChooseUsSection';
import TestimonialsSection  from './components/TestimonialsSection';
import CTASection           from './components/CTASection';
import FAQSection           from './components/FAQSection';
import ContactSection    from './components/ContactSection';
import Footer            from './components/Footer';
import WhatsAppButton    from './components/WhatsAppButton';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}

export default function App() {
  const [page, setPage] = useState('home');

  const goToCareers = () => { setPage('careers'); window.scrollTo(0,0); };
  const goHome      = () => { setPage('home');    window.scrollTo(0,0); };

  if (page === 'careers') {
    return (
      <LangProvider>
        <CareersPage onBack={goHome} />
      </LangProvider>
    );
  }

  return (
    <LangProvider>
    <div>

      {/* ── Fixed nav ── */}
      <Header onJoin={goToCareers} />

      {/* ── Page sections ── */}
      <main>
        {/* 1 ── الانطباع الأول */}
        <HeroSection />

        {/* 2 ── ثقة فورية: من يثق بنا؟ */}
        <ClientsSection />

        {/* 3 ── ماذا نصنع؟ وضوح المنتج */}
        <ServicesSection />

        {/* 4 ── الإثبات البصري: جودة أعمالنا */}
        <PortfolioSection />

        {/* 5 ── من نحن؟ القصة + الأرقام */}
        <AboutSection />

        {/* 6 ── لماذا نحن؟ المميزات */}
        <WhyChooseUsSection />

        {/* 7 ── صوت العميل */}
        <TestimonialsSection />

        {/* 8 ── إزالة الاعتراضات */}
        <FAQSection />

        {/* 9 ── الدعوة الأخيرة */}
        <CTASection />

        {/* 10 ── تواصل */}
        <ErrorBoundary>
          <ContactSection />
        </ErrorBoundary>
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Floating WhatsApp — visible on all pages ── */}
      <WhatsAppButton phone="966123456789" />

    </div>
    </LangProvider>
  );
}
