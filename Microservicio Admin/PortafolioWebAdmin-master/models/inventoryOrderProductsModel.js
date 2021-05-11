
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const InventoryOrderProducts = sequelize.define('InventoryOrderProducts', {
    
    inventoryOrderId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'InventoryOrders',
            key: 'id'
        }
    },
    productId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity:{
      type: Sequelize.INTEGER,
      allowNull:false  
    }
    
    })
  

module.exports = InventoryOrderProducts;