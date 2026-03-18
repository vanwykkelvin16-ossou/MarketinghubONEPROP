import { useState } from 'react';
import { Check, Copy, Type, Palette, BookOpen } from 'lucide-react';
import { BRAND } from '../../data/marketing';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

export default function BrandIdentity() {
  const [activeTab, setActiveTab] = useState<'colours' | 'typography' | 'guidelines'>('colours');

  const TABS = [
    { key: 'colours',     label: 'Colours',     icon: Palette  },
    { key: 'typography',  label: 'Typography',  icon: Type     },
    { key: 'guidelines',  label: 'Guidelines',  icon: BookOpen },
  ] as const;

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
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            Brand Identity
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Design control centre — colours, typography, and usage guidelines.
          </p>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 mb-8 sm:bg-white sm:border sm:border-gray-100 sm:rounded-2xl sm:p-1.5 sm:shadow-sm sm:w-fit">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-2.5 px-5 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto"
              style={
                activeTab === key
                  ? { background: DARK, color: '#fff' }
                  : { background: '#fff', color: '#9CA3AF', border: '1px solid #F3F4F6' }
              }
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {activeTab === 'colours'    && <ColoursTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'guidelines' && <GuidelinesTab />}
      </div>
    </div>
  );
}

// ─── Colours Tab ──────────────────────────────────────────────────────────────
function ColoursTab() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {BRAND.colors.map(({ name, hex, role, textColor }) => (
          <div
            key={hex}
            className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={() => copy(hex)}
          >
            {/* Large colour block */}
            <div
              className="h-44 flex flex-col items-center justify-center gap-3 relative"
              style={{ background: hex }}
            >
              {copied === hex ? (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${textColor}20` }}
                  >
                    <Check size={20} style={{ color: textColor }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: textColor }}>Copied!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${textColor}15` }}
                  >
                    <Copy size={16} style={{ color: textColor }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: textColor }}>Copy HEX</span>
                </div>
              )}

              {/* HEX code always visible */}
              <div
                className="absolute bottom-4 left-0 right-0 flex justify-center"
              >
                <span
                  className="font-mono text-sm font-bold tracking-widest px-3 py-1 rounded-lg"
                  style={{ background: `${textColor}12`, color: textColor }}
                >
                  {hex}
                </span>
              </div>
            </div>

            {/* Label */}
            <div className="bg-white px-4 py-3.5">
              <p className="text-sm font-bold" style={{ color: DARK }}>{name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Palette preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold mb-4" style={{ color: DARK }}>Palette Preview</h3>
        <div className="flex rounded-2xl overflow-hidden h-16">
          {BRAND.colors.map(({ hex, name }) => (
            <div
              key={hex}
              className="flex-1 flex items-center justify-center"
              style={{ background: hex }}
              title={name}
            />
          ))}
        </div>
        <div className="flex mt-2">
          {BRAND.colors.map(({ name, hex }) => (
            <div key={hex} className="flex-1 text-center">
              <p className="text-xs text-gray-400">{name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Typography Tab ───────────────────────────────────────────────────────────
function TypographyTab() {
  return (
    <div className="space-y-5">
      {BRAND.typography.map(({ family, role, sample, size, weight }) => (
        <div
          key={family}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: '#FFF7ED', color: ORANGE }}
                >
                  {role}
                </span>
                <span className="text-xs text-gray-400 font-mono">{size} / {weight}w</span>
              </div>
              <p className="text-xs font-semibold text-gray-500">{family}</p>
            </div>
          </div>

          {/* Type sample */}
          <div className="py-4 border-t border-gray-50">
            <p
              style={{
                fontFamily: family.startsWith('Gotham') ? `'Gotham', 'Futura', 'Century Gothic', sans-serif` : `'Arial', sans-serif`,
                fontSize: size,
                fontWeight: weight,
                color: DARK,
                lineHeight: 1.15,
              }}
            >
              {sample}
            </p>
          </div>

          {/* Characters preview */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p
              className="text-sm text-gray-400 tracking-wide"
              style={{
                fontFamily: family.startsWith('Gotham') ? `'Gotham', 'Futura', 'Century Gothic', sans-serif` : `'Arial', sans-serif`,
                fontWeight: weight,
              }}
            >
              Aa Bb Cc Dd Ee Ff Gg — 0 1 2 3 4 5 6 7 8 9
            </p>
          </div>
        </div>
      ))}

      {/* Type hierarchy demo */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Type Hierarchy Demo</p>
        <div
          className="space-y-3"
          style={{ fontFamily: `'Gotham', 'Futura', 'Century Gothic', sans-serif` }}
        >
          <p style={{ fontSize: '2.5rem', fontWeight: 900, color: DARK, lineHeight: 1 }}>
            Luxury Living Starts Here
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: DARK }}>
            ONE Property Holdings
          </p>
        </div>
        <div className="mt-4" style={{ fontFamily: `'Arial', sans-serif` }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: DARK }}>
            Premium Commercial Real Estate
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 400, color: '#6B7280', marginTop: '0.5rem', lineHeight: 1.6 }}>
            Discover premium properties designed for modern lifestyles. <br />
            We build spaces that inspire, connect, and endure.
          </p>
        </div>
        <div className="mt-5">
          <button
            className="px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: ORANGE, fontFamily: `'Arial', sans-serif` }}
          >
            Explore Portfolio →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Guidelines Tab ───────────────────────────────────────────────────────────
function GuidelinesTab() {
  const DOS = [
    { title: 'No gradients', body: 'Gradients are strictly prohibited across all designs — backgrounds, buttons, text, and overlays must use solid brand colours only.' },
    { title: 'No opacity on text, buttons or logo', body: 'Never reduce the opacity of text, buttons, or the ONE Property logo. All elements must appear at full, solid colour at all times.' },
    { title: 'All text must be visible and perfectly aligned', body: 'Every text element must be fully legible, properly aligned, and never obscured by overlapping elements, backgrounds, or images.' },
    { title: 'Use correct fonts and colours at all times', body: 'Only Gotham Bold/Black for headings and Arial for body text. Only approved brand colours (#F28E2E, #373435, #E6E7E8, #FFFFFF) may be used.' },
  ];

  const POSTERS = [
    { src: '/posters/poster-1.png', label: 'Fairland Walk — Property Reveal' },
    { src: '/posters/poster-2.png', label: 'Southdale — Interior Showcase' },
    { src: '/posters/poster-3.png', label: 'Blog Post — Strategic Transfer' },
    { src: '/posters/poster-4.png', label: 'Breaking News — ATM Alert' },
    { src: '/posters/poster-5.png', label: 'Did You Know? — Southdale' },
  ];

  return (
    <div className="space-y-6">

      {/* Colour usage */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold mb-5" style={{ color: DARK }}>Colour Usage Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {BRAND.guidelines.map(({ color, label, rule }) => (
            <div key={color} className="rounded-xl border border-gray-100 overflow-hidden">
              <div className="h-12" style={{ background: color }} />
              <div className="p-4">
                <p className="text-sm font-bold mb-1" style={{ color: DARK }}>{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{rule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do rules */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={14} className="text-green-600" />
          </div>
          <h3 className="text-base font-bold" style={{ color: DARK }}>Design Rules — Always Apply</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOS.map(({ title, body }) => (
            <div key={title} className="rounded-xl p-4 border border-gray-100" style={{ background: '#F9FAFB' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#16A34A' }} />
                <p className="text-sm font-bold" style={{ color: DARK }}>{title}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-4">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Poster references */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="mb-5">
          <h2 className="text-base font-bold" style={{ color: DARK }}>Approved Poster References</h2>
          <p className="text-xs text-gray-400 mt-1">Use these existing posters as the visual benchmark for all future designs.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {POSTERS.map(({ src, label }) => (
            <div key={src} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={src}
                alt={label}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
