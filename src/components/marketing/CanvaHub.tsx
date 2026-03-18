import { ExternalLink, Share2 } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const CANVA_URL = 'https://www.canva.com/design/DAHBLY8qYKQ/oXEuqyhFXctcB4YpsLx8Zw/edit?utm_content=DAHBLY8qYKQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';

export default function CanvaHub() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Marketing Hub
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            Canva Links Hub
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Social media marketing poster assets — open directly in Canva to edit.
          </p>
        </div>

        {/* ── Single link block ── */}
        <div>
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#FDF4FF' }}>
              <Share2 size={17} style={{ color: '#9333EA' }} />
            </div>
            <div>
              <h2 className="text-base font-bold leading-none" style={{ color: DARK }}>Social Media</h2>
              <p className="text-xs text-gray-400 mt-0.5">Instagram, Facebook &amp; LinkedIn assets</p>
            </div>
            <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#FDF4FF', color: '#9333EA' }}>
              1
            </span>
          </div>

          {/* Link card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5">
              {/* Icon + title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#FDF4FF' }}>
                  <Share2 size={18} style={{ color: '#9333EA' }} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-bold leading-snug" style={{ color: DARK }}>
                    Social Media Marketing Posters — Instagram, Facebook &amp; LinkedIn
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: '#FDF4FF', color: '#9333EA' }}>
                      Social
                    </span>
                    <span className="text-xs text-gray-400">All Properties</span>
                  </div>
                </div>
              </div>

              {/* CTA — full width below content */}
              <a
                href={CANVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE }}
              >
                <ExternalLink size={14} />
                Open in Canva
              </a>
            </div>
          </div>

          {/* Notice */}
          <p className="mt-4 text-sm text-gray-400 text-center">
            Link will be added and shared as work continues.
          </p>
        </div>

      </div>
    </div>
  );
}
