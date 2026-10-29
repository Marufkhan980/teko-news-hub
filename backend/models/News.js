const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    content: { type: String, required: [true, 'Content is required'] },
    category: { type: String, required: [true, 'Category is required'], enum: ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'] },
    image: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);