import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
      await api.put('/users/profile', { name, email, bio, password: password || undefined });
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
        setMyNews(myNews.filter((n) => n._id !== id));
        toast.success('খবর ডিলিট হয়েছে!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'ডিলিট করা যায়নি');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Profile Update */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">প্রোফাইল তথ্য</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">নাম</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">ইমেইল</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">বায়ো (Bio)</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">নতুন পাসওয়ার্ড (ঐচ্ছিক)</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="পরিবর্তন না করতে চাইলে ফাঁকা রাখুন" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <button type="submit" disabled={updating} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800">
                {updating ? 'আপডেট হচ্ছে...' : 'প্রোফাইল আপডেট করুন'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: My News */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">আমার প্রকাশিত খবর</h2>
            <Link to="/create-news" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800">
              <FaPlus /> নতুন খবর
            </Link>
          </div>
          
          {loadingNews ? (
            <p>লোড হচ্ছে...</p>
          ) : myNews.length === 0 ? (
            <p className="text-gray-500 bg-white p-4 rounded-lg shadow text-center">আপনি এখনো কোনো খবর প্রকাশ করেননি।</p>
          ) : (
            <div className="space-y-4">
              {myNews.map((news) => (
                <div key={news._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{news.title}</h3>
                    <span className="text-sm text-gray-500">{news.category} • {new Date(news.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/edit-news/${news._id}`} className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 rounded"><FaEdit /></Link>
                    <button onClick={() => handleDeleteNews(news._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;