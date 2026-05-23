/*
  SectionFrame — decorative bordered frame used inside every section.
  Wrap the section's content (NOT the section element itself) with this.
  The section keeps its full-width background; the frame creates the "panel" look.

  Usage:
    <SectionFrame>
      <YourSectionContent />
    </SectionFrame>

  Props:
    maxWidth  — default 1280. Use "narrow" (860) or "wide" (1440) presets, or a number.
    pad       — vertical padding inside frame, default "60px 5%"
    className — extra classes on the wrapper
*/
export default function SectionFrame({
  children,
  maxWidth = 1280,
  pad = '60px 5%',
  className = '',
}) {
  const mw = maxWidth === 'narrow' ? 860 : maxWidth === 'wide' ? 1440 : maxWidth;
  return (
    <div
      className={`sframe ${className}`}
      style={{ maxWidth: mw, padding: pad }}
    >
      {/* 4 corner brackets */}
      <span className="sframe-c sframe-tl" aria-hidden="true" />
      <span className="sframe-c sframe-tr" aria-hidden="true" />
      <span className="sframe-c sframe-bl" aria-hidden="true" />
      <span className="sframe-c sframe-br" aria-hidden="true" />
      {children}
    </div>
  );
}
