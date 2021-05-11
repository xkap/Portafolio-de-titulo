const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const InventoryOrders = sequelize.define('InventoryOrders', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    warehouseId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
    ,
    statusId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'InventoryOrderStatuses',
            key: 'id'
        }
    }
    })
  

module.exports = InventoryOrders;