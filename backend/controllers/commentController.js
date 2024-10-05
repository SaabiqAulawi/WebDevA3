const Comment = require('../models/Comment');

// Mendapatkan semua komentar
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Membuat komentar baru
exports.createComment = async (req, res) => {
  try {
    const { user_id, rate, drama_id, text } = req.body; // Pastikan untuk menggunakan user_id dan drama_id
    const newComment = await Comment.create({ user_id, rate, drama_id, text });
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Memperbarui komentar
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, rate, drama_id, text, status } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    await comment.update({ user_id, rate, drama_id, text, status });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Menghapus komentar
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
