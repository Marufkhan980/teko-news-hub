import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Teko News Hub</h2>
            <p className="text-sm text-gray-400">সত্যের সন্ধানে, প্রতিদিন।</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/news" className="hover:text-white transition">News</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Teko News Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;