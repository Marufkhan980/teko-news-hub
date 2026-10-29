import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-4xl font-bold mb-4">যোগাযোগ করুন</h1>
      <p className="text-gray-600 mb-8">কোনো প্রশ্ন বা পরামর্শ থাকলে আমাদের জানান।</p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-left space-y-4">
        <div>
          <label className="block font-medium mb-1">আপনার নাম</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block font-medium mb-1">ইমেইল</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block font-medium mb-1">বার্তা</label>
          <textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"></textarea>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800">বার্তা পাঠান</button>
      </form>
    </div>
  );
};

export default Contact;