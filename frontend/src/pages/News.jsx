import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useNewsStore from '../store/newsStore';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">সব খবর</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 flex-grow">
          <input type="text" placeholder="খবর খুঁজুন..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">খুঁজুন</button>
        </form>
        <select value={category} onChange={(e) => { setCategory(e.target.value); fetchAllNews(e.target.value, search); }} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="All">সব ক্যাটাগরি</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
          <option value="World">World</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-xl">লোড হচ্ছে...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">কোনো খবর পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <div key={news._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={news.image || 'https://via.placeholder.com/400x200?text=News'} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-bold text-primary uppercase">{news.category}</span>
                <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{news.content}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/news/${news._id}`} className="text-primary font-medium hover:underline">বিস্তারিত পড়ুন</Link>
                  <span className="text-sm text-gray-500">লেখক: {news.author?.name || 'Unknown'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;