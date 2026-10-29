const User = require('../models/User');

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.bio = req.body.bio ?? user.bio;
    user.avatar = req.body.avatar ?? user.avatar;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, bio: updated.bio, avatar: updated.avatar, role: updated.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile };