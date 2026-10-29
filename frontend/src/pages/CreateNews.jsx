import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

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
      toast.error(error.response?.data?.message || 'খবর পাবলিশ করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">নতুন খবর প্রকাশ করুন</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block font-medium mb-1">শিরোনাম (Title)</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="block font-medium mb-1">ক্যাটাগরি</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
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
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="block font-medium mb-1">বিস্তারিত বিবরণ (Content)</label>
          <textarea required rows="8" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
        </div>
        <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
          {loading ? 'পাবলিশ হচ্ছে...' : 'পাবলিশ করুন'}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;