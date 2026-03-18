import { useState } from 'react';
import type { Property } from '../../types';
import {
  FileText, BarChart2, Shield, Wrench, Layout, Download,
  Search, Filter, Eye, Clock, ChevronDown
} from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  legal:       { icon: <FileText size={16} />,  label: 'Legal',       color: 'text-blue-600',   bg: 'bg-blue-50'   },
  financial:   { icon: <BarChart2 size={16} />, label: 'Financial',   color: 'text-emerald-600', bg: 'bg-emerald-50' },
  lease:       { icon: <FileText size={16} />,  label: 'Lease',       color: 'text-orange-600', bg: 'bg-orange-50' },
  maintenance: { icon: <Wrench size={16} />,    label: 'Maintenance', color: 'text-red-600',    bg: 'bg-red-50'    },
  insurance:   { icon: <Shield size={16} />,    label: 'Insurance',   color: 'text-purple-600', bg: 'bg-purple-50' },
  plans:       { icon: <Layout size={16} />,    label: 'Plans',       color: 'text-gray-600',   bg: 'bg-gray-100'  },
};

const CATEGORIES = ['all', 'legal', 'financial', 'lease', 'maintenance', 'insurance', 'plans'];

export default function DocumentsTab({ property }: { property: Property }) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortDesc, setSortDesc] = useState(true);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const filtered = property.documents
    .filter(d => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === 'all' || d.category === catFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      let comp = 0;
      if (sortBy === 'name') comp = a.name.localeCompare(b.name);
      else if (sortBy === 'date') comp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortBy === 'size') comp = parseFloat(a.size) - parseFloat(b.size);
      return sortDesc ? -comp : comp;
    });

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDesc(!sortDesc);
    else { setSortBy(col); setSortDesc(true); }
  };

  const catCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'all'
      ? property.documents.length
      : property.documents.filter(d => d.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const previewed = property.documents.find(d => d.id === previewDoc);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header + Search */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-orange-500" />
              Documents & Files
            </h3>
            <p className="text-gray-500 text-sm mt-0.5">{property.documents.length} documents stored</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-sm font-semibold transition-colors">
            <Download size={15} />
            Download All
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-400" />
          {CATEGORIES.filter(c => catCounts[c] > 0).map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  catFilter === cat
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat !== 'all' && catFilter !== cat && <span className={cfg.color}>{cfg.icon}</span>}
                {cat === 'all' ? `All (${catCounts.all})` : `${cfg.label} (${catCounts[cat]})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {previewed && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setPreviewDoc(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl scale-in" onClick={e => e.stopPropagation()}>
            <div className={`w-14 h-14 rounded-2xl ${CATEGORY_CONFIG[previewed.category]?.bg || 'bg-gray-100'} flex items-center justify-center mx-auto mb-4`}>
              <span className={CATEGORY_CONFIG[previewed.category]?.color || 'text-gray-600'}>
                {CATEGORY_CONFIG[previewed.category]?.icon}
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-center text-lg mb-1">{previewed.name}</h4>
            <p className="text-gray-500 text-sm text-center mb-5">
              {CATEGORY_CONFIG[previewed.category]?.label} · {previewed.type} · {previewed.size}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setPreviewDoc(null)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-sm font-semibold transition-colors">
                Close
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-sm font-semibold transition-colors">
                <Download size={15} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Sort header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-5 lg:col-span-6">Document</div>
          <div className="col-span-3 lg:col-span-2 hidden sm:block">Category</div>
          <button
            onClick={() => toggleSort('date')}
            className="col-span-2 flex items-center gap-1 hover:text-gray-700 transition-colors hidden md:flex"
          >
            Date
            <ChevronDown size={12} className={`transition-transform ${sortBy === 'date' && sortDesc ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => toggleSort('size')}
            className="col-span-2 lg:col-span-1 flex items-center gap-1 hover:text-gray-700 transition-colors"
          >
            Size
            <ChevronDown size={12} className={`transition-transform ${sortBy === 'size' && sortDesc ? 'rotate-180' : ''}`} />
          </button>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No documents found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((doc) => {
              const cfg = CATEGORY_CONFIG[doc.category];
              return (
                <div
                  key={doc.id}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50/80 transition-colors group"
                >
                  {/* Name */}
                  <div className="col-span-5 lg:col-span-6 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cfg?.bg || 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                      <span className={cfg?.color || 'text-gray-600'}>{cfg?.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 text-sm font-semibold truncate">{doc.name}</p>
                      <p className="text-gray-400 text-xs">{doc.type} file</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-3 lg:col-span-2 hidden sm:block">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg?.bg} ${cfg?.color}`}>
                      {cfg?.label}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 hidden md:flex items-center gap-1 text-gray-500 text-xs">
                    <Clock size={12} />
                    {new Date(doc.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>

                  {/* Size */}
                  <div className="col-span-2 lg:col-span-1 text-gray-500 text-sm font-medium">{doc.size}</div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    <button
                      onClick={() => setPreviewDoc(doc.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Preview"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Download"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
