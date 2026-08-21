import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '', dob: '', gender: '',
    address: '', city: '', country: 'Bangladesh',
    vehicleType: '', vehicleMake: '', vehiclePlate: '',
    agree: false,
  });
  const [step, setStep] = useState(1); // 1 = personal, 2 = vehicle

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.phone) {
      alert('Please fill in all required fields.'); return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.'); return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) { alert('Please accept the Terms and Conditions.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 2000);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:bg-white/8 transition-all text-base";
  const labelClass = "text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block";

  return (
    <div className="min-h-screen bg-black text-white font-outfit flex flex-col items-center justify-center px-6 py-20 overflow-x-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/auth" className="inline-flex items-center gap-3 mb-8 group justify-center">
            <svg width="48" height="40" viewBox="0 0 56 48" fill="none">
              <rect width="56" height="48" rx="4" fill="#CC0000"/>
              <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
              <g transform="translate(32,30) scale(0.55)">
                <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
              </g>
            </svg>
            <div className="text-left">
              <div className="font-black text-xl tracking-widest group-hover:text-red-400 transition-colors">MECHIFY</div>
              <div className="text-gray-400 text-[9px] tracking-[0.2em] uppercase">Vehicle Support</div>
            </div>
          </Link>
          <h1 className="text-5xl font-black mb-3">Create Your Account</h1>
          <p className="text-gray-400 text-lg">Join thousands of drivers on Mechify today.</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-red-600' : 'bg-white/10'}`} />
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-red-600' : 'bg-white/10'}`} />
          <div className="text-gray-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Step {step} of 2</div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-black mb-6 text-red-400">👤 Personal Information</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                  <input className={inputClass} placeholder="John" value={form.firstName} onChange={update('firstName')} />
                </div>
                <div>
                  <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                  <input className={inputClass} placeholder="Doe" value={form.lastName} onChange={update('lastName')} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                <input type="email" className={inputClass} placeholder="you@example.com" value={form.email} onChange={update('email')} />
              </div>

              <div>
                <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" className={inputClass} placeholder="+880 1XXXXXXXXX" value={form.phone} onChange={update('phone')} />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} value={form.dob} onChange={update('dob')} style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} value={form.gender} onChange={update('gender')} style={{ colorScheme: 'dark' }}>
                    <option value="" className="bg-black">Select gender</option>
                    <option value="male" className="bg-black">Male</option>
                    <option value="female" className="bg-black">Female</option>
                    <option value="other" className="bg-black">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Address</label>
                <input className={inputClass} placeholder="House, Road, Area" value={form.address} onChange={update('address')} />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} placeholder="Dhaka" value={form.city} onChange={update('city')} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <select className={inputClass} value={form.country} onChange={update('country')} style={{ colorScheme: 'dark' }}>
                    <option className="bg-black">Bangladesh</option>
                    <option className="bg-black">India</option>
                    <option className="bg-black">United Kingdom</option>
                    <option className="bg-black">United States</option>
                    <option className="bg-black">Canada</option>
                    <option className="bg-black">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Password <span className="text-red-500">*</span></label>
                <input type="password" className={inputClass} placeholder="Min. 8 characters" value={form.password} onChange={update('password')} />
              </div>
              <div>
                <label className={labelClass}>Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" className={inputClass} placeholder="Repeat your password" value={form.confirmPassword} onChange={update('confirmPassword')} />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-lg py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(220,38,38,0.4)] mt-4"
              >
                Continue to Vehicle Details →
              </button>
            </form>
          )}

          {/* ── STEP 2: Vehicle Info ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-red-400">🚗 Vehicle Information</h2>
                <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm font-semibold transition-colors">
                  ← Back
                </button>
              </div>

              <p className="text-gray-400 text-sm -mt-4 mb-6">Optional — helps us give you better service recommendations.</p>

              <div>
                <label className={labelClass}>Vehicle Type</label>
                <select className={inputClass} value={form.vehicleType} onChange={update('vehicleType')} style={{ colorScheme: 'dark' }}>
                  <option value="" className="bg-black">Select type</option>
                  <option className="bg-black">Sedan</option>
                  <option className="bg-black">SUV</option>
                  <option className="bg-black">Pickup Truck</option>
                  <option className="bg-black">Sports Car</option>
                  <option className="bg-black">Motorcycle</option>
                  <option className="bg-black">Microbus</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Vehicle Make / Brand</label>
                  <input className={inputClass} placeholder="e.g. Toyota, BMW" value={form.vehicleMake} onChange={update('vehicleMake')} />
                </div>
                <div>
                  <label className={labelClass}>License Plate</label>
                  <input className={`${inputClass} font-mono tracking-widest`} placeholder="DHK-0000" value={form.vehiclePlate} onChange={update('vehiclePlate')} />
                </div>
              </div>

              <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.agree}
                      onChange={update('agree')}
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.agree ? 'bg-red-600 border-red-600' : 'border-white/30 group-hover:border-white/60'}`}>
                      {form.agree && <span className="text-white text-sm font-bold">✓</span>}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I agree to Mechify's{' '}
                    <span className="text-red-400 hover:underline cursor-pointer">Terms of Service</span> and{' '}
                    <span className="text-red-400 hover:underline cursor-pointer">Privacy Policy</span>. I confirm that all information provided is accurate.
                  </p>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-900 text-white font-black text-xl py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.7)] mt-2 relative overflow-hidden group"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                    </svg>
                    Creating Account...
                  </span>
                ) : '🚗 Complete Registration & Enter Mechify'}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <p className="text-center text-gray-600 text-xs">Already have an account? <Link to="/auth" className="text-red-400 hover:text-red-300">Sign In</Link></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
