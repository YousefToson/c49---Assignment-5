const { Post, User, Comment, sequelize } = require('../models');

exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body); // using new instance
        await post.save(); // using save
        res.json({ message: "Post created successfully." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body; // get user id from body to check ownership
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found." });
    if (post.userId !== userId) return res.status(403).json({ message: "You are not authorized to delete this post." });
    
    await post.destroy();
    res.json({ message: "Post deleted." });
};

exports.getPostDetails = async (req, res) => {
    const posts = await Post.findAll({
        attributes: ['id', 'title'],
        include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Comment, attributes: ['id', 'content'] }
        ]
    });
    res.json(posts);
};

exports.getPostCommentCount = async (req, res) => {
    const posts = await Post.findAll({
        attributes: [
            'id', 'title',
            [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount']
        ],
        include: [{ model: Comment, attributes: [] }],
        group: ['Post.id']
    });
    res.json(posts);
};