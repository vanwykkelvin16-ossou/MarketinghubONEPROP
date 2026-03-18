import { useState } from 'react';
import type { Property } from '../../types';
import { Download, Image, FileText, Video, Hash, Palette, ExternalLink, Filter } from 'lucide-react';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  photo: <Image size={16} />,
  video: <Video size={16} />,
  brochure: <FileText size={16} />,
  social: <Hash size={16} />,
  branding: <Palette size={16} />,
};

const TYPE_COLORS: Record<string, string> = {
  photo: 'bg-blue-100 text-blue-600',
  video: 'bg-purple-100 text-purple-600',
  brochure: 'bg-orange-100 text-orange-600',
  social: 'bg-pink-100 text-pink-600',
  branding: 'bg-emerald-100 text-emerald-600',
};

const TYPE_LABELS: Record<string, string> = {
  photo: 'Photography',
  video: 'Video',
  brochure: 'Brochure',
  social: 'Social Media',
  branding: 'Branding',
};

const FILTERS = ['all', 'photo', 'video', 'brochure', 'social', 'branding'];

export default function MarketingTab({ property }: { property: Property }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const filtered = property.marketing.filter(a =>
    activeFilter === 'all' || a.type === activeFilter
  );

  const selected = property.marketing.find(a => a.id === selectedAsset);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-orange-500" />
              Marketing Materials
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">{property.marketing.length} assets available for download</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-sm font-semibold transition-colors">
            <Download size={15} />
            Download All
          </button>
        </div>

        {/* Type filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-400" />
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                activeFilter === f
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Assets' : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 fade-in"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-72 bg-gray-900">
              <img src={selected.url} alt={selected.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{selected.title}</p>
                <p className="text-gray-500 text-sm mt-0.5">{TYPE_LABELS[selected.type]} · {selected.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assets Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <Image size={36} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No assets in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedAsset(asset.id)}
            >
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={asset.thumbnail}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[asset.type]}`}>
                    {TYPE_ICONS[asset.type]}
                    {TYPE_LABELS[asset.type]}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <ExternalLink size={18} className="text-gray-700" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900 text-sm truncate">{asset.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-400 text-xs">{asset.date}</p>
                  <button
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white rounded-xl text-xs font-semibold transition-all"
                  >
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload placeholder */}
      <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-orange-50 flex items-center justify-center mx-auto mb-3 transition-colors">
          <Image size={22} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
        </div>
        <p className="text-gray-600 font-semibold text-sm">Upload New Marketing Asset</p>
        <p className="text-gray-400 text-xs mt-1">Drag & drop files or click to browse</p>
        <p className="text-gray-300 text-xs mt-1">Supports JPG, PNG, PDF, MP4</p>
      </div>
    </div>
  );
}
