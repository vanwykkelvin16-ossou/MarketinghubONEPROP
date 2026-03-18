import { useNavigate } from 'react-router-dom';
import { POSTERS } from '../data/marketing';
import {
  Video, Image, ExternalLink, Megaphone,
  ArrowRight, FileText, Palette,
} from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const STATS = [
  { icon: Video,        label: 'Videos',       value: 'Soon',  sub: 'Coming soon',            color: ORANGE,    bg: '#FFF7ED' },
  { icon: Image,        label: 'Posters',       value: POSTERS.length.toString(),      sub: 'Active assets',          color: '#7C3AED', bg: '#F5F3FF' },
  { icon: ExternalLink, label: 'Canva Links',   value: '1',                            sub: 'More coming soon',       color: '#2563EB', bg: '#EFF6FF' },
  { icon: FileText,     label: 'Documents',     value: '1',                            sub: 'Agreement on file',      color: '#16A34A', bg: '#F0FDF4' },
];

const QUICK_LINKS = [
  { icon: Video,        label: 'Property Videos',   sub: 'Coming soon',                          path: '/marketing/videos',  color: ORANGE,    bg: '#FFF7ED' },
  { icon: Image,        label: 'Property Posters',  sub: `${POSTERS.length} assets ready`,        path: '/marketing/posters', color: '#7C3AED', bg: '#F5F3FF' },
  { icon: ExternalLink, label: 'Canva Hub',          sub: '1 link — more coming soon',            path: '/marketing/canva',   color: '#2563EB', bg: '#EFF6FF' },
  { icon: Palette,      label: 'Brand Identity',    sub: '4 brand colours + typography',          path: '/marketing/brand',   color: '#16A34A', bg: '#F0FDF4' },
  { icon: FileText,     label: 'Documents',         sub: 'Marketing Services Agreement',          path: '/documents',         color: DARK,      bg: '#F5F4F4' },
];


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Welcome header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-6 rounded-full" style={{ background: ORANGE }} />
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Internal Hub
            </p>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-2" style={{ color: DARK }}>
            One Property Holdings
          </h1>
          <p className="text-xl font-semibold mb-2" style={{ color: DARK }}>Marketing Hub</p>
          <p className="text-gray-500 text-sm max-w-xl">
            Your central command for all marketing assets, brand materials, and company documents.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <p className="text-3xl font-black" style={{ color }}>{value}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: DARK }}>{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Quick Links ── */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-5" style={{ color: DARK }}>Quick Access</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
          {QUICK_LINKS.map(({ icon: Icon, label, sub, path, color, bg }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="group text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight" style={{ color: DARK }}>{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: bg }}
                >
                  <ArrowRight size={14} style={{ color }} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── CTA Panels ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Dark panel */}
          <div className="rounded-2xl p-6" style={{ background: DARK }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(242,142,46,0.15)' }}>
              <Megaphone size={20} style={{ color: ORANGE }} />
            </div>
            <p className="text-white font-bold text-base mb-1">Marketing Hub</p>
            <p className="text-gray-400 text-xs mb-5 leading-relaxed">
              {POSTERS.length} posters, videos coming soon, and 1 Canva link — more coming soon.
            </p>
            <button
              onClick={() => navigate('/marketing')}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
            >
              Open Marketing Hub
            </button>
          </div>

          {/* Document panel */}
          <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F0FDF4' }}>
              <FileText size={20} className="text-green-600" />
            </div>
            <p className="font-bold text-sm mb-1" style={{ color: DARK }}>Agreement Document</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Marketing Services Agreement — available to download or preview.
            </p>
            <button
              onClick={() => navigate('/documents')}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:opacity-80"
              style={{ borderColor: DARK, color: DARK }}
            >
              View Document
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
