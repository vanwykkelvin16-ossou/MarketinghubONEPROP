import { useNavigate } from 'react-router-dom';
import { ExternalLink, Monitor, AlertCircle, User, ChevronLeft, Globe, CheckCircle2 } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';
const DNA_URL = 'https://dnasupersystems.com';

const STEPS = [
  {
    num: '01',
    title: 'Open DNA Supersystems',
    body: 'Click the button below to open the platform in a new tab.',
    icon: Globe,
    highlight: false,
  },
  {
    num: '02',
    title: 'Always Choose DNA 2.0',
    body: 'When the login modal appears, always select "Login to DNA 2.0 — New Version Software". Never use the 1.0 option.',
    icon: AlertCircle,
    highlight: true,
  },
  {
    num: '03',
    title: 'Login with Your Credentials',
    body: 'Use the login credentials provided by Kelvin van Wyk to access the platform.',
    icon: User,
    highlight: false,
  },
  {
    num: '04',
    title: 'Go to the Zonika Butler Page',
    body: 'Once logged in, go directly to the Zonika Butler page. Work exclusively on this page at all times.',
    icon: CheckCircle2,
    highlight: false,
  },
];

export default function MarketingSystem() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        {/* Mobile back */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{ borderColor: DARK, color: DARK }}
          >
            <ChevronLeft size={15} />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Dashboard
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            SA Broking Marketing
          </h1>
          <p className="text-gray-400 mt-1.5 text-sm">
            Follow the steps below to access and use the DNA Supersystems platform.
          </p>
        </div>

        {/* DNA Platform card */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: DARK }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(242,142,46,0.15)' }}>
              <Monitor size={22} style={{ color: ORANGE }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-base leading-tight">DNA Supersystems</p>
              <p className="text-gray-400 text-xs mt-0.5">dnasupersystems.com · Marketing Platform</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-400 font-semibold">Live</span>
            </div>
          </div>
          <a
            href={DNA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: ORANGE }}
          >
            <ExternalLink size={15} />
            Open DNA Supersystems
          </a>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: DARK }}>
            Step-by-Step
          </h2>
          <div className="space-y-3">
            {STEPS.map(({ num, title, body, highlight, icon: Icon }) => (
              <div
                key={num}
                className="flex items-start gap-4 p-5 rounded-2xl border"
                style={highlight
                  ? { background: '#FFF7ED', borderColor: 'rgba(242,142,46,0.25)' }
                  : { background: '#fff', borderColor: '#F3F4F6' }
                }
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={highlight
                    ? { background: ORANGE, color: '#fff' }
                    : { background: '#F5F4F4', color: DARK }
                  }
                >
                  {num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Icon size={13} style={{ color: highlight ? ORANGE : '#9CA3AF' }} />
                    <p className="text-sm font-bold" style={{ color: DARK }}>{title}</p>
                    {highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: ORANGE, color: '#fff' }}>
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zonika Butler workspace */}
        <div className="rounded-2xl p-6" style={{ background: DARK }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(242,142,46,0.15)' }}>
              <User size={18} style={{ color: ORANGE }} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Your Workspace</p>
              <p className="text-gray-400 text-xs">Zonika Butler Page</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-5">
            Once logged into DNA Supersystems, navigate directly to the{' '}
            <strong className="text-white">Zonika Butler</strong> page.
            Work exclusively on this page — do not modify any other accounts or pages.
          </p>
          <a
            href={DNA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: ORANGE }}
          >
            <ExternalLink size={14} />
            Open Platform
          </a>
        </div>

      </div>
    </div>
  );
}
