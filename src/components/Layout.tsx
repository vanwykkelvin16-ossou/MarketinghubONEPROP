import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Building2, LayoutDashboard, FolderOpen, Search, LogOut,
  Menu, X, ChevronRight, ChevronDown, ChevronLeft, Bell, Megaphone,
  Video, Image, Palette, ExternalLink, Monitor,
} from 'lucide-react';
// Building2 kept for logo icon only

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',        path: '/' },
  { icon: Monitor,         label: 'Marketing System', path: '/marketing-system' },
  { icon: FolderOpen,      label: 'Documents',        path: '/documents' },
  { icon: Megaphone,       label: 'Marketing',        path: '/marketing' },
];

const MARKETING_SUB_NAV = [
  { icon: Megaphone,    label: 'Hub',     path: '/marketing' },
  { icon: Video,        label: 'Videos',  path: '/marketing/videos' },
  { icon: Image,        label: 'Posters', path: '/marketing/posters' },
  { icon: ExternalLink, label: 'Canva',   path: '/marketing/canva' },
  { icon: Palette,      label: 'Brand',   path: '/marketing/brand' },
];

export default function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [marketingExpanded, setMarketingExpanded] = useState(false);

  const isMarketingSection = location.pathname === '/marketing' || location.pathname.startsWith('/marketing/');

  useEffect(() => {
    if (isMarketingSection) setMarketingExpanded(true);
  }, [isMarketingSection]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-40 w-72 bg-gray-950 flex flex-col
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Building2 size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">ONE Property</p>
            <p className="text-gray-500 text-xs truncate">Holdings Internal Hub</p>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-500 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gray-800 mb-6" />

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const isMarketing = path === '/marketing';
            const active = location.pathname === path ||
              (isMarketing && isMarketingSection);

            if (isMarketing) {
              return (
                <div key={path}>
                  <button
                    onClick={() => {
                      setMarketingExpanded(prev => !prev);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 ${
                      active ? 'text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                    }`}
                    style={active ? {
                      background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))',
                      border: '1px solid rgba(249,115,22,0.2)',
                    } : {}}
                  >
                    <Icon size={18} className={active ? 'text-orange-400' : ''} />
                    <span>{label}</span>
                    <ChevronDown
                      size={14}
                      className={`ml-auto transition-transform duration-200 ${active ? 'text-orange-400 opacity-60' : 'text-gray-600'} ${marketingExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Marketing sub-items */}
                  {marketingExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-800 pl-3">
                      {MARKETING_SUB_NAV.map(({ icon: SubIcon, label: subLabel, path: subPath }) => {
                        const subActive = location.pathname === subPath;
                        return (
                          <button
                            key={subPath}
                            onClick={() => { navigate(subPath); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                              subActive ? 'text-orange-400 bg-orange-500/10' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                            }`}
                          >
                            <SubIcon size={14} />
                            <span>{subLabel}</span>
                            {subActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={path}
                onClick={() => { navigate(path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))',
                  border: '1px solid rgba(249,115,22,0.2)',
                } : {}}
              >
                <Icon size={18} className={active ? 'text-orange-400' : ''} />
                <span>{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-orange-400 opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 py-6 border-t border-gray-800">
          <div className="px-4 py-3 rounded-2xl bg-gray-900 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400 text-xs font-bold">ONE</span>
              </div>
              <div>
                <p className="text-white text-xs font-medium">Company Access</p>
                <p className="text-gray-600 text-xs">Authorized User</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-lg">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={20} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-100">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-orange-700 text-xs font-semibold">Live</span>
            </div>
          </div>
        </header>

        {/* Mobile back button for marketing pages */}
        {isMarketingSection && (
          <div className="lg:hidden flex items-center px-4 py-3 bg-white border-b border-gray-100">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all"
              style={{ borderColor: '#373435', color: '#373435' }}
            >
              <ChevronLeft size={15} />
              Back
            </button>
          </div>
        )}

        {/* Marketing sub-nav — desktop horizontal strip */}
        {isMarketingSection && (
          <div className="hidden lg:flex items-center gap-1 bg-white border-b border-gray-100 px-8 py-2">
            {MARKETING_SUB_NAV.map(({ icon: Icon, label, path }) => {
              const active = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={active
                    ? { background: '#FFF7ED', color: '#F28E2E' }
                    : { color: '#9CA3AF' }
                  }
                >
                  <Icon size={13} />
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="page-enter">
            {children}
          </div>

          {/* Marketing sub-nav — mobile sticky bottom */}
          {isMarketingSection && (
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center px-2 py-2 safe-bottom"
              style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}>
              {MARKETING_SUB_NAV.map(({ icon: Icon, label, path }) => {
                const active = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all"
                    style={active ? { color: '#F28E2E' } : { color: '#9CA3AF' }}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-semibold">{label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/marketing?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search marketing, documents..."
        className={`w-full bg-gray-50 border rounded-2xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all outline-none ${
          focused ? 'border-orange-300 bg-white shadow-sm ring-2 ring-orange-100' : 'border-gray-200'
        }`}
      />
      {query && (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
          ↵
        </kbd>
      )}
    </div>
  );
}
