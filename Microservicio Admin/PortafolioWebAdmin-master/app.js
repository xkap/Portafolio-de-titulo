// Admin microservice
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3003

// DB
const sequelize = require('./util/database');

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const adminRoutes = require('./routes/adminRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const financeRoutes = require('./routes/financeRoutes');
// Setting the routes
app.use('/admin', adminRoutes);
app.use('/admin/warehouse',warehouseRoutes);
app.use('/admin/finance',financeRoutes);


app.get('/', (req, res, next) => {
    res.send('Hey from Admin service');
})

sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })
