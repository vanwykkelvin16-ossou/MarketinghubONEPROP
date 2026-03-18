import { useState } from 'react';
import { ExternalLink, Monitor, CheckCircle2, AlertCircle, User, ChevronRight, Globe } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';
const DNA_URL = 'https://dnasupersystems.com';

const STEPS = [
  {
    num: '01',
    title: 'Open DNA Supersystems',
    body: 'Click the button below to open the DNA Supersystems platform in a new tab.',
    highlight: false,
    icon: Globe,
  },
  {
    num: '02',
    title: 'Click LOGIN — Always Choose DNA 2.0',
    body: 'When the login modal appears, you will see two options. ALWAYS select "Login to DNA 2.0 — New Version Software". Never use the 1st generation option.',
    highlight: true,
    icon: AlertCircle,
  },
  {
    num: '03',
    title: 'Login with Your Credentials',
    body: 'Use the login credentials provided by Kelvin van Wyk to access the platform securely.',
    highlight: false,
    icon: User,
  },
  {
    num: '04',
    title: 'Navigate to Zonika Butler Page',
    body: 'Once logged in, go directly to the Zonika Butler page. This is your dedicated workspace — work ONLY on this page at all times.',
    highlight: false,
    icon: CheckCircle2,
  },
];

export default function MarketingSystem() {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Dashboard
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            Marketing System
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm max-w-xl">
            Access the DNA Supersystems platform to manage all marketing activities. Follow the steps below carefully.
          </p>
        </div>

        {/* ── DNA Platform Card ── */}
        <div
          className="rounded-2xl overflow-hidden mb-8 border"
          style={{ borderColor: 'rgba(242,142,46,0.2)', background: DARK }}
        >
          {/* Top bar */}
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(242,142,46,0.15)' }}
              >
                <Monitor size={22} style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-tight">DNA Supersystems</p>
                <p className="text-gray-400 text-xs mt-0.5">dnasupersystems.com · Marketing Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-400 font-semibold">Live</span>
            </div>
          </div>

          {/* Website preview / screenshot area */}
          <div className="mx-6 mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/20">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-3 bg-white/10 rounded-md px-3 py-1">
                <span className="text-white/50 text-xs font-mono">dnasupersystems.com</span>
              </div>
              <ExternalLink size={12} className="text-white/40" />
            </div>

            {/* Preview toggle */}
            {!previewVisible ? (
              <div
                className="relative h-52 flex flex-col items-center justify-center gap-3 cursor-pointer group"
                onClick={() => setPreviewVisible(true)}
              >
                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #F28E2E 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(242,142,46,0.2)' }}
                >
                  <Globe size={24} style={{ color: ORANGE }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Click to load live preview</p>
                  <p className="text-gray-400 text-xs mt-0.5">Opens dnasupersystems.com inline</p>
                </div>
              </div>
            ) : (
              <div className="relative" style={{ height: '480px' }}>
                <iframe
                  src={DNA_URL}
                  className="w-full h-full border-0"
                  title="DNA Supersystems"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                <button
                  onClick={() => setPreviewVisible(false)}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg hover:bg-black/80 transition-colors"
                >
                  Close preview
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <a
              href={DNA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
            >
              <ExternalLink size={16} />
              Open DNA Supersystems Platform
              <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* ── DNA 2.0 Callout ── */}
        <div
          className="rounded-2xl p-5 mb-8 flex items-start gap-4"
          style={{ background: '#FFF7ED', border: '2px solid rgba(242,142,46,0.3)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: ORANGE }}
          >
            <AlertCircle size={20} className="text-white" />
          </div>
          <div>
            <p className="font-black text-sm mb-1" style={{ color: DARK }}>
              Always Select "Login to DNA 2.0 — New Version Software"
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              When the login modal appears on the DNA Supersystems site, you will see two options.
              <strong className="font-bold" style={{ color: DARK }}> Always choose the dark button — "Login to DNA 2.0 — New Version Software".</strong>
              {' '}Never use the blue "Login to DNA 1.0" (1st generation) option.
            </p>
          </div>
        </div>

        {/* ── Step by step instructions ── */}
        <div className="mb-8">
          <h2 className="text-base font-bold mb-5" style={{ color: DARK }}>Step-by-Step Instructions</h2>
          <div className="space-y-3">
            {STEPS.map(({ num, title, body, highlight, icon: Icon }) => (
              <div
                key={num}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all"
                style={highlight
                  ? { background: '#FFF7ED', borderColor: 'rgba(242,142,46,0.3)' }
                  : { background: '#fff', borderColor: '#F3F4F6' }
                }
              >
                {/* Step number */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={highlight
                    ? { background: ORANGE, color: '#fff' }
                    : { background: '#F5F4F4', color: DARK }
                  }
                >
                  {num}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} style={{ color: highlight ? ORANGE : '#9CA3AF' }} />
                    <p className="text-sm font-bold" style={{ color: DARK }}>{title}</p>
                    {highlight && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: ORANGE, color: '#fff' }}
                      >
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Zonika Butler reminder ── */}
        <div
          className="rounded-2xl p-5 flex items-start gap-4"
          style={{ background: DARK }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(242,142,46,0.15)' }}
          >
            <User size={20} style={{ color: ORANGE }} />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm mb-1">Your Workspace: Zonika Butler Page</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Once logged into DNA Supersystems, navigate directly to the <strong className="text-white">Zonika Butler</strong> page.
              This is your dedicated marketing workspace. Work exclusively on this page at all times — do not modify any other accounts or pages.
            </p>
          </div>
          <a
            href={DNA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90 self-center"
            style={{ background: ORANGE }}
          >
            Open Platform
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </div>
  );
}
