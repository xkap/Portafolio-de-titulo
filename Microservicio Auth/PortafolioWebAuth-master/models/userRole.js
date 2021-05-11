const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserRole = sequelize.define('UserRole', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = UserRole;