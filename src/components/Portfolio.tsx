import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';
import { Search, Filter, MapPin, ArrowRight, Building2, SlidersHorizontal } from 'lucide-react';

const TYPES = ['all', 'retail', 'office', 'mixed-use', 'commercial'];
const STATUSES = ['all', 'active', 'development'];

const TYPE_COLORS: Record<string, string> = {
  retail: 'bg-blue-100 text-blue-700',
  office: 'bg-purple-100 text-purple-700',
  'mixed-use': 'bg-emerald-100 text-emerald-700',
  commercial: 'bg-amber-100 text-amber-700',
};

const STATUS_BADGE: Record<string, { bg: string; dot: string }> = {
  active: { bg: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  development: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  upcoming: { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
};

export default function Portfolio() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [query, setQuery] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = PROPERTIES.filter(p => {
    const matchQuery = !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase()) ||
      p.province.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase());
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchQuery && matchType && matchStatus;
  });

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-orange-500" />
          <p className="text-orange-600 text-sm font-semibold tracking-wide uppercase">Portfolio</p>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Property Portfolio</h1>
            <p className="text-gray-500 mt-1">{PROPERTIES.length} properties · {filtered.length} showing</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl border transition-all ${viewMode === 'grid' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" rx="1.5" />
                <rect x="9" y="0" width="7" height="7" rx="1.5" />
                <rect x="0" y="9" width="7" height="7" rx="1.5" />
                <rect x="9" y="9" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl border transition-all ${viewMode === 'list' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="1" width="16" height="3" rx="1.5" />
                <rect x="0" y="6.5" width="16" height="3" rx="1.5" />
                <rect x="0" y="12" width="16" height="3" rx="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, city, province..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                    typeFilter === t
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t === 'all' ? 'All Types' : t.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                    statusFilter === s
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'All Status' : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Building2 size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No properties found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((property, i) => (
            <PropertyGridCard key={property.id} property={property} index={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((property, i) => (
            <PropertyListRow key={property.id} property={property} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyGridCard({ property, index }: { property: typeof PROPERTIES[0]; index: number }) {
  const navigate = useNavigate();
  const status = STATUS_BADGE[property.status];

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-250 fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.coverImage}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {property.status === 'development' ? 'In Development' : property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-bold text-lg leading-tight">{property.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-white/70" />
            <p className="text-white/70 text-xs">{property.city}, {property.province}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${TYPE_COLORS[property.type] || 'bg-gray-100 text-gray-700'}`}>
            {property.type.replace('-', ' ')}
          </span>
          <div className="text-right">
            <p className="text-xs text-gray-400">GLA</p>
            <p className="text-sm font-bold text-gray-900">{property.gla}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Occupancy', val: property.stats.occupancy },
            { label: 'Tenants', val: property.stats.tenants },
            { label: 'Parking', val: property.stats.parkingBays },
          ].map(({ label, val }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-2.5 text-center">
              <p className="text-sm font-bold text-gray-900">{val}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <p className="text-xs text-gray-500">Opened {property.openingDate}</p>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-200">
            <ArrowRight size={14} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyListRow({ property, index }: { property: typeof PROPERTIES[0]; index: number }) {
  const navigate = useNavigate();
  const status = STATUS_BADGE[property.status];

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:border-orange-200 transition-all duration-200 fade-in-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-20 h-16 rounded-2xl overflow-hidden flex-shrink-0">
          <img src={property.coverImage} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-gray-900 text-sm truncate">{property.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-gray-400" />
                <p className="text-gray-500 text-xs">{property.city}, {property.province}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${status.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {property.status === 'development' ? 'In Dev' : property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${TYPE_COLORS[property.type] || 'bg-gray-100 text-gray-700'}`}>
              {property.type.replace('-', ' ')}
            </span>
            <span className="text-xs text-gray-500">{property.gla} GLA</span>
            <span className="text-xs text-gray-500">{property.stats.occupancy} occupied</span>
            <span className="text-xs text-gray-500">{property.stats.tenants} tenants</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-200 flex-shrink-0">
          <ArrowRight size={14} className="text-gray-400 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
}
