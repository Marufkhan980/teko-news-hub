
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaNewspaper,
  FaArrowRight,
  FaShieldAlt,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(name, email, password);

    if (success) {
      toast.success('রেজিস্ট্রেশন সফল হয়েছে!');
      navigate('/');
    } else {
      toast.error(error || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50">

        {/* Left Branding Panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 p-10 lg:p-12 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-20 w-64 h-64 border border-white/10 rounded-full"></div>
          <div className="absolute -right-10 -top-10 w-44 h-44 border border-white/10 rounded-full"></div>
          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/5 rounded-full"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl">
                <FaNewspaper />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Teko News Hub
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Join Our
              <br />
              Community!
            </h1>

            <p className="text-blue-100 leading-relaxed text-base lg:text-lg">
              Create your account and explore the latest news,
              stories and important updates from around the world.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <FaShieldAlt className="text-xl" />
                <span className="text-sm">Simple and secure registration</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <FaNewspaper className="text-xl" />
                <span className="text-sm">Explore news from different categories</span>
              </div>
            </div>
          </div>

          <div className="relative text-blue-100 text-sm">
            Your news journey starts here.
          </div>
        </div>

        {/* Right Registration Form */}
        <div className="p-7 sm:p-10 lg:p-14">

          {/* Mobile Branding */}
          <div className="md:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xl">
              <FaNewspaper />
            </div>
            <span className="text-xl font-extrabold text-slate-800">
              Teko News Hub
            </span>
          </div>

          <div className="mb-8">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Create Account
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              রেজিস্টার করুন
            </h2>

            <p className="text-slate-500">
              নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                আপনার নাম
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="আপনার সম্পূর্ণ নাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                ইমেইল অ্যাড্রেস
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  placeholder="একটি পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'অপেক্ষা করুন...' : 'অ্যাকাউন্ট তৈরি করুন'}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              আগে থেকেই অ্যাকাউন্ট আছে?
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:text-indigo-700 hover:underline ml-1"
              >
                লগইন করুন
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <FaShieldAlt className="text-blue-500" />
            Secure Registration · Teko News Hub
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
