const express = require('express');
const { sequelize } = require('./models');

// Controllers
const userCtrl = require('./controllers/user.controller');
const postCtrl = require('./controllers/post.controller');
const commentCtrl = require('./controllers/comment.controller');

const app = express();
app.use(express.json());

// User Routes
app.post('/users/signup', userCtrl.signup);
app.put('/users/:id', userCtrl.createOrUpdate);
app.get('/users/by-email', userCtrl.findByEmail);
app.get('/user/:id', userCtrl.findById);

// Post Routes
app.post('/posts', postCtrl.createPost);
app.delete('/posts/:postId', postCtrl.deletePost);
app.get('/posts/details', postCtrl.getPostDetails);
app.get('/posts/comment-count', postCtrl.getPostCommentCount);

// Comment Routes
app.post('/comments', commentCtrl.bulkCreateComments);
app.patch('/comments/:commentId', commentCtrl.updateComment);
app.post('/comments/find-or-create', commentCtrl.findOrCreateComment);
app.get('/comments/search', commentCtrl.searchComments);
app.get('/comments/newest/:postId', commentCtrl.getNewestComments);
app.get('/comments/details/:id', commentCtrl.getCommentDetails);

// Sync Database and Start Server
sequelize.sync({ alter: true }).then(() => {
    console.log('Database connected and synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log(err));