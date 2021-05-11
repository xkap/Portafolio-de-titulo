const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'ProductCategories',
            key: 'id'
        }    
        
    }

})

module.exports = Product;