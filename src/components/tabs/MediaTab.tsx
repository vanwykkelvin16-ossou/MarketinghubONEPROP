import { useState } from 'react';
import type { Property } from '../../types';
import { Camera, Download, Eye, X, ChevronLeft, ChevronRight, Image, MapPin, Building, Star, Filter } from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  exterior:    { label: 'Exterior',    icon: <Building size={14} />,  color: 'text-blue-600',   bg: 'bg-blue-50'   },
  interior:    { label: 'Interior',    icon: <Image size={14} />,     color: 'text-purple-600', bg: 'bg-purple-50' },
  aerial:      { label: 'Aerial',      icon: <MapPin size={14} />,    color: 'text-emerald-600',bg: 'bg-emerald-50'},
  development: { label: 'Development', icon: <Star size={14} />,      color: 'text-amber-600',  bg: 'bg-amber-50'  },
  event:       { label: 'Event',       icon: <Camera size={14} />,    color: 'text-pink-600',   bg: 'bg-pink-50'   },
};

const CATS = ['all', 'exterior', 'interior', 'aerial', 'development', 'event'];

export default function MediaTab({ property }: { property: Property }) {
  const [catFilter, setCatFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = property.media.filter(m =>
    catFilter === 'all' || m.category === catFilter
  );

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => i === null ? null : Math.max(0, i - 1));
  const nextImage = () => setLightboxIdx(i => i === null ? null : Math.min(filtered.length - 1, i + 1));

  const currentMedia = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="space-y-6 fade-in-up">
      {/* Lightbox */}
      {currentMedia && (
        <div className="fixed inset-0 bg-black/95 z-50 fade-in flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
            <div>
              <p className="text-white font-semibold">{currentMedia.title}</p>
              <p className="text-white/50 text-sm">
                {CATEGORY_CONFIG[currentMedia.category]?.label} · {currentMedia.date} · {currentMedia.fileSize}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors">
                <Download size={15} />
                Download
              </button>
              <button onClick={closeLightbox} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center px-16 min-h-0 relative">
            <button
              onClick={prevImage}
              disabled={lightboxIdx === 0}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={currentMedia.url}
              alt={currentMedia.title}
              className="max-h-full max-w-full object-contain rounded-2xl"
              style={{ maxHeight: 'calc(100vh - 180px)' }}
            />

            <button
              onClick={nextImage}
              disabled={lightboxIdx === filtered.length - 1}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center justify-center gap-2 px-6 py-4 overflow-x-auto flex-shrink-0">
            {filtered.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setLightboxIdx(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                  i === lightboxIdx ? 'ring-2 ring-orange-500 scale-110' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header + Filters */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-orange-500" />
              Media Library
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">{property.media.length} high-resolution assets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-sm font-semibold transition-colors">
            <Download size={15} />
            Download All
          </button>
        </div>

        {/* Category stat chips */}
        <div className="flex gap-2 flex-wrap mb-4">
          {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
            const count = property.media.filter(m => m.category === cat).length;
            if (count === 0) return null;
            return (
              <div key={cat} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                {cfg.icon}
                {cfg.label}: {count}
              </div>
            );
          })}
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-400" />
          {CATS.filter(c => c === 'all' || property.media.some(m => m.category === c)).map(c => {
            const cfg = CATEGORY_CONFIG[c];
            return (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                  catFilter === c
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c !== 'all' && cfg && <span>{cfg.icon}</span>}
                {c === 'all' ? `All Media (${property.media.length})` : `${cfg.label}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Masonry Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <Image size={36} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No media in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((media, i) => {
            const cfg = CATEGORY_CONFIG[media.category];
            const isTall = i % 5 === 0;
            return (
              <div
                key={media.id}
                className={`group relative bg-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 ${
                  isTall ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: isTall ? '1/1.8' : '1/1' }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${cfg?.bg} ${cfg?.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {cfg?.icon}
                    {cfg?.label}
                  </span>
                </div>

                {/* View button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <Eye size={20} className="text-gray-800" />
                  </div>
                </div>

                {/* Info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-semibold truncate">{media.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-white/60 text-xs">{media.fileSize}</p>
                    <button
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 px-2 py-0.5 bg-white/20 hover:bg-orange-500 rounded-lg text-white text-xs font-medium transition-colors"
                    >
                      <Download size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload zone */}
      <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-orange-50 flex items-center justify-center mx-auto mb-3 transition-colors">
          <Camera size={22} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
        </div>
        <p className="text-gray-600 font-semibold text-sm">Upload Media Assets</p>
        <p className="text-gray-400 text-xs mt-1">Drag & drop high-resolution images or videos</p>
        <p className="text-gray-300 text-xs mt-1">Supports JPG, PNG, WEBP, MP4 · Max 100MB per file</p>
      </div>
    </div>
  );
}
