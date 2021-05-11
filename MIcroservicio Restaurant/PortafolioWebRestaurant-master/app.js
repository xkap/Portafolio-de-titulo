// Admin microservice
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // middleware for handling multipart/form-data. Image cant be sent with JSON
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9092

// DB
const sequelize = require('./util/database');

// Config multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        let name = new Date().toISOString() + '-' + file.originalname;
        name = name.replace(/:/g, '') // se remueven los : pa q en windows no haya problemas 
        cb(null, name);
    }
})
// multer image filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')) // multer for multipart/form-data. Single because we only want to get a single file data which is called 'image' in the form. Don't forget the enctype="multipart/form-data" in your form. Images should be stored on a server not DB 


// Routes
const restaurantRoutes = require('./routes/restaurantRoutes');

// Models
const Orders = require('./models/OrdersModel');
const MenuItems = require('./models/menuItemsModel');
const OrderStatus = require('./models/OrderStatusModel');
const OrderDetails = require('./models/OrderDetailsModel');

// Setting the routes
app.use(restaurantRoutes);


app.get('/', (req, res, next) => {
    res.send('Hey from restaurant service');
})

// Sequelize tables associations (they do not really matter now because i manually created the tables)
Orders.belongsTo(OrderStatus, { as: 'status' });
MenuItems.belongsToMany(Orders, { through: OrderDetails, foreignKey: 'menuItemId' });
Orders.belongsToMany(MenuItems, { through: OrderDetails, foreignKey: 'orderId' });



sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(PORT);
        console.log("Listening on port: " + PORT)
    })
    .catch(err => {
        console.log(err);
    })
