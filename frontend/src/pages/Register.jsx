import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      toast.success('রেজিস্ট্রেশন সফল হয়েছে!');
      navigate('/');
    } else {
      toast.error(error || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">রেজিস্টার করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">নাম</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50">
            {loading ? 'অপেক্ষা করুন...' : 'রেজিস্টার'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে? <Link to="/login" className="text-primary hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;