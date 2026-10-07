const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}
Comment.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT },
    postId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER }
}, { sequelize, modelName: 'Comment' });

module.exports = Comment;