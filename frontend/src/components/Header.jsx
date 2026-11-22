
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import {
  FaNewspaper,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All News', path: '/news' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const navClass = ({ isActive }) =>
    `relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'text-blue-700 bg-blue-50/80'
        : 'text-slate-600 hover:text-blue-700 hover:bg-white/60'
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3">
      <div className="max-w-7xl mx-auto">

        <div className="relative bg-white/75 backdrop-blur-2xl
          border border-white/80 shadow-lg shadow-slate-900/5
          rounded-2xl">

          <div className="px-4 sm:px-6 py-3.5 flex
            justify-between items-center gap-4">

            {/* Logo */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="w-10 h-10 rounded-xl
                bg-gradient-to-br from-blue-600 to-indigo-700
                flex items-center justify-center text-white
                shadow-md shadow-blue-500/20
                group-hover:scale-105 transition">
                <FaNewspaper className="text-xl" />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-extrabold
                  tracking-tight text-slate-900">
                  Teko <span className="text-blue-600">News</span>
                </h1>
                <p className="text-[10px] font-medium
                  tracking-[2px] text-slate-500 uppercase">
                  Hub • Stay Informed
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={navClass}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Authentication */}
            <div className="hidden md:flex items-center gap-3">

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2
                      rounded-xl text-slate-700
                      hover:bg-blue-50 transition"
                  >
                    <FaUserCircle className="text-xl text-blue-600" />
                    <span className="font-semibold text-sm max-w-24 truncate">
                      {user.name}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5
                      rounded-xl bg-red-50 text-red-600
                      hover:bg-red-100 font-semibold text-sm transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 rounded-xl
                      text-blue-700 font-semibold text-sm
                      hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white font-semibold text-sm
                      shadow-md shadow-blue-500/20
                      hover:shadow-lg hover:-translate-y-0.5
                      transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="md:hidden w-10 h-10 flex items-center
                justify-center rounded-xl bg-blue-50
                text-blue-700 hover:bg-blue-100 transition"
            >
              {menuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>

          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden border-t border-slate-200/70
              px-4 py-4 space-y-3 bg-white/90
              backdrop-blur-xl rounded-b-2xl">

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={navClass}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className="border-t border-slate-200/70 pt-3">

                {user ? (
                  <div className="space-y-2">

                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 p-3
                        rounded-xl text-slate-700
                        hover:bg-blue-50 transition"
                    >
                      <FaTachometerAlt className="text-blue-600" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2
                        p-3 rounded-xl text-red-600
                        hover:bg-red-50 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>

                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-center py-3 rounded-xl
                        border border-blue-200 text-blue-700
                        font-semibold hover:bg-blue-50 transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="text-center py-3 rounded-xl
                        bg-blue-600 text-white font-semibold
                        hover:bg-blue-700 transition"
                    >
                      Register
                    </Link>

                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
