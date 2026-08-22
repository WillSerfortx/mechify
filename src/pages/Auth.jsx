import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const VALID_EMAIL = 'mahi@gmail.com';
  const VALID_PASSWORD = '123';

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) { alert('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        navigate('/home');
      } else {
        alert('❌ Invalid email or password. Please try again.');
      }
    }, 1200);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) { alert('Please enter your email.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white font-outfit flex flex-col lg:flex-row overflow-hidden relative">
      
      {/* ── Cinematic Background Animation ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1558981852-426c373d4a83?w=1920&h=1080&fit=crop"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover animate-kenBurns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Left Panel: Branding ── */}
      <div className="lg:w-1/2 relative z-10 flex flex-col justify-center items-center p-12 min-h-[35vh] lg:min-h-screen overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <Link to="/landing" className="inline-flex items-center gap-3 mb-10 group">
            <div>
              <svg width="56" height="48" viewBox="0 0 56 48" fill="none">
                <rect width="56" height="48" rx="4" fill="#CC0000"/>
                <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
                <g transform="translate(32,30) scale(0.55)">
                  <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                  <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                  <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                  <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                </g>
              </svg>
            </div>
            <div className="text-left leading-tight">
              <div className="text-white font-black text-2xl tracking-widest group-hover:text-red-400 transition-colors">MECHIFY</div>
              <div className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">Vehicle Support</div>
            </div>
          </Link>

          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Your Car.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Our Priority.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Join Mechify for instant access to premium car rentals, certified mechanics, emergency fuel, and more — all in one place.
          </p>

          <div className="space-y-4 text-left">
            {['Luxury car rentals & chauffeur hiring', 'Emergency roadside assistance 24/7', 'Certified workshop bookings', '450+ genuine spare parts'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center flex-shrink-0 text-red-400">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-12 bg-black/50 backdrop-blur-xl border-l border-white/10 relative z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-md">

          {/* ── SIGN IN FORM ── */}
          {mode === 'signin' && (
            <div className="animate-fadeIn">
              <h1 className="text-4xl font-black mb-2">Welcome back</h1>
              <p className="text-gray-400 mb-10">Sign in to your Mechify account</p>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:bg-white/8 transition-all text-base"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:bg-white/8 transition-all text-base pr-14"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xl transition-colors"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-900 text-white font-black text-lg py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] relative overflow-hidden group"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Signing In...
                    </span>
                  ) : 'Sign In →'}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-gray-500 text-sm font-semibold">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <Link
                to="/register"
                className="group block w-full text-center border-2 border-white/20 hover:border-red-500 text-white font-black text-lg py-5 rounded-xl transition-all duration-300 hover:bg-red-600/10 hover:shadow-[0_0_25px_rgba(220,38,38,0.2)]"
              >
                Create / Join Today 🚗
              </Link>

              <p className="text-center text-gray-600 text-xs mt-6">
                By continuing, you agree to Mechify's{' '}
                <span className="text-red-500 cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-red-500 cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          )}

          {/* ── FORGOT PASSWORD FORM ── */}
          {mode === 'forgot' && (
            <div className="animate-fadeIn">
              <button onClick={() => { setMode('signin'); setResetSent(false); setResetEmail(''); }} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors font-semibold">
                ← Back to Sign In
              </button>

              <h1 className="text-4xl font-black mb-2">Reset Password</h1>
              <p className="text-gray-400 mb-10">Enter your email and we'll send you a reset link.</p>

              {resetSent ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="text-7xl mb-6">✉️</div>
                  <h2 className="text-2xl font-black mb-3">Check Your Inbox</h2>
                  <p className="text-gray-400 mb-8">We've sent a password reset link to<br /><span className="text-white font-bold">{resetEmail}</span></p>
                  <button onClick={() => { setMode('signin'); setResetSent(false); setResetEmail(''); }} className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-all text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-900 text-white font-black text-lg py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
