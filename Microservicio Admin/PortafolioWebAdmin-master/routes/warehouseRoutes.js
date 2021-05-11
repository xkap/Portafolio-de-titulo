// Rutas Admin
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');



// CRUD Recetas
router.post('/recipes',warehouseController.postRecipe);
router.get('/recipes',warehouseController.getRecipes);
router.put('/recipes/:recipeId',warehouseController.putRecipe);
router.delete('/recipes/:recipeId',warehouseController.deleteRecipe);

// CRUD  Ordenes de inventario

router.get('/inventory-orders/:userId',warehouseController.getInventoryOrders);
router.get('/inventory-order/:orderId',warehouseController.getInventoryOrder);
router.post('/inventory-orders',warehouseController.postInventoryOrders);
router.put('/inventory-orders',warehouseController.putOrderStatus);


router.put('/inventory-orders/products', warehouseController.putOrderProduct);
router.post('/inventory-orders/products',warehouseController.postOrderProduct);
router.get('/inventory-orders/products/:orderId',warehouseController.getOrderProducts);
router.delete('/inventory-orders/products/:orderId/:productId',warehouseController.deleteOrderProduct);
module.exports = router;