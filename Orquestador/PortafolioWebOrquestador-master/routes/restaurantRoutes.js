// Restaurant Routes
const express = require('express');
const router = express.Router();
const multer = require('multer');

// filtro para imagenes temporales MULTER
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tempImages');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: fileStorage });
const restaurantController = require('../controllers/restaurantController');
const isAuth = require('../middleware/isAuth');// isAuth es un middleware que se ejecuta antes para verificar el token y si está autenticado el usuario o si tiene Autorización para acceder a ese recurso

// Middleware que se ejecuta para TODAS las rutas
router.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path)
    next()
})


// Rutas vistas reservas para ver si se le carga la pag al usuario o no
router.get('/reservations/menu', isAuth, restaurantController.getReservationsMenu)
router.get('/reservations/new', isAuth, restaurantController.getNewReservation);
router.get('/reservations/cancel', isAuth, restaurantController.getCancelReservation);
// CRD Reservas
router.get('/reservations', restaurantController.getReservations);
router.get('/reservations/today', restaurantController.getTodayReservations);
router.post('/reservations', restaurantController.postReservation);
router.get('/reservations/:userId', restaurantController.getReservation);
router.delete('/reservations/:userId', restaurantController.deleteReservation);



// CRUD Menu
router.get('/menu', restaurantController.getMenuItems);
router.get('/menu/images', restaurantController.getMenuItemsImages);
router.post('/menu', restaurantController.postMenuItem);
router.post('/menu/images', upload.single('image'), restaurantController.postMenuItemImage); // TODO: mover al admi
// MenuItem Images uploaded separately as multipart/form-data. Data in JSON
router.get('/menu/images/:menuItemId', restaurantController.getMenuItemImage); // lo dinamico :Id al final siempre!
router.get('/menu/:menuItemId', restaurantController.getMenuItem);
router.delete('/menu/:menuItemId', restaurantController.deleteMenuItem);


// Rutas vistas ordenes
router.get('/orders/menu', isAuth, restaurantController.getOrdersMenu);
router.get('/orders/new', isAuth, restaurantController.getNewOrder)
router.get('/orders/:userId/payments', isAuth, restaurantController.getPayOrder);
router.get('/orders', restaurantController.getOrders);
router.get('/orders/:userId', restaurantController.getOrder);
router.put('/orders/:userId', restaurantController.putOrderExtra);
router.patch('/orders/:userId', restaurantController.patchOrder)
router.post('/orders', restaurantController.postOrder);


// Payments
router.post('/orders/:userId/payments', restaurantController.postPayment);





router.get('/orders/:orderId', restaurantController.getOrder);
router.get('/orders/close/:orderId', restaurantController.closeCustomerOrder);
router.get('/orders/pay/:orderId', restaurantController.requestPayment);

module.exports = router;