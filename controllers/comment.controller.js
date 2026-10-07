const { Comment, User, Post } = require('../models');
const { Op } = require('sequelize');

exports.bulkCreateComments = async (req, res) => {
    await Comment.bulkCreate(req.body);
    res.json({ message: "comments created." });
};

exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    const comment = await Comment.findByPk(commentId);
    
    if (!comment) return res.status(404).json({ message: "comment not found." });
    if (comment.userId !== userId) return res.status(403).json({ message: "You are not authorized to update this comment." });
    
    comment.content = content;
    await comment.save();
    res.json({ message: "Comment updated." });
};

exports.findOrCreateComment = async (req, res) => {
    const { postId, userId, content } = req.body;
    const [comment, created] = await Comment.findOrCreate({
        where: { postId, userId, content },
        defaults: { postId, userId, content }
    });
    res.json({ comment, created });
};

exports.searchComments = async (req, res) => {
    const { word } = req.query;
    const { count, rows } = await Comment.findAndCountAll({
        where: { content: { [Op.like]: `%${word}%` } }
    });
    if (count === 0) return res.status(404).json({ message: "no comments found." });
    res.json({ count, comments: rows });
};

exports.getNewestComments = async (req, res) => {
    const comments = await Comment.findAll({
        where: { postId: req.params.postId },
        order: [['createdAt', 'DESC']],
        limit: 3,
        attributes: ['id', 'content', 'createdAt']
    });
    res.json(comments);
};

exports.getCommentDetails = async (req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
        attributes: ['content'],
        include: [
            { model: User, attributes: ['name', 'email'] },
            { model: Post, attributes: ['title', 'content'] }
        ]
    });
    if (!comment) return res.status(404).json({ message: "no comment found" });
    res.json(comment);
};