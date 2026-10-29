const express = require('express');
const router = express.Router();
const { getTopNews, getAllNews, getNewsById, createNews, updateNews, deleteNews, getMyNews } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/top', getTopNews);
router.get('/my', protect, getMyNews);
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;