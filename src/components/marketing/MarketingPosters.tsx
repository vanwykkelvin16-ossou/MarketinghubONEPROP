import { useState } from 'react';
import { ExternalLink, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
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


const POSTER_TYPES: Array<MarketingPoster['type'] | 'all'> = ['all', 'campaign', 'brochure', 'social', 'billboard', 'digital'];

export default function MarketingPosters() {
  const [activeType, setActiveType]   = useState<MarketingPoster['type'] | 'all'>('all');
  const [activeArea, setActiveArea]   = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const areas = ['all', ...Array.from(new Set(POSTERS.map(p => p.area)))];

  const filtered = POSTERS.filter(p => {
    const typeOk = activeType === 'all' || p.type === activeType;
    const areaOk = activeArea === 'all' || p.area === activeArea;
    return typeOk && areaOk;
  });

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Marketing Hub
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
                Property Posters
              </h1>
              <p className="text-gray-500 mt-1.5 text-sm">
                {POSTERS.length} assets — campaigns, brochures, social media & billboards.
              </p>
            </div>
            <button
              onClick={() => setShowFilters(f => !f)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:opacity-80"
              style={{ borderColor: DARK, color: DARK }}
            >
              <SlidersHorizontal size={15} />
              Filters {(activeType !== 'all' || activeArea !== 'all') && '•'}
            </button>
          </div>
        </div>

        {/* ── Filter panel ── */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Type */}
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Filter size={13} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Asset Type</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POSTER_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveType(t)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={
                        activeType === t
                          ? { background: ORANGE, color: '#fff' }
                          : { background: '#F3F4F6', color: '#6B7280' }
                      }
                    >
                      {t === 'all' ? 'All Types' : TYPE_LABELS[t as MarketingPoster['type']]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <MapPin size={13} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Province / Area</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {areas.map(a => (
                    <button
                      key={a}
                      onClick={() => setActiveArea(a)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={
                        activeArea === a
                          ? { background: DARK, color: '#fff' }
                          : { background: '#F3F4F6', color: '#6B7280' }
                      }
                    >
                      {a === 'all' ? 'All Areas' : a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">{filtered.length} of {POSTERS.length} assets shown</span>
              {(activeType !== 'all' || activeArea !== 'all') && (
                <button
                  onClick={() => { setActiveType('all'); setActiveArea('all'); }}
                  className="text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: ORANGE }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-sm">No posters match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((poster, i) => (
              <PosterCard key={poster.id} poster={poster} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PosterCard({ poster, index }: { poster: MarketingPoster; index: number }) {
  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={poster.thumbnail}
          alt={poster.title}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Canva link only */}
      <div className="p-4">
        <a
          href={poster.canvaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all hover:opacity-80"
          style={{ borderColor: DARK, color: DARK }}
        >
          <ExternalLink size={12} />
          Open Canva
        </a>
      </div>
    </div>
  );
}
