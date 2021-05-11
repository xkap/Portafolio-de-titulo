const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const InventoryOrderStatus = sequelize.define('InventoryOrderStatus', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
    })
  

module.exports = InventoryOrderStatus;