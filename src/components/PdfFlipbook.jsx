import { useState, useRef, forwardRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

/* ── forwardRef wrapper required by react-pageflip ── */
const PdfPageSlot = forwardRef(({ pageNumber, pageWidth, pageHeight }, ref) => (
  <div
    ref={ref}
    style={{
      width: pageWidth,
      height: pageHeight,
      overflow: 'hidden',
      background: '#fff',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }}
  >
    <Page
      pageNumber={pageNumber}
      width={pageWidth}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      loading={<div style={{ width: pageWidth, height: pageHeight, background: '#F0EDE6' }} />}
    />
  </div>
));
PdfPageSlot.displayName = 'PdfPageSlot';

/* ── Responsive page sizing (desktop only — mobile uses iframe) ── */
function calcPageSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const modalW  = Math.min(vw * 0.90, 1400);
  const usableH = vh * 0.82 - 65 - 72 - 44;
  const usableW = modalW - 48;
  let pageH = Math.min(Math.round(usableH * 0.94), 700);
  let pageW = Math.round(pageH / 1.414);
  if (pageW * 2 > usableW) {
    pageW = Math.floor(usableW / 2) - 4;
    pageH = Math.round(pageW * 1.414);
  }
  return { pageW: Math.max(pageW, 200), pageH: Math.max(pageH, 280) };
}

/* ══════════════════════════════════════════════════════════════
   PdfFlipbook — manual navigation only, no Auto Play.
   Mobile always uses iframe (stable, no clipping).
   Desktop uses react-pageflip flipbook.
══════════════════════════════════════════════════════════════ */
export default function PdfFlipbook({ pdfUrl, onLoadError }) {
  const isMobile = window.innerWidth <= 768;

  /* Mobile: just show iframe */
  if (isMobile) {
    return (
      <div className="pfb-wrap">
        <style>{`
          .pfb-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #0C0C0C;
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }
          .pfb-iframe-wrap {
            flex: 1;
            width: 95vw;
            max-width: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            padding: 12px 0 6px;
          }
          .pfb-iframe-wrap iframe {
            flex: 1;
            width: 100%;
            border: none;
            border-radius: 2px;
          }
          .pfb-mobile-actions {
            display: flex;
            gap: 8px;
            justify-content: center;
            padding: 10px 10px 14px;
            flex-shrink: 0;
          }
          .pfb-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: transparent;
            border: 1px solid #2A2A2A;
            color: #888070;
            font-family: 'DM Sans', sans-serif;
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            white-space: nowrap;
            text-decoration: none;
            transition: border-color 0.22s ease, color 0.22s ease;
          }
          .pfb-btn:hover {
            border-color: #A89060;
            color: #A89060;
          }
        `}</style>
        <div className="pfb-iframe-wrap">
          <iframe src={pdfUrl} title="Project Profile" />
        </div>
        <div className="pfb-mobile-actions">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pfb-btn">Open PDF</a>
          <a href={pdfUrl} download className="pfb-btn">Download</a>
        </div>
      </div>
    );
  }

  /* Desktop: flipbook */
  return <DesktopFlipbook pdfUrl={pdfUrl} onLoadError={onLoadError} />;
}

function DesktopFlipbook({ pdfUrl, onLoadError }) {
  const { pageW, pageH } = calcPageSize();
  const [numPages,    setNumPages]    = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  const bookRef = useRef(null);

  const handleLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
  }, []);

  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data);
  }, []);

  const handlePrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const handleNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const handleError = useCallback(() => {
    setUseFallback(true);
    onLoadError?.();
  }, [onLoadError]);

  return (
    <div className="pfb-wrap">
      <style>{`
        .pfb-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #0C0C0C;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .pfb-book-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100%;
          padding: 18px 16px 6px;
          min-height: 0;
        }
        .pfb-book {
          box-shadow:
            0 32px 90px rgba(0,0,0,0.88),
            0  8px 28px rgba(0,0,0,0.55);
        }
        .pfb-loading {
          color: #555048;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 80px 40px;
          text-align: center;
        }
        .pfb-iframe {
          flex: 1;
          width: 100%;
          border: none;
          padding: 18px 16px 6px;
        }
        .pfb-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 20px 20px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .pfb-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 18px;
          background: transparent;
          border: 1px solid #2A2A2A;
          color: #888070;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          transition:
            border-color 0.22s ease,
            color        0.22s ease;
        }
        .pfb-btn:hover:not(:disabled) {
          border-color: #A89060;
          color: #A89060;
        }
        .pfb-btn:disabled { opacity: 0.26; cursor: default; }
        .pfb-sep {
          width: 1px; height: 18px;
          background: #202020;
          flex-shrink: 0;
        }
        .pfb-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #444038;
          min-width: 52px;
          text-align: center;
          letter-spacing: 0.08em;
          user-select: none;
        }
        .pfb-count em {
          color: #A89060;
          font-style: normal;
          font-weight: 500;
        }
      `}</style>

      {useFallback ? (
        <>
          <iframe src={pdfUrl} title="Project Profile" className="pfb-iframe" />
          <div className="pfb-nav">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pfb-btn">Open PDF</a>
            <a href={pdfUrl} download className="pfb-btn">Download</a>
          </div>
        </>
      ) : (
        <>
          <Document
            file={pdfUrl}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleError}
            loading={<div className="pfb-loading">Loading catalogue…</div>}
            error={<div className="pfb-loading">Could not load PDF</div>}
          >
            <div className="pfb-book-area">
              {numPages && (
                <HTMLFlipBook
                  ref={bookRef}
                  width={pageW}
                  height={pageH}
                  size="fixed"
                  minWidth={160}
                  maxWidth={620}
                  minHeight={226}
                  maxHeight={880}
                  maxShadowOpacity={0.40}
                  showCover={false}
                  mobileScrollSupport={false}
                  onFlip={handleFlip}
                  flippingTime={700}
                  usePortrait={false}
                  drawShadow={true}
                  startPage={0}
                  className="pfb-book"
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <PdfPageSlot
                      key={i}
                      pageNumber={i + 1}
                      pageWidth={pageW}
                      pageHeight={pageH}
                    />
                  ))}
                </HTMLFlipBook>
              )}
            </div>
          </Document>

          {numPages && (
            <div className="pfb-nav">
              <button
                className="pfb-btn"
                onClick={handlePrev}
                disabled={currentPage === 0}
              >
                ← Prev
              </button>

              <span className="pfb-count">
                <em>{currentPage + 1}</em> / {numPages}
              </span>

              <button
                className="pfb-btn"
                onClick={handleNext}
                disabled={currentPage >= numPages - 1}
              >
                Next →
              </button>

              <div className="pfb-sep" />

              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pfb-btn">
                Open PDF
              </a>
              <a href={pdfUrl} download className="pfb-btn">
                Download
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
