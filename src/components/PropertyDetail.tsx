import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty } from '../data/properties';
import { ArrowLeft, LayoutDashboard, Image, FileText, Users, Camera, Share2, Star } from 'lucide-react';
import OverviewTab from './tabs/OverviewTab';
import MarketingTab from './tabs/MarketingTab';
import DocumentsTab from './tabs/DocumentsTab';
import TenantsTab from './tabs/TenantsTab';
import MediaTab from './tabs/MediaTab';

const TABS = [
  { id: 'overview',   label: 'Overview',    icon: LayoutDashboard },
  { id: 'marketing',  label: 'Marketing',   icon: Image },
  { id: 'documents',  label: 'Documents',   icon: FileText },
  { id: 'tenants',    label: 'Tenants',     icon: Users },
  { id: 'media',      label: 'Media Library', icon: Camera },
] as const;

type TabId = typeof TABS[number]['id'];

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [bookmarked, setBookmarked] = useState(false);

  const property = getProperty(id || '');

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mb-4">
          <FileText size={28} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Property Not Found</h2>
        <p className="text-gray-500 mb-6">This property doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-2xl font-semibold transition-all hover:bg-orange-600"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>
      </div>
    );
  }

  const STATUS_CONFIG = {
    active:      { label: 'Active',         class: 'bg-green-50 text-green-700 border border-green-200' },
    development: { label: 'In Development', class: 'bg-amber-50 text-amber-700 border border-amber-200' },
    upcoming:    { label: 'Upcoming',        class: 'bg-blue-50 text-blue-700 border border-blue-200' },
  };

  const statusCfg = STATUS_CONFIG[property.status];
  const tabCounts: Partial<Record<TabId, number>> = {
    documents: property.documents.length,
    tenants: property.tenants.length,
    marketing: property.marketing.length,
    media: property.media.length,
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Property Hero Header */}
      <div className="relative h-56 lg:h-72 overflow-hidden flex-shrink-0">
        <img
          src={property.coverImage}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back button */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 bg-white/15 hover:bg-white/25 text-white rounded-2xl text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-8 flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2.5 rounded-2xl text-white transition-all backdrop-blur-sm border ${
              bookmarked
                ? 'bg-orange-500 border-orange-400'
                : 'bg-white/15 hover:bg-white/25 border-white/20'
            }`}
          >
            <Star size={16} className={bookmarked ? 'fill-current' : ''} />
          </button>
          <button className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all backdrop-blur-sm border border-white/20">
            <Share2 size={16} />
          </button>
        </div>

        {/* Property Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusCfg.class}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      property.status === 'active' ? 'bg-green-500' :
                      property.status === 'development' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    {statusCfg.label}
                  </span>
                  <span className="text-white/60 text-xs capitalize">{property.type.replace('-', ' ')}</span>
                </div>
                <h1 className="text-white text-2xl lg:text-3xl font-black tracking-tight">{property.name}</h1>
                <p className="text-white/70 text-sm mt-1">{property.location} · {property.province}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white/60 text-xs">GLA</p>
                  <p className="text-white font-bold text-lg">{property.gla}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Occupancy</p>
                  <p className="text-white font-bold text-lg">{property.stats.occupancy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map(({ id: tabId, label, icon: Icon }) => {
              const count = tabCounts[tabId];
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? 'text-orange-600 border-orange-500'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-orange-500' : 'text-gray-400'} />
                  {label}
                  {count !== undefined && count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <div key={activeTab} className="fade-in-up">
          {activeTab === 'overview'  && <OverviewTab  property={property} />}
          {activeTab === 'marketing' && <MarketingTab property={property} />}
          {activeTab === 'documents' && <DocumentsTab property={property} />}
          {activeTab === 'tenants'   && <TenantsTab   property={property} />}
          {activeTab === 'media'     && <MediaTab     property={property} />}
        </div>
      </div>
    </div>
  );
}
