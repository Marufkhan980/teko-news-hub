import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get(`/news/${id}`);
        if (data.author._id !== user?._id) {
          toast.error('আপনি এই খবরটি এডিট করার অনুমতি রাখেন না!');
          navigate('/dashboard');
          return;
        }
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setImage(data.image || '');
      } catch (error) {
        toast.error('খবর লোড করা যায়নি');
      }
    };
    fetchNews();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/news/${id}`, { title, content, category, image });
      toast.success('খবর আপডেট হয়েছে!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">খবর এডিট করুন</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block font-medium mb-1">শিরোনাম</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block font-medium mb-1">ক্যাটাগরি</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="World">World</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">ছবির লিংক (ঐচ্ছিক)</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block font-medium mb-1">বিস্তারিত বিবরণ</label>
          <textarea required rows="8" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
        <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
          {loading ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
        </button>
      </form>
    </div>
  );
};

export default EditNews;