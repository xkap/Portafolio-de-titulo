// Administration controller

const axios = require('axios');
const checkRoles = require('../util/checkRoles'); // archivo importado que tiene funciones para chequear cada rol


//Ordenes de Inventario
exports.getInventoryOrders = (req, res, next) => {

    axios.get(`${process.env.ADMIN}/inventory-orders`)
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
exports.getInventoryOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    axios.get(`${process.env.ADMIN}/inventory-orders/${orderId}`)
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

exports.getInventoryOrderProducts = (req, res, next) => {
    const orderId = req.params.orderId;
    axios.get(`${process.env.ADMIN}/inventory-orders/products/${orderId}`)
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

exports.putInventoryOrder = (req, res, next) => {

    const orderId = req.params.orderId;


    axios.put(`${process.env.ADMIN}/inventory-orders/${orderId}`)
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







// CLIENTES


// Obtener listado de cliente
exports.getCustomers = (req, res, next) => {
    axios.get(`${process.env.ADMIN}/customers`)
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

// Obtener un solo cliente
exports.getCustomer = (req, res, next) => {
    const userId = req.params.userId;

    axios.get(`${process.env.ADMIN}/customers/${userId}`)
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

exports.putCustomer = (req, res, next) => {

    const userId = req.params.userId;
    const [newEmail, newName, newLastName] = [req.body.newEmail, req.body.newName, req.body.newLastName];


    axios.put(`${process.env.ADMIN}/customers/${userId}`,
        {
            newEmail: newEmail,
            newName: newName,
            newLastName: newLastName
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

exports.deleteCustomer = (req, res, next) => {
    const userId = req.params.userId;

    axios.delete(`${process.env.ADMIN}/customers/${userId}`)
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





// Waiters
exports.getWaiters = (req, res, next) => {
    axios.get(`${process.env.ADMIN}/waiters`)
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








// Products
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

// Obtener un solo producto
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    axios.get(`${process.env.ADMIN}/products/${productId}`)
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

exports.postProduct = (req, res, next) => {
    const [name, quantity] = [req.body.name, req.body.quantity];


    axios.post(`${process.env.ADMIN}/products`,
        {
            name: name,
            quantity: quantity
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

exports.putProduct = (req, res, next) => {

    const productId = req.params.productId;
    const [name, quantity] = [req.body.name, req.body.quantity];


    axios.put(`${process.env.ADMIN}/products/${productId}`,
        {
            name: name,
            quantity: quantity
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

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;

    axios.delete(`${process.env.ADMIN}/products/${productId}`)
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






// MESAS

// Vista gestión de mesas
exports.getTablesView = (req, res, next) => {
    checkRoles.checkIfWaiter(req.roleId); // si no tiene el rol correcto lanza error
    next(); // continua a getTables pq son la misma ruta >> router.get('/tables')

    //res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getTables = (req, res, next) => {
    axios.get(`${process.env.ADMIN}/tables`)
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


exports.getTable = (req, res, next) => {
    const tableId = req.params.tableId;

    axios.get(`${process.env.ADMIN}/tables/${tableId}`)
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

exports.postTable = (req, res, next) => {
    const [capacity, isAvailable] = [req.body.capacity, req.body.isAvailable];


    axios.post(`${process.env.ADMIN}/tables`,
        {
            capacity: capacity,
            isAvailable: isAvailable
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
// Modificar mesa o asignarla a un usuario
exports.putTable = (req, res, next) => {

    const tableId = req.params.tableId;
    const [capacity, isAvailable, customerId, waiterId] = [req.body.capacity, req.body.isAvailable, req.body.customerId, req.body.waiterId];


    axios.put(`${process.env.ADMIN}/tables/${tableId}`,
        {
            // some fields can be null
            capacity: capacity,
            isAvailable: isAvailable,
            customerId: customerId,
            waiterId: waiterId
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

exports.deleteTable = (req, res, next) => {
    const tableId = req.params.tableId;

    axios.delete(`${process.env.ADMIN}/tables/${tableId}`)
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
