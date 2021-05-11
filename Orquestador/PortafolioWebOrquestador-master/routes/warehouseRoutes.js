const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers//warehouseController');
const isAuth = require('../middleware/isAuth');


//Recipes
router.get('/recipes/menu', isAuth, warehouseController.getRecipesMenu);
router.get('/recipes/new', isAuth, warehouseController.getRecipesView);
router.get('/recipes', warehouseController.getRecipes);
router.post('/recipes', warehouseController.postRecipe);
router.put('/recipes/:recipeId',warehouseController.putRecipe);
router.delete('/recipes/:recipeId',warehouseController.deleteRecipe);
module.exports = router;

// Inventory Orders
router.get('/inventory-orders/:userId', isAuth, warehouseController.getInventoryOrdersView);
router.get('/inventory-orders/new', isAuth, warehouseController.getInventoryOrderForm);
router.get('/inventory-orders/:userId', warehouseController.getInventoryOrders);
router.get('/inventory-order/:orderId', warehouseController.getInventoryOrder);
router.post('/inventory-orders', warehouseController.postInventoryOrder);

// Order Products
router.get('/inventory-orders/products', isAuth, warehouseController.getInventoryOrdersView);
router.get('/inventory-orders/products/:orderId',isAuth,warehouseController.getOrderProducts);
router.put('/inventory-orders/products',warehouseController.putOrderProduct);
router.put('/inventory-orders',warehouseController.putOrderStatus);
router.delete('/inventory-orders/products/:orderId/:productId',warehouseController.deleteOrderProduct);
router.post('/inventory-orders/products',warehouseController.postOrderProduct);    


// Products
router.get('/products/menu', isAuth, warehouseController.getProductsMenuView);
router.get('/products',isAuth, warehouseController.getProductsView);
router.get('/products', warehouseController.getProducts);

module.exports = router;