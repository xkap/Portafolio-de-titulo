// Modelo Recetas
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Recipe = sequelize.define('Recipe', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cookingTime:{
      type: Sequelize.DOUBLE,
      allowNull:false  
    },
    userId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
    })
  

module.exports = Recipe;