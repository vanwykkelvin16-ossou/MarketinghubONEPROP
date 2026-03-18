import type { Property } from '../../types';
import { MapPin, Calendar, Layers, TrendingUp, Car, Building, ChevronRight } from 'lucide-react';

export default function OverviewTab({ property }: { property: Property }) {
  const TYPE_COLOR: Record<string, string> = {
    retail: 'bg-blue-500',
    office: 'bg-purple-500',
    'mixed-use': 'bg-emerald-500',
    commercial: 'bg-amber-500',
    industrial: 'bg-gray-500',
  };

  const stats = [
    { icon: TrendingUp, label: 'Occupancy Rate', value: property.stats.occupancy, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Building, label: 'Total Tenants', value: property.stats.tenants.toString(), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Car, label: 'Parking Bays', value: property.stats.parkingBays, color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Layers, label: 'Floors', value: property.stats.floors, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6 fade-in-up">
      {/* Hero section */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="relative h-72 overflow-hidden">
          <img
            src={property.coverImage}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${TYPE_COLOR[property.type] || 'bg-gray-500'}`} />
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider capitalize">
                    {property.type.replace('-', ' ')} Property
                  </span>
                </div>
                <h2 className="text-white text-2xl font-bold">{property.name}</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={14} className="text-white/70" />
                  <p className="text-white/70 text-sm">{property.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${
                  property.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  property.status === 'development' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {property.status === 'development' ? 'In Development' : property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {stats.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Property Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-orange-500" />
            Property Details
          </h3>
          <dl className="space-y-3">
            {[
              { label: 'Property Name', val: property.name },
              { label: 'Location', val: property.location },
              { label: 'Province', val: property.province },
              { label: 'Property Type', val: property.type.replace('-', ' '), cap: true },
              { label: 'Gross Lettable Area', val: property.gla },
              { label: 'Opening Date', val: property.openingDate, icon: Calendar },
            ].map(({ label, val, cap, icon: Icon }) => (
              <div key={label} className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0">
                <dt className="text-gray-500 text-sm flex-shrink-0 w-44">{label}</dt>
                <dd className={`text-gray-900 text-sm font-semibold text-right flex items-center gap-1.5 ${cap ? 'capitalize' : ''}`}>
                  {Icon && <Icon size={13} className="text-gray-400" />}
                  {val}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex-1">
            <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-orange-500" />
              About This Property
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-blue-500" />
              Town Overview
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{property.townOverview}</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Marketing Materials', 'Documents & Files', 'Tenant Information', 'Media Library'].map((item) => (
            <div key={item} className="bg-white/10 hover:bg-white/20 rounded-2xl p-3 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item}</p>
                <ChevronRight size={14} className="opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
