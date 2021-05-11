const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ProductCategories = sequelize.define('ProductCategories', {
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

module.exports = ProductCategories;