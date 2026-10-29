import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { topNews, fetchTopNews, fetchAllNews, newsList } = useNewsStore();

  useEffect(() => {
    fetchTopNews();
    fetchAllNews();
  }, [fetchTopNews, fetchAllNews]);

  return (
    <div>
      {/* Section 1: Hero Section */}
      <section className="bg-primary text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Teko News Hub</h1>
        <p className="text-lg md:text-xl mb-8">সত্যের সন্ধানে, প্রতিদিন। আপনার নির্ভরযোগ্য সংবাদ মাধ্যম।</p>
        <Link to="/news" className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          সব খবর দেখুন
        </Link>
      </section>

      {/* Section 2: Top 6 News */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-dark">প্রধান খবর (Top 6)</h2>
          <Link to="/news" className="text-primary flex items-center gap-1 hover:underline">
            সব দেখুন <FaArrowRight />
          </Link>
        </div>
        {topNews.length === 0 ? (
          <p className="text-center text-gray-500">কোনো খবর পাওয়া যায়নি।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((news) => (
              <div key={news._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={news.image || 'https://via.placeholder.com/400x200?text=News'} alt={news.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-bold text-primary uppercase">{news.category}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{news.content}</p>
                  <Link to={`/news/${news._id}`} className="text-primary mt-4 inline-block font-medium hover:underline">বিস্তারিত পড়ুন</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Categories */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">ক্যাটাগরি অনুযায়ী খবর</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'].map((cat) => (
              <Link key={cat} to={`/news?category=${cat}`} className="bg-white px-6 py-3 rounded-full shadow hover:bg-primary hover:text-white transition">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Latest News */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-dark mb-6 border-b pb-2">সাম্প্রতিক খবর</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newsList.slice(0, 4).map((news) => (
            <div key={news._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
               <img src={news.image || 'https://via.placeholder.com/300x200?text=News'} alt={news.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-bold line-clamp-2">{news.title}</h3>
                <Link to={`/news/${news._id}`} className="text-sm text-primary mt-2 block hover:underline">পড়ুন</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;