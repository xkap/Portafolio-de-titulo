const { Sequelize } = require('sequelize');


// AGREGAR .env, ya hice commit con las creds por lo que quedo en el arbol del repo, ya la cague ahi xd. La repo sigue privada al menos
const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
    dialect: 'mysql',
    host: process.env.DBHOST,
    port: process.env.DBPORT || 3306
})


module.exports = sequelize;