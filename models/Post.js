const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}
Post.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER }
}, { 
    sequelize, 
    modelName: 'Post',
    paranoid: true // 1. Apply soft-delete
});

module.exports = Post;