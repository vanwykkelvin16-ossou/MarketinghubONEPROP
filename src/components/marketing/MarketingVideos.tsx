import { Clock } from 'lucide-react';

const ORANGE = '#F28E2E';
const DARK   = '#373435';

export default function MarketingVideos() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAFA' }}>

      {/* Sub-page header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-5 rounded-full" style={{ background: ORANGE }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
            Marketing Hub
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: DARK }}>
          Property Videos
        </h1>
      </div>

      {/* Full centred message */}
      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <div className="text-center max-w-md">

          {/* Icon */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{ background: '#FFF7ED' }}
          >
            <Clock size={44} style={{ color: ORANGE }} strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h2
            className="text-3xl font-black mb-4 leading-tight"
            style={{ color: DARK }}
          >
            Video In Progress
          </h2>

          {/* Body */}
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            All property videos are currently being created.
            <br />
            Content will be published here once production is complete.
          </p>

          {/* Status pill */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full"
            style={{ background: '#FFF7ED', border: '1.5px solid rgba(242,142,46,0.25)' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: ORANGE }}
            />
            <span className="text-sm font-bold" style={{ color: ORANGE }}>
              Production In Progress
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
