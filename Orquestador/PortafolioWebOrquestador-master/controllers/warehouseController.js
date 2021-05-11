// Administration controller

const axios = require('axios');
const checkRoles = require('../util/checkRoles'); // archivo importado que tiene funciones para chequear cada rol
// Productos de Ordenes


exports.putOrderProduct = (req, res, next) => {

    const [order, product, quantity] = [req.body.order, req.body.product, req.body.quantity]


    axios.put(`${process.env.ADMIN}/warehouse/inventory-orders/products`,
    {
        order:order,
        product:product,
        quantity:quantity
    })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}
exports.postOrderProduct = (req, res, next) => {
    const [order, product, quantity] = [req.body.order, req.body.product, req.body.quantity];


    axios.post(`${process.env.ADMIN}/warehouse/inventory-orders/products`,
        {
            order:order,
            product:product,
            quantity:quantity
        })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}


exports.deleteOrderProduct = (req, res, next) => {
    const orderId = req.params.orderId; 
    const productId = req.params.productId;

    axios.delete(`${process.env.ADMIN}/warehouse/inventory-orders/products/${orderId}/${productId}`)
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}

exports.putOrderStatus = (req, res, next) => {

    const orderId = req.body.orderId;


    axios.put(`${process.env.ADMIN}/warehouse/inventory-orders`,
    {
        orderId:orderId
    })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}

exports.getOrderProductsView = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); 
    next();
}

exports.getOrderProducts = (req, res, next) => {
    const orderId = req.params.orderId;
    axios.get(`${process.env.ADMIN}/warehouse/inventory-orders/products/${orderId}`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}
//Ordenes de inventario

exports.getInventoryOrdersView= (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); 
    
    next();
}
exports.getInventoryOrderForm = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); // si no tiene el rol correcto lanza error
    res.status(200).send('Bodeguero autorizado con ID: ' + req.userId);
}

exports.getInventoryOrder = (req, res, next) =>{
    const orderId = req.params.orderId;
    axios.get(`${process.env.ADMIN}/warehouse/inventory-order/${orderId}`)
        .then(response => {

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}

exports.getInventoryOrders = (req, res, next) => {
    const userId = req.params.userId;
    axios.get(`${process.env.ADMIN}/warehouse/inventory-orders/${userId}`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}

exports.postInventoryOrder = (req, res, next) => {
    const [description, warehouseId] = [req.body.description, req.body.warehouseId];


    axios.post(`${process.env.ADMIN}/warehouse/inventory-orders`,
        {
            description:description,
            warehouseId: warehouseId
        })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}



// PRODUCTOS

exports.getProductsMenuView = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); // si no tiene el rol correcto lanza error
    res.status(200).send('Bodeguero autorizado con ID: ' + req.userId);
}

exports.getProductsView = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); // si no tiene el rol correcto lanza error
    next();
}





exports.getProducts = (req, res, next) => {
    axios.get(`${process.env.ADMIN}/products`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}




// RECETAS

//Vista

exports.getRecipesMenu = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); // si no tiene el rol correcto lanza error
    res.status(200).send('Bodeguero autorizado con ID: ' + req.userId);
}

exports.getRecipesView = (req, res, next) => {
    checkRoles.checkIfWarehouse(req.roleId); // si no tiene el rol correcto lanza error
    res.status(200).send('Bodeguero autorizado con ID: ' + req.userId);
}


//CRUD
exports.getRecipes = (req, res, next) => {
    axios.get(`${process.env.ADMIN}/warehouse/recipes`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}


exports.postRecipe = (req, res, next) => {
    const [name, description, cookingTime, userId] = [req.body.name, req.body.description, req.body.cookingTime, req.body.userId];  

    axios.post(`${process.env.ADMIN}/warehouse/recipes`,
        {
            name: name,
            description: description,
            cookingTime: cookingTime,
            userId: userId
        })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}


exports.putRecipe = (req, res, next) => {

    const recipeId = req.params.recipeId;
    const [name, description, cookingTime] = [req.body.name, req.body.description, req.body.cookingTime];


    axios.put(`${process.env.ADMIN}/warehouse/recipes/${recipeId}`,
        {
            name: name,
            description: description,
            cookingTime: cookingTime
        })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}

exports.deleteRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId;

    axios.delete(`${process.env.ADMIN}/warehouse/recipes/${recipeId}`)
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}