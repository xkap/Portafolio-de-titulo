// Auth Microservice. 
require('dotenv').config(); // .env files

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4001

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const financeRoutes = require('./routes/financeRoutes');

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware necesario para la Autenticación
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res, next) => {
    res.send('Hey from orquestador');
})

// Using the routes
app.use('/api/v1', restaurantRoutes); // ritas generales del restaurant y casi todo
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/warehouse', warehouseRoutes);
app.use('/api/v1/finance', financeRoutes);

const server = app.listen(PORT, function () {
    console.log('Orchestrator running on port: '+PORT);
})

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  //Se deja en el contexto de la app el socket
  app.set('io',io);


