
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import {
  FaArrowLeft,
  FaNewspaper,
  FaImage,
  FaLink,
  FaPen,
  FaGlobe,
  FaPaperPlane,
  FaEye
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

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Politics');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/news', { title, content, category, image });
      toast.success('খবর সফলভাবে পাবলিশ হয়েছে!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'খবর পাবলিশ করতে সমস্যা হয়েছে'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const inputStyle =
    'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium mb-6 transition"
        >
          <FaArrowLeft />
          Dashboard-এ ফিরে যান
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-7 md:p-10 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute right-32 -bottom-20 w-52 h-52 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-5">
              <FaNewspaper />
            </div>

            <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest mb-2">
              Teko News Hub
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
              নতুন খবর প্রকাশ করুন
            </h1>

            <p className="text-blue-100 max-w-xl leading-relaxed">
              আপনার খবর, তথ্য ও গুরুত্বপূর্ণ আপডেট পাঠকদের সঙ্গে শেয়ার করুন।
              সঠিক তথ্য দিয়ে একটি মানসম্মত সংবাদ তৈরি করুন।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* News Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 p-6 md:p-8 space-y-6"
            >
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-bold text-slate-800">
                  News Information
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  নিচের তথ্যগুলো পূরণ করে খবর প্রকাশ করুন।
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FaPen className="text-indigo-500" />
                  শিরোনাম (Title)
                </label>

                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="খবরের আকর্ষণীয় শিরোনাম লিখুন..."
                  className={inputStyle}
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FaGlobe className="text-indigo-500" />
                  ক্যাটাগরি (Category)
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputStyle}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FaImage className="text-indigo-500" />
                  ছবির লিংক (Image URL)
                  <span className="text-xs font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`${inputStyle} pl-11`}
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  সরাসরি ছবির URL ব্যবহার করুন।
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FaNewspaper className="text-indigo-500" />
                  বিস্তারিত বিবরণ (Content)
                </label>

                <textarea
                  required
                  rows="12"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="এখানে খবরের বিস্তারিত লিখুন..."
                  className={`${inputStyle} resize-y min-h-[220px] leading-7`}
                />
                <p className="text-xs text-slate-400 mt-2">
                  খবরের বিস্তারিত ও প্রয়োজনীয় তথ্য পরিষ্কারভাবে লিখুন।
                </p>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                  {loading ? 'পাবলিশ হচ্ছে...' : 'খবর পাবলিশ করুন'}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <FaEye className="text-indigo-500" />
                <h3 className="font-bold text-slate-800">
                  News Preview
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-100">
                {image ? (
                  <img
                    src={image}
                    alt="News preview"
                    className="w-full h-44 object-cover bg-slate-100"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-44 bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center text-indigo-400">
                    <FaImage className="text-4xl mb-2" />
                    <span className="text-sm">Image Preview</span>
                  </div>
                )}

                <div className="p-4">
                  <span className="inline-block text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full mb-3">
                    {category}
                  </span>

                  <h4 className="font-bold text-slate-800 text-lg leading-snug break-words">
                    {title || 'আপনার খবরের শিরোনাম এখানে দেখা যাবে'}
                  </h4>

                  <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-4 break-words">
                    {content || 'আপনার খবরের বিস্তারিত এখানে Preview হিসেবে দেখা যাবে।'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    By {user?.name || 'Author'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <h3 className="font-bold text-indigo-900 mb-2">
                <FaGlobe className="inline mr-2" />
                Publishing Tips
              </h3>
              <ul className="text-sm text-indigo-800/80 space-y-2 leading-relaxed">
                <li>• আকর্ষণীয় ও তথ্যবহুল শিরোনাম ব্যবহার করুন।</li>
                <li>• সঠিক ক্যাটাগরি নির্বাচন করুন।</li>
                <li>• নির্ভরযোগ্য তথ্য প্রকাশ করুন।</li>
                <li>• ছবির URL সঠিক কিনা যাচাই করুন।</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
