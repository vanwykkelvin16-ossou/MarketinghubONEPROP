import { useState } from 'react';
import type { Property, Tenant } from '../../types';
import { Search, Users, Building, Utensils, Briefcase, Scissors, Filter, TrendingUp } from 'lucide-react';

const TYPE_CONFIG: Record<Tenant['type'], { icon: React.ReactNode; label: string; color: string; bg: string; border: string }> = {
  anchor:  { icon: <Building size={14} />,   label: 'Anchor',  color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
  retail:  { icon: <TrendingUp size={14} />, label: 'Retail',  color: 'text-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-200' },
  office:  { icon: <Briefcase size={14} />,  label: 'Office',  color: 'text-gray-700',    bg: 'bg-gray-100',   border: 'border-gray-200' },
  food:    { icon: <Utensils size={14} />,   label: 'Food',    color: 'text-orange-700',  bg: 'bg-orange-50',  border: 'bg-orange-200' },
  service: { icon: <Scissors size={14} />,   label: 'Service', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

const STATUS_CONFIG = {
  active:  { label: 'Active',  color: 'text-green-700',  bg: 'bg-green-50',  dot: 'bg-green-500'  },
  pending: { label: 'Pending', color: 'text-amber-700',  bg: 'bg-amber-50',  dot: 'bg-amber-500'  },
  expired: { label: 'Expired', color: 'text-red-700',    bg: 'bg-red-50',    dot: 'bg-red-500'    },
};

const TYPES: Array<Tenant['type'] | 'all'> = ['all', 'anchor', 'retail', 'office', 'food', 'service'];

export default function TenantsTab({ property }: { property: Property }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<Tenant['type'] | 'all'>('all');

  const filtered = property.tenants.filter(t => {
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.unit.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  // Stats
  const anchors = property.tenants.filter(t => t.type === 'anchor').length;
  const active = property.tenants.filter(t => t.status === 'active').length;
  const totalSize = property.tenants.reduce((acc, t) => {
    const n = parseFloat(t.size.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Tenants', value: property.tenants.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Anchor Tenants', value: anchors, icon: Building, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Active Leases', value: active, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Let Area', value: `${totalSize.toLocaleString()} m²`, icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-2xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tenants, categories..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {TYPES.map(t => {
                const cfg = TYPE_CONFIG[t as Tenant['type']];
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                      typeFilter === t
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t !== 'all' && cfg && <span>{cfg.icon}</span>}
                    {t === 'all' ? 'All Tenants' : cfg?.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <Users size={36} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No tenants found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((tenant) => {
            const typeCfg = TYPE_CONFIG[tenant.type];
            const statusCfg = STATUS_CONFIG[tenant.status];
            const leaseEnd = new Date(tenant.leaseEnd);
            const now = new Date();
            const daysLeft = Math.ceil((leaseEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const monthsLeft = Math.ceil(daysLeft / 30);
            const isExpiringSoon = daysLeft > 0 && daysLeft <= 365;

            return (
              <div key={tenant.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${typeCfg.bg} flex items-center justify-center`}>
                      <span className={`text-xl font-black ${typeCfg.color}`}>
                        {tenant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{tenant.name}</p>
                      <p className="text-gray-500 text-xs">{tenant.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${typeCfg.bg} ${typeCfg.color} ${typeCfg.border}`}>
                      {typeCfg.icon}
                      {typeCfg.label}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {statusCfg.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { label: 'Unit / Location', val: tenant.unit },
                    { label: 'Unit Size', val: tenant.size },
                    { label: 'Lease Start', val: new Date(tenant.leaseStart).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' }) },
                    { label: 'Lease End', val: new Date(tenant.leaseEnd).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' }) },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-gray-50 rounded-2xl p-3">
                      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                      <p className="text-gray-900 text-sm font-semibold">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Lease progress */}
                {tenant.status !== 'expired' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-gray-400">Lease Duration</p>
                      <p className={`text-xs font-semibold ${isExpiringSoon ? 'text-amber-600' : 'text-gray-600'}`}>
                        {daysLeft > 0
                          ? `${monthsLeft > 12 ? `${Math.floor(monthsLeft / 12)}y ${monthsLeft % 12}m` : `${monthsLeft}m`} remaining`
                          : 'Expired'}
                      </p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      {(() => {
                        const start = new Date(tenant.leaseStart).getTime();
                        const end = new Date(tenant.leaseEnd).getTime();
                        const progress = Math.max(0, Math.min(100, ((now.getTime() - start) / (end - start)) * 100));
                        return (
                          <div
                            className={`h-full rounded-full transition-all ${isExpiringSoon ? 'bg-amber-500' : 'bg-orange-500'}`}
                            style={{ width: `${progress}%` }}
                          />
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
