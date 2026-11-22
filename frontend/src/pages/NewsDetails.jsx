
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import {
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaArrowLeft,
  FaClock,
  FaNewspaper,
  FaShareAlt
} from 'react-icons/fa';

const NewsDetails = () => {
  const { id } = useParams();
  const { singleNews, loading, fetchSingleNews } = useNewsStore();
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSingleNews(id);
  }, [id, fetchSingleNews]);

  useEffect(() => {
    setImageError(false);
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: singleNews.title,
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">খবর লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!singleNews) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-lg max-w-md w-full">
          <FaNewspaper className="text-5xl text-blue-300 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            খবরটি পাওয়া যায়নি
          </h2>
          <p className="text-slate-500 mb-6">
            আপনি যে খবরটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaArrowLeft /> সব খবরে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(singleNews.createdAt).toLocaleDateString(
    'bn-BD',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition"
          >
            <FaArrowLeft />
            সব খবরে ফিরে যান
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-5">
            {singleNews.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-7">
            {singleNews.title}
          </h1>

          {/* Author & Meta Information */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-slate-200 py-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <FaUser />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">প্রকাশ করেছেন</p>
                <p className="text-sm font-bold text-slate-800">
                  {singleNews.author?.name || 'Unknown'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FaCalendarAlt className="text-blue-500" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FaEye className="text-blue-500" />
              <span>{singleNews.views || 0} ভিউ</span>
            </div>

            <button
              onClick={handleShare}
              className="ml-auto inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <FaShareAlt />
              {copied ? 'কপি হয়েছে!' : 'শেয়ার করুন'}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-64 sm:h-80 md:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-xl mb-10">
          {singleNews.image && !imageError ? (
            <img
              src={singleNews.image}
              alt={singleNews.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-blue-500">
              <FaNewspaper className="text-6xl mb-4" />
              <span className="font-semibold">Image Unavailable</span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 md:p-12">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">
            <FaNewspaper />
            <span>সম্পূর্ণ সংবাদ</span>
          </div>

          <div className="text-slate-700 text-base sm:text-lg leading-8 sm:leading-9 whitespace-pre-wrap break-words">
            {singleNews.content}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Teko News Hub - সত্য ও নির্ভরযোগ্য সংবাদ
            </p>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
            >
              <FaShareAlt />
              {copied ? 'কপি হয়েছে!' : 'সংবাদটি শেয়ার করুন'}
            </button>
          </div>
        </article>

        {/* Back to News */}
        <div className="text-center mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaArrowLeft />
            আরও সংবাদ পড়ুন
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NewsDetails;
