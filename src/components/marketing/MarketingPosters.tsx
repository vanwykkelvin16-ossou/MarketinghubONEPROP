import { ExternalLink, FileImage } from 'lucide-react';
import { POSTERS } from '../../data/marketing';
import type { MarketingPoster } from '../../data/marketing';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const TYPE_LABELS: Record<MarketingPoster['type'], string> = {
  campaign:  'Campaign',
  brochure:  'Brochure',
  social:    'Social',
  billboard: 'Billboard',
  digital:   'Digital Ad',
};

// Subtle background accents per type (no images)
const TYPE_BG: Record<MarketingPoster['type'], string> = {
  social:    '#FFF7ED',
  campaign:  '#F0FDF4',
  brochure:  '#EFF6FF',
  billboard: '#FDF4FF',
  digital:   '#FFF1F2',
};

export default function MarketingPosters() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Marketing Hub
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            Property Posters
          </h1>
          <p className="text-gray-400 mt-1.5 text-sm">
            {POSTERS.length} design assets — open each in Canva to view or edit.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {POSTERS.map((poster, i) => (
            <PosterCard key={poster.id} poster={poster} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PosterCard({ poster, index }: { poster: MarketingPoster; index: number }) {
  const bg = TYPE_BG[poster.type] ?? '#F9FAFB';

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Coloured accent bar + icon area */}
      <div
        className="flex items-center justify-center py-10"
        style={{ background: bg }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: '#fff' }}
        >
          <FileImage size={28} style={{ color: ORANGE }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Type badge */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
          style={{ background: bg, color: DARK }}
        >
          {TYPE_LABELS[poster.type]}
        </span>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: DARK }}>
          {poster.title}
        </h3>
        <p className="text-xs text-gray-400 mb-5">{poster.propertyName} · {poster.area}</p>

        {/* Canva CTA */}
        <a
          href={poster.canvaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: ORANGE, color: '#fff' }}
        >
          <ExternalLink size={14} />
          Open in Canva
        </a>
      </div>
    </div>
  );
}
