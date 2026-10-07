const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { 
        type: DataTypes.STRING, 
        unique: true, 
        validate: { isEmail: true } // 1. Built-in email validation
    },
    password: { 
        type: DataTypes.STRING,
        validate: {
            checkPasswordLength(value) { // 2. Custom password validation
                if (value.length <= 6) throw new Error('Password length must be greater than 6 characters');
            }
        }
    },
    role: { type: DataTypes.ENUM('user', 'admin') }
}, {
    hooks: {
        beforeCreate: (user) => { // 3. beforeCreate hook for name length
            if (user.name && user.name.length <= 2) {
                throw new Error('Name must be greater than 2 characters');
            }
        }
    }
});

module.exports = User;