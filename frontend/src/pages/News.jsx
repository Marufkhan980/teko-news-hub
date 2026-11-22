
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import {
  FaSearch,
  FaNewspaper,
  FaArrowRight,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaFilter
} from 'react-icons/fa';

const categories = [
  'All',
  'Politics',
  'Sports',
  'Technology',
  'Entertainment',
  'Business',
  'Health',
  'World'
];

const NewsCard = ({ news }) => {
  const [imageError, setImageError] = useState(false);

  const formattedDate = news.createdAt
    ? new Date(news.createdAt).toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '';

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link
        to={`/news/${news._id}`}
        className="block relative h-52 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200"
      >
        {news.image && !imageError ? (
          <img
            src={news.image}
            alt={news.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-blue-500">
            <FaNewspaper className="text-5xl mb-2" />
            <span className="text-sm font-semibold">Image Unavailable</span>
          </div>
        )}

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-700 text-xs font-bold uppercase px-3 py-2 rounded-full shadow-sm">
          {news.category}
        </span>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-blue-500" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <FaEye className="text-blue-500" />
            {news.views || 0} ভিউ
          </span>
        </div>

        <Link to={`/news/${news._id}`}>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
            {news.title}
          </h2>
        </Link>

        <p className="text-sm text-slate-500 leading-relaxed mt-3 line-clamp-3 min-h-[4rem]">
          {news.content}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs text-slate-500 min-w-0">
            <FaUser className="text-blue-500 shrink-0" />
            <span className="truncate">
              {news.author?.name || 'Unknown'}
            </span>
          </span>

          <Link
            to={`/news/${news._id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-indigo-700 transition shrink-0"
          >
            বিস্তারিত <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const News = () => {
  const { newsList, loading, fetchAllNews } = useNewsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || 'All';

    setCategory(cat);
    fetchAllNews(cat, search);
  }, [location.search, fetchAllNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllNews(category, search);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    fetchAllNews(selectedCategory, search);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800">
        <div className="absolute -top-24 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaNewspaper />
              Teko News Hub
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              Explore All <span className="text-cyan-300">News</span>
            </h1>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              দেশের ও বিশ্বের সর্বশেষ খবর, গুরুত্বপূর্ণ আপডেট এবং
              বিভিন্ন ক্যাটাগরির সংবাদ পড়ুন এক জায়গায়।
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Search & Filter */}
        <section className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 p-5 sm:p-7 mb-10 -mt-16 relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <FaFilter className="text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">
              খুঁজুন আপনার পছন্দের খবর
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-1 gap-2"
            >
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="খবরের শিরোনাম দিয়ে খুঁজুন..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 sm:px-7 rounded-xl font-semibold transition shadow-md shadow-blue-200"
              >
                খুঁজুন
              </button>
            </form>

            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full md:w-56 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
            >
              <option value="All">সব ক্যাটাগরি</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat === 'All' ? 'সব খবর' : cat}
              </button>
            ))}
          </div>
        </section>

        {/* News Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <div>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
              Latest Updates
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {category === 'All' ? 'সকল সংবাদ' : `${category} সংবাদ`}
            </h2>
          </div>

          <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
            {newsList.length} টি খবর
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">খবর লোড হচ্ছে...</p>
          </div>
        ) : newsList.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm py-20 px-5 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaNewspaper className="text-4xl text-blue-400" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              কোনো খবর পাওয়া যায়নি
            </h3>

            <p className="text-slate-500 mb-6">
              অন্য কোনো শব্দ দিয়ে সার্চ করুন অথবা ক্যাটাগরি পরিবর্তন করুন।
            </p>

            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                fetchAllNews('All', '');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              সব খবর দেখুন
            </button>
          </div>
        ) : (
          /* News Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
