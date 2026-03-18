import { useNavigate } from 'react-router-dom';
import { Video, Image, Palette, ExternalLink, ArrowRight, Link2 } from 'lucide-react';
import { VIDEOS, POSTERS, CANVA_LINKS } from '../../data/marketing';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const QUICK_CARDS = [
  {
    icon: Video,
    label: 'Property Videos',
    description: 'Walkthroughs, campaigns & aerial footage',
    path: '/marketing/videos',
    count: 'Coming soon',
    gradient: 'from-orange-500 to-amber-500',
    bg: '#FFF7ED',
    iconColor: ORANGE,
  },
  {
    icon: Image,
    label: 'Property Posters',
    description: 'Campaign visuals, brochures & billboards',
    path: '/marketing/posters',
    count: `${POSTERS.length} posters`,
    gradient: 'from-stone-700 to-stone-900',
    bg: '#F5F4F4',
    iconColor: DARK,
  },
  {
    icon: Palette,
    label: 'Brand Identity',
    description: 'Colours, typography & usage guidelines',
    path: '/marketing/brand',
    count: '4 brand colours',
    gradient: 'from-violet-500 to-purple-700',
    bg: '#F5F3FF',
    iconColor: '#7C3AED',
  },
  {
    icon: ExternalLink,
    label: 'Canva Links Hub',
    description: 'All design files, templates & assets',
    path: '/marketing/canva',
    count: '1 link — more coming soon',
    gradient: 'from-sky-500 to-blue-600',
    bg: '#EFF6FF',
    iconColor: '#2563EB',
  },
];

const STAT_PILLS = [
  { label: 'Videos Coming Soon', value: '—' },
  { label: 'Posters',            value: POSTERS.length },
  { label: 'Canva Link',         value: 1 },
  { label: 'Properties',         value: 2 },
];


export default function MarketingHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Hero header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-6 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Marketing System
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-3" style={{ color: DARK }}>
            One Property Holdings
          </h1>
          <p className="text-xl font-semibold" style={{ color: DARK }}>
            Marketing Hub
          </p>
          <p className="text-gray-500 mt-2 text-sm max-w-xl">
            Your central command for all property marketing — videos, visuals, brand assets, and Canva links. Zero friction. Instant access.
          </p>
        </div>

        {/* ── Stats pill row ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {STAT_PILLS.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
              <span className="text-base font-black" style={{ color: ORANGE }}>{value}</span>
              <span className="text-xs font-medium text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Quick Access Cards ── */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-5" style={{ color: DARK }}>Quick Access</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {QUICK_CARDS.map(({ icon: Icon, label, description, path, count, bg, iconColor }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="group text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color: iconColor }} />
              </div>

              {/* Text */}
              <p className="text-base font-bold mb-1 leading-tight" style={{ color: DARK }}>{label}</p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500">{count}</span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: bg }}
                >
                  <ArrowRight size={13} style={{ color: iconColor }} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── CTA Panels ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Primary CTA */}
          <div
            className="rounded-2xl p-6"
            style={{ background: DARK }}
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(242,142,46,0.15)' }}>
              <Video size={20} style={{ color: ORANGE }} />
            </div>
            <p className="text-white font-bold text-base mb-1">Latest Videos</p>
            <p className="text-gray-400 text-xs mb-5 leading-relaxed">
              Property videos coming soon. Graphic assets will be ready in Canva.
            </p>
            <button
              onClick={() => navigate('/marketing/videos')}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
            >
              Browse Videos
            </button>
          </div>

          {/* Secondary CTA */}
          <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#FFF7ED' }}>
              <Link2 size={20} style={{ color: ORANGE }} />
            </div>
            <p className="font-bold text-sm mb-1" style={{ color: DARK }}>Canva Hub</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              1 design link available now. More links coming soon.
            </p>
            <button
              onClick={() => navigate('/marketing/canva')}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:opacity-80"
              style={{ borderColor: DARK, color: DARK }}
            >
              Open Canva Hub
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
