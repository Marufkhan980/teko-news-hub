
import { Link } from 'react-router-dom';
import {
  FaNewspaper,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-slate-300 overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute -top-32 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14 pb-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-900/40">
                <FaNewspaper />
              </div>

              <span className="text-2xl font-extrabold text-white tracking-tight">
                Teko <span className="text-blue-400">News Hub</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-md mb-6">
              সত্যের সন্ধানে, প্রতিদিন। দেশের ও বিশ্বের সর্বশেষ খবর,
              গুরুত্বপূর্ণ আপডেট এবং নির্ভরযোগ্য সংবাদ পৌঁছে দিতে
              আমরা প্রতিশ্রুতিবদ্ধ।
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-500 hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition">
                  <FaArrowRight className="text-xs text-blue-500" />
                  Home
                </Link>
              </li>

              <li>
                <Link to="/news" className="flex items-center gap-2 hover:text-blue-400 transition">
                  <FaArrowRight className="text-xs text-blue-500" />
                  All News
                </Link>
              </li>

              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition">
                  <FaArrowRight className="text-xs text-blue-500" />
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="flex items-center gap-2 hover:text-blue-400 transition">
                  <FaArrowRight className="text-xs text-blue-500" />
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">
              Get In Touch
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-blue-400 text-lg mt-0.5" />
                <div>
                  <p className="text-slate-400 mb-1">Email</p>
                  <a
                    href="mailto:info@tekonewshub.com"
                    className="text-slate-200 hover:text-blue-400 transition"
                  >
                    Contact Us
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 text-lg mt-0.5" />
                <div>
                  <p className="text-slate-400 mb-1">Location</p>
                  <span className="text-slate-200">Bangladesh</span>
                </div>
              </li>
            </ul>

            <Link
              to="/news"
              className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-blue-400 hover:text-white transition"
            >
              Explore News <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Teko News Hub. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Made with <span className="text-red-400">♥</span> for news readers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
