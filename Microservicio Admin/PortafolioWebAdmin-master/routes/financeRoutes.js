// Rutas Admin
const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');


router.get('/income/dates', financeController.getIncomeDates);
router.get('/income/:month/:year', financeController.getDailyIncome);

router.get('/customer-orders', financeController.getCustomerOrders);
router.get('/customer-order/:orderId', financeController.getCustomerOrder);
router.get('/customer-order/items/:orderId', financeController.getOrderItems);

router.post('/customer-order/payment/cash/:orderId', financeController.payByCash);


module.exports = router;