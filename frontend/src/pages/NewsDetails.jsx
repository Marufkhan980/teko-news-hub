import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import { FaEye, FaUser, FaCalendarAlt } from 'react-icons/fa';

const NewsDetails = () => {
  const { id } = useParams();
  const { singleNews, loading, fetchSingleNews } = useNewsStore();

  useEffect(() => {
    fetchSingleNews(id);
  }, [id, fetchSingleNews]);

  if (loading) return <div className="text-center py-20 text-xl">লোড হচ্ছে...</div>;
  if (!singleNews) return <div className="text-center py-20 text-xl">খবরটি পাওয়া যায়নি।</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/news" className="text-primary mb-4 inline-block hover:underline">&larr; সব খবরে ফিরে যান</Link>
      <img src={singleNews.image || 'https://via.placeholder.com/800x400?text=News'} alt={singleNews.title} className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-6" />
      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold uppercase">{singleNews.category}</span>
      <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4">{singleNews.title}</h1>
      
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
        <span className="flex items-center gap-2"><FaUser /> {singleNews.author?.name || 'Unknown'}</span>
        <span className="flex items-center gap-2"><FaCalendarAlt /> {new Date(singleNews.createdAt).toLocaleDateString()}</span>
        <span className="flex items-center gap-2"><FaEye /> {singleNews.views} ভিউ</span>
      </div>

      <div className="prose max-w-none text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
        {singleNews.content}
      </div>
    </div>
  );
};

export default NewsDetails;