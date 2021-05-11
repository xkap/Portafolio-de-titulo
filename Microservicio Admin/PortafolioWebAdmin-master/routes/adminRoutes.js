// Rutas Admin
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// RUD Clientes
router.get('/customers', adminController.getCustomers);
router.get('/customers/:userId', adminController.getCustomer);
router.put('/customers/:userId', adminController.putCustomer);
router.delete('/customers/:userId', adminController.deleteCustomer);

// Waiters >> it should have been better /users/:roleId/...
router.get('/waiters', adminController.getWaiters);

// CRUD Productos
router.get('/products', adminController.getProducts);
router.get('/products/:productId', adminController.getProduct);
router.post('/products', adminController.postProduct);
router.put('/products/:productId', adminController.putProduct);
router.delete('/products/:productId', adminController.deleteProduct);

// CRUD Mesas
router.get('/tables', adminController.getTables);
router.get('/tables/:tableId', adminController.getTable);
router.post('/tables', adminController.postTable);
router.put('/tables/:tableId', adminController.putTable);
router.delete('/tables/:tableId', adminController.deleteTable);

// Ordenes de inventario

router.get('/inventory-orders', adminController.getInventoryOrders);
router.get('/inventory-orders/:orderId', adminController.getInventoryOrder);
router.put('/inventory-orders/:orderId', adminController.updateInventoryOrder);
router.get('/inventory-orders/products/:orderId', adminController.getInventoryOrderProducts);

module.exports = router;