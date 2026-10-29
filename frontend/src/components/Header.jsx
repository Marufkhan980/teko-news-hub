import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaNewspaper, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <FaNewspaper />
          Teko News Hub
        </Link>
        
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/news" className="hover:text-primary transition">All News</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 font-medium hover:text-primary transition">
                <FaUserCircle className="text-xl" />
                {user.name}
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 text-primary font-medium border border-primary rounded-lg hover:bg-primary hover:text-white transition">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-800 transition">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;