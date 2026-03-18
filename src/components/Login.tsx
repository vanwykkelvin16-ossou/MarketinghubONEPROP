import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, ArrowRight, Building2, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');

    // Small delay for UX polish
    await new Promise(r => setTimeout(r, 600));

    const success = login(code);
    if (!success) {
      setError('Invalid access code. Please check and try again.');
      setLoading(false);
      setShake(true);
      setCode('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 60%)' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

      <div className="relative w-full max-w-md fade-in-up">
        {/* Logo Card */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Building2 size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            ONE Property Holdings
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">
            Internal Property Hub
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <ShieldCheck size={20} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">Secure Access</h2>
              <p className="text-gray-500 text-sm">Enter your company access code</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={`relative mb-6 ${shake ? 'animate-bounce' : ''}`}
              style={{ animation: shake ? 'shake 0.4s ease' : undefined }}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </div>
              <input
                ref={inputRef}
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                placeholder="Company access code"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-2xl pl-12 pr-12 py-4 text-base focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 text-white font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading || !code.trim()
                  ? '#374151'
                  : 'linear-gradient(135deg, #F97316, #EA580C)',
                boxShadow: loading || !code.trim() ? 'none' : '0 4px 20px rgba(249,115,22,0.4)',
              }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Access Platform</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-gray-600 text-xs">
              Secure access · Authorized personnel only
            </p>
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          © 2026 ONE Property Holdings · All rights reserved
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
