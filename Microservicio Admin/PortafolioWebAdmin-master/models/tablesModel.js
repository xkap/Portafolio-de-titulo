// Modelo Mesas
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Table = sequelize.define('Table', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    customerId: { // FK
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    waiterId: { // FK 2
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
    /* SE ELIMINA PQ NO ES NORMALIZADO QUE EXISTA UN CAMPO PARA INDICAR SI ESTA OCUPADA LA MESA TENIENDO LOS IDs PARA ESO
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },*/
})

module.exports = Table;