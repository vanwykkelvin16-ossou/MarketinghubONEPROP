import { BookOpen, ExternalLink } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

const NOTEBOOK_URL =
  'https://notebooklm.google.com/notebook/c817648b-e12b-44f2-891b-960cf261a5c9?authuser=1';

export default function NotesHub() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ORANGE }}>
          Marketing
        </p>
        <h1 className="text-3xl font-black mb-2" style={{ color: DARK }}>
          Notes
        </h1>
        <p className="text-gray-500 text-sm">
          All notes and research for ONE Property Holdings.
        </p>
      </div>

      {/* Notebook card */}
      <div
        className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Icon + title */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#FFF7ED' }}
            >
              <BookOpen size={22} style={{ color: ORANGE }} />
            </div>
            <div>
              <h2 className="text-base font-bold mb-0.5" style={{ color: DARK }}>
                ONE Property Holdings — Notebook
              </h2>
              <p className="text-sm text-gray-500">
                Google NotebookLM · All notes, briefs and research in one place.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Open button */}
          <a
            href={NOTEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: ORANGE }}
          >
            <ExternalLink size={15} />
            Open Notebook
          </a>
        </div>
      </div>

      {/* Notice */}
      <p className="mt-5 text-center text-xs text-gray-400">
        Notes are stored in Google NotebookLM. A Google account is required to access.
      </p>
    </div>
  );
}
