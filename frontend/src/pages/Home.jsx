
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import {
  FaArrowRight,
  FaSearch,
  FaFire,
  FaClock,
  FaNewspaper,
  FaArrowUpRightFromSquare
} from 'react-icons/fa';

const categories = [
  'Politics',
  'Sports',
  'Technology',
  'Entertainment',
  'Business',
  'Health',
  'World'
];

const Home = () => {
  const {
    topNews,
    fetchTopNews,
    fetchAllNews,
    newsList
  } = useNewsStore();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTopNews();
    fetchAllNews();
  }, [fetchTopNews, fetchAllNews]);

  // Search existing homepage news without changing the API
  const filterNews = (news) => {
    if (!searchTerm.trim()) return news;

    const query = searchTerm.toLowerCase();

    return news.filter((item) =>
      [
        item.title,
        item.category,
        item.content
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  };

  const filteredTopNews = useMemo(
    () => filterNews(topNews),
    [topNews, searchTerm]
  );

  const filteredLatestNews = useMemo(
    () => filterNews(newsList).slice(0, 4),
    [newsList, searchTerm]
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br
        from-blue-700 via-indigo-700 to-violet-800
        px-4 py-20 md:py-28">

        {/* Background Decoration */}
        <div className="absolute -top-24 -left-20 w-80 h-80
          bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -right-20 w-96 h-96
          bg-purple-400/30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2
            px-4 py-2 mb-6 rounded-full
            bg-white/15 border border-white/20
            backdrop-blur-xl text-white text-sm">
            <FaNewspaper />
            <span>Your Daily News Destination</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl
            font-extrabold text-white tracking-tight mb-6">
            Teko News <span className="text-cyan-300">Hub</span>
          </h1>

          <p className="text-white/85 text-base md:text-xl
            max-w-2xl mx-auto mb-10 leading-relaxed">
            সত্যের সন্ধানে, প্রতিদিন। আপনার নির্ভরযোগ্য সংবাদ মাধ্যম।
            বিশ্বের সব গুরুত্বপূর্ণ খবর থাকুক আপনার হাতের মুঠোয়।
          </p>

          {/* GLASS SEARCH BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('top-news')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 p-2
              rounded-2xl bg-white/20
              backdrop-blur-2xl border border-white/30
              shadow-2xl shadow-black/10">

              <FaSearch className="text-white text-lg ml-3 shrink-0" />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="আপনি কোন খবর খুঁজছেন?"
                className="w-full min-w-0 bg-transparent
                  text-white placeholder-white/70
                  outline-none py-3 text-sm md:text-base"
              />

              <button
                type="submit"
                className="bg-white text-blue-700
                  px-5 md:px-7 py-3 rounded-xl
                  font-bold text-sm hover:bg-blue-50
                  transition shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-8">
            <Link
              to="/news"
              className="inline-flex items-center gap-2
                text-white font-semibold
                hover:text-cyan-200 transition"
            >
              সব খবর দেখুন <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>


      {/* CATEGORY MENU */}
      <section className="relative z-10 max-w-7xl mx-auto
        px-4 -mt-7">

        <div className="bg-white/75 backdrop-blur-2xl
          border border-white shadow-xl shadow-slate-900/5
          rounded-2xl p-4 md:p-5">

          <div className="flex items-center gap-2 mb-4">
            <FaNewspaper className="text-blue-600" />
            <h2 className="font-bold text-slate-800">
              খবরের ক্যাটাগরি
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2
            scrollbar-hide">

            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/news?category=${cat}`}
                className="shrink-0 px-5 py-2.5
                  rounded-xl bg-white/70
                  border border-slate-200/80
                  text-slate-600 text-sm font-semibold
                  hover:bg-blue-600 hover:text-white
                  hover:border-blue-600
                  hover:-translate-y-0.5
                  transition-all duration-300"
              >
                {cat}
              </Link>
            ))}

          </div>
        </div>
      </section>


      {/* TOP NEWS */}
      <section
        id="top-news"
        className="max-w-7xl mx-auto px-4 py-16"
      >

        <div className="flex justify-between items-end
          mb-8 border-b border-slate-200 pb-4">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaFire className="text-orange-500" />
              <span className="text-sm font-bold
                text-blue-600 uppercase tracking-wider">
                Featured Stories
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl
              font-extrabold text-slate-900">
              প্রধান খবর
              <span className="text-blue-600 text-lg ml-2">
                (Top 6)
              </span>
            </h2>
          </div>

          <Link
            to="/news"
            className="hidden sm:flex items-center gap-2
              text-blue-600 font-semibold
              hover:gap-3 transition-all"
          >
            সব দেখুন <FaArrowRight />
          </Link>

        </div>

        {filteredTopNews.length === 0 ? (
          <div className="text-center py-16
            bg-white rounded-2xl border border-slate-200">
            <FaSearch className="mx-auto text-3xl
              text-slate-300 mb-3" />
            <p className="text-slate-500">
              {searchTerm
                ? 'আপনার অনুসন্ধানের সাথে কোনো খবর মেলেনি।'
                : 'কোনো খবর পাওয়া যায়নি।'}
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-7">

            {filteredTopNews.map((news) => (

              <article
                key={news._id}
                className="group bg-white rounded-2xl
                  overflow-hidden border border-slate-200/70
                  shadow-sm hover:shadow-xl
                  hover:shadow-blue-900/10
                  hover:-translate-y-1
                  transition-all duration-300"
              >

                <Link
                  to={`/news/${news._id}`}
                  className="block relative overflow-hidden"
                >
                  <img
                    src={news.image || 'https://placehold.co/600x400?text=News'}
                    alt={news.title}
                    className="w-full h-56 object-cover
                      group-hover:scale-105
                      transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5
                      rounded-lg bg-white/85
                      backdrop-blur-lg text-blue-700
                      text-xs font-bold uppercase shadow-sm">
                      {news.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3
                    w-9 h-9 rounded-full bg-white/90
                    backdrop-blur-lg flex items-center
                    justify-center text-blue-600
                    opacity-0 group-hover:opacity-100
                    transition">
                    <FaArrowUpRightFromSquare />
                  </div>
                </Link>

                <div className="p-5">

                  <h3 className="text-lg font-bold
                    text-slate-900 leading-snug
                    line-clamp-2 group-hover:text-blue-700
                    transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-slate-500 text-sm
                    mt-3 leading-relaxed line-clamp-3">
                    {news.content}
                  </p>

                  <div className="flex justify-between
                    items-center mt-5 pt-4
                    border-t border-slate-100">

                    <Link
                      to={`/news/${news._id}`}
                      className="text-blue-600 font-bold
                        text-sm flex items-center gap-2
                        hover:gap-3 transition-all"
                    >
                      বিস্তারিত পড়ুন <FaArrowRight />
                    </Link>

                    <span className="text-xs text-slate-400">
                      <FaClock className="inline mr-1" />
                      News
                    </span>

                  </div>

                </div>
              </article>

            ))}

          </div>
        )}

      </section>


      {/* LATEST NEWS */}
      <section className="bg-gradient-to-b
        from-blue-50/70 to-slate-50 py-16">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between
            items-end mb-8">

            <div>
              <span className="text-blue-600 text-sm
                font-bold uppercase tracking-wider">
                Stay Updated
              </span>

              <h2 className="text-2xl md:text-3xl
                font-extrabold text-slate-900 mt-2">
                সাম্প্রতিক খবর
              </h2>
            </div>

            <Link
              to="/news"
              className="flex items-center gap-2
                text-blue-600 font-semibold
                hover:gap-3 transition-all"
            >
              সব খবর <FaArrowRight />
            </Link>

          </div>

          {filteredLatestNews.length === 0 ? (
            <p className="text-center py-10 text-slate-500">
              কোনো সাম্প্রতিক খবর পাওয়া যায়নি।
            </p>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2
              lg:grid-cols-4 gap-6">

              {filteredLatestNews.map((news) => (

                <Link
                  key={news._id}
                  to={`/news/${news._id}`}
                  className="group bg-white/75
                    backdrop-blur-xl rounded-2xl
                    overflow-hidden border border-white
                    shadow-md hover:shadow-xl
                    hover:-translate-y-1
                    transition-all duration-300"
                >

                  <div className="overflow-hidden">
                    <img
                      src={news.image || 'https://placehold.co/400x250?text=News'}
                      alt={news.title}
                      className="w-full h-44 object-cover
                        group-hover:scale-105
                        transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4">

                    <span className="text-xs font-bold
                      text-blue-600 uppercase">
                      {news.category}
                    </span>

                    <h3 className="font-bold text-slate-800
                      mt-2 line-clamp-2 leading-snug
                      group-hover:text-blue-600 transition">
                      {news.title}
                    </h3>

                    <div className="mt-4 flex items-center
                      justify-between text-blue-600 text-sm
                      font-semibold">
                      বিস্তারিত পড়ুন
                      <FaArrowRight />
                    </div>

                  </div>

                </Link>

              ))}

            </div>
          )}

        </div>
      </section>


      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="relative overflow-hidden
          rounded-3xl bg-gradient-to-r
          from-blue-700 to-indigo-700
          p-8 md:p-12 text-center">

          <div className="absolute -top-20 -right-10
            w-64 h-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl
              font-extrabold text-white mb-4">
              প্রতিদিনের খবর থাকুক আপনার হাতের মুঠোয়
            </h2>

            <p className="text-blue-100 mb-7">
              সর্বশেষ খবর জানতে আমাদের সাথে থাকুন।
            </p>

            <Link
              to="/news"
              className="inline-flex items-center gap-2
                bg-white text-blue-700 px-7 py-3
                rounded-xl font-bold
                hover:bg-blue-50 transition"
            >
              Explore News <FaArrowRight />
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
