import { FileText, Download, ExternalLink } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const DOCUMENTS = [
  {
    id: 'agreement',
    name:     'Marketing Services Agreement',
    filename: 'Marketing_Services_Agreement.pdf',
    path:     '/Marketing_Services_Agreement.pdf',
    category: 'Agreement',
    date:     '2025-01-01',
    parties:  ['SA Broking Marketing', 'Zonika Butler'],
    description: 'Official marketing services agreement governing the scope, terms, and conditions of marketing activities for ONE Property Holdings.',
    badge:    'Active',
    badgeBg:  '#FFF7ED',
    badgeColor: ORANGE,
    headerLabel: 'Agreement Document',
  },
  {
    id: 'poster-plan',
    name:     'ONE 20-Week Poster Plan',
    filename: 'ONE_20Week_Poster_Plan.pdf',
    path:     '/ONE_20Week_Poster_Plan.pdf',
    category: 'Marketing Plan',
    date:     '2025-01-01',
    parties:  ['ONE Property Holdings', 'SA Broking Marketing'],
    description: 'A structured 20-week poster and content rollout plan for ONE Property Holdings marketing campaigns.',
    badge:    'Active',
    badgeBg:  '#F0FDF4',
    badgeColor: '#16A34A',
    headerLabel: 'Marketing Document',
  },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Company
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
            Documents
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">Official company agreements and legal documents.</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {[
            { label: 'Documents', value: String(DOCUMENTS.length) },
            { label: 'Category',  value: 'Agreement' },
            { label: 'Status',    value: 'Active' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
              <span className="text-base font-black" style={{ color: ORANGE }}>{value}</span>
              <span className="text-xs font-medium text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Document cards */}
        <div className="flex flex-col gap-8">
          {DOCUMENTS.map(doc => (
            <div key={doc.id}>
              {/* Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{doc.headerLabel}</p>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: doc.badgeBg, color: doc.badgeColor }}
                  >
                    {doc.badge}
                  </span>
                </div>

                <div className="p-6">
                  {/* Icon + title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF7ED' }}>
                      <FileText size={22} style={{ color: ORANGE }} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-black leading-snug" style={{ color: DARK }}>{doc.name}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {doc.category} · {new Date(doc.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{doc.description}</p>

                  {/* Parties */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Parties</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.parties.map(party => (
                        <span key={party} className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ background: '#F5F4F4', color: DARK }}>
                          {party}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={doc.path}
                      download={doc.filename}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: ORANGE }}
                    >
                      <Download size={15} />
                      Download PDF
                    </a>
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all hover:opacity-80"
                      style={{ borderColor: DARK, color: DARK }}
                    >
                      <ExternalLink size={15} />
                      Open in Tab
                    </a>
                  </div>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                  <FileText size={15} style={{ color: ORANGE }} />
                  <p className="text-sm font-semibold" style={{ color: DARK }}>{doc.name}</p>
                </div>
                <div className="w-full" style={{ height: '1400px' }}>
                  <iframe src={doc.path} className="w-full h-full border-0" title={doc.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
