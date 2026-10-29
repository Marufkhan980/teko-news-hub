const News = require('../models/News');

const getTopNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(6).populate('author', 'name');
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    const total = await News.countDocuments(query);
    const news = await News.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).populate('author', 'name');
    res.json({ news, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name email');
    if (!news) return res.status(404).json({ message: 'News not found' });
    news.views += 1;
    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    if (!title || !content || !category) return res.status(400).json({ message: 'Title, content and category are required' });
    const news = await News.create({ title, content, category, image: image || '', author: req.user._id });
    const populated = await news.populate('author', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized to edit this news' });
    const { title, content, category, image } = req.body;
    news.title = title ?? news.title;
    news.content = content ?? news.content;
    news.category = category ?? news.category;
    news.image = image ?? news.image;
    const updated = await news.save();
    const populated = await updated.populate('author', 'name');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized to delete this news' });
    await news.deleteOne();
    res.json({ message: 'News removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTopNews, getAllNews, getNewsById, createNews, updateNews, deleteNews, getMyNews };