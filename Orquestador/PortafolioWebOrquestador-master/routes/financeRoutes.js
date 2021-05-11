const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');
const isAuth = require('../middleware/isAuth');

router.get('/income', isAuth, financeController.getIncomeView);
router.get('/income', financeController.getIncomeDates);
router.get('/income/:month/:year', financeController.getDailyIncome);
router.get('/customer-orders', isAuth, financeController.getCustomerOrdersView);
router.get('/customer-orders', financeController.getCustomerOrders);
router.get('/customer-order/:orderId',isAuth, financeController.getCustomerOrderView);
router.get('/customer-order/:orderId', financeController.getCustomerOrder);
router.get('/customer-order/items/:orderId', financeController.getOrderItems);
router.post('/customer-orders/payment/cash/:orderId',financeController.payByCash);

module.exports = router;