
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../api/axios';
import toast from 'react-hot-toast';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUser,
  FaEnvelope,
  FaLock,
  FaNewspaper,
  FaEye,
  FaCalendarAlt,
  FaChartLine,
  FaUserCircle,
  FaSave,
  FaPen
} from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Profile states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  // News states
  const [myNews, setMyNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyNews = async () => {
      try {
        const { data } = await api.get('/news/my');
        setMyNews(data);
      } catch (error) {
        console.error(error);
        toast.error('আপনার খবরগুলো লোড করা যায়নি');
      } finally {
        setLoadingNews(false);
      }
    };

    fetchMyNews();
  }, [user, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await api.put('/users/profile', {
        name,
        email,
        bio,
        password: password || undefined
      });

      toast.success('প্রোফাইল আপডেট হয়েছে! (রিফ্রেশ করুন)');
      setPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'আপডেট ব্যর্থ');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত এই খবরটি ডিলিট করতে চান?')) {
      try {
        await api.delete(`/news/${id}`);
        setMyNews((prevNews) =>
          prevNews.filter((news) => news._id !== id)
        );
        toast.success('খবর ডিলিট হয়েছে!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'ডিলিট করা যায়নি');
      }
    }
  };

  if (!user) return null;

  const totalViews = myNews.reduce(
    (total, news) => total + (news.views || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Dashboard Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute -top-24 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                <FaChartLine />
                Personal Dashboard
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
                Welcome, {user.name}!
              </h1>

              <p className="text-blue-100 text-base sm:text-lg">
                আপনার প্রোফাইল এবং প্রকাশিত সংবাদ পরিচালনা করুন।
              </p>
            </div>

            <Link
              to="/create-news"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold shadow-lg transition hover:-translate-y-1"
            >
              <FaPlus />
              নতুন খবর প্রকাশ করুন
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 -mt-16 relative z-10 mb-10">

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
              <FaNewspaper />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Published News
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800">
                {myNews.length}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
              <FaEye />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total News Views
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800">
                {totalViews.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center gap-5 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-2xl">
              <FaUserCircle />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium">
                Account Name
              </p>
              <h3 className="text-xl font-extrabold text-slate-800 truncate">
                {user.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Section */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl">
                    <FaUser />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Profile Settings
                    </h2>
                    <p className="text-blue-100 text-sm">
                      আপনার তথ্য আপডেট করুন
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-6 space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    নাম
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    ইমেইল
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    বায়ো (Bio)
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="3"
                    placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    নতুন পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ঐচ্ছিক"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    পাসওয়ার্ড পরিবর্তন করতে না চাইলে ফাঁকা রাখুন।
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md shadow-blue-200 transition disabled:opacity-50"
                >
                  <FaSave />
                  {updating ? 'আপডেট হচ্ছে...' : 'প্রোফাইল আপডেট করুন'}
                </button>
              </form>
            </div>
          </section>

          {/* My News Section */}
          <section className="lg:col-span-2">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
                  Content Management
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  আমার প্রকাশিত খবর
                </h2>
              </div>

              <Link
                to="/create-news"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition shadow-md shadow-blue-200"
              >
                <FaPlus />
                নতুন খবর
              </Link>
            </div>

            {loadingNews ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">
                  আপনার খবরগুলো লোড হচ্ছে...
                </p>
              </div>
            ) : myNews.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm py-16 px-6 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FaNewspaper className="text-4xl text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  এখনো কোনো খবর প্রকাশ করেননি
                </h3>

                <p className="text-slate-500 mb-6">
                  আপনার প্রথম সংবাদটি প্রকাশ করে শুরু করুন।
                </p>

                <Link
                  to="/create-news"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  <FaPlus />
                  প্রথম খবর প্রকাশ করুন
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myNews.map((news) => (
                  <article
                    key={news._id}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                            {news.category}
                          </span>

                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <FaCalendarAlt />
                            {new Date(news.createdAt).toLocaleDateString('bn-BD')}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug mb-3 line-clamp-2">
                          {news.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FaEye className="text-blue-500" />
                          {news.views || 0} ভিউ
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 sm:ml-4">
                        <Link
                          to={`/edit-news/${news._id}`}
                          title="Edit News"
                          aria-label="Edit News"
                          className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDeleteNews(news._id)}
                          title="Delete News"
                          aria-label="Delete News"
                          className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                          <FaTrash />
                        </button>

                        <Link
                          to={`/news/${news._id}`}
                          title="View News"
                          aria-label="View News"
                          className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
