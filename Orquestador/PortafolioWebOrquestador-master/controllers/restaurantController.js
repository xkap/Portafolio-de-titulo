// Controlador restaurante

// Toda API REST debe enviar siempre el código HTTP de respuesta dependiendo el resultado de esta. Por ej: 201 se creó algo, 403 Forbidden, 200 OK, etc

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data'); // node no incluye form-data para hacer requests por defecto
const AdmZip = require('adm-zip');
const checkRoles = require('../util/checkRoles'); // archivo importado que tiene funciones para chequear cada rol
const Reservation = require('../models/reservationsModel');
const MenuItem = require('../models/menuItemModel');





/*const io = require('../app.js').io;


io.on('connection', function(socket) {
    io.emit('addition of connected user', socket.id);

    const username = (socket.id).toString().substr(0, 5);
    const roomname = `room ${username}`;
    socket.join(roomname);
    console.log('user connected to', roomname);

    const time = (new Date).toLocaleTimeString();
    
    socket.json.send({
        'event': 'connected',
        'time': time,
        'socketId': socket.id,
        'message': `Hello, ${username}! Please ask me anything you want`,
    });
});*/

// RESERVAS
// Vistas Reservas
exports.getReservationsMenu = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);
    res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getNewReservation = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);
    res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getCancelReservation = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);

    axios.get(`${process.env.RESTAURANT}/reservations/${req.userId}`)
        .then(response => {
            console.log(response.data);

            res.status(200).json(response.data);
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

// Endpoints reservas
exports.getReservations = (req, res, next) => {
    axios.get(`${process.env.RESTAURANT}/reservations`)
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

exports.getTodayReservations = (req, res, next) => {
    axios.get(`${process.env.RESTAURANT}/reservations/today`)
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

exports.getReservation = (req, res, next) => {
    const userId = req.params.userId;

    axios.get(`${process.env.RESTAURANT}/reservations/${userId}`)
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

exports.postReservation = (req, res, next) => {
    const reservation = new Reservation(req.body.reservationDate, req.body.reservationTime, req.body.party, req.body.userId);
    reservation.email = req.body.email; // adding the user email too

    axios.post(`${process.env.RESTAURANT}/reservations`,
        reservation)
        .then(response => {
            res.status(201).json(response.data);
            //Se obtiene del contexto de la app el socket
            const io = req.app.get('io');
            //Se envía a todas las conexiones un evento
            io.emit('newReservation', reservation)
            console.log("Socket msg enviado")
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

exports.deleteReservation = (req, res, next) => {
    const userId = req.params.userId;
    const email = req.query.email; // adding the user email too

    axios.delete(`${process.env.RESTAURANT}/reservations/${userId}?email=${email}`)
        .then(response => {

            res.status(201).json(response.data);
            const io = req.app.get('io');
            io.emit('newReservation', "");

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









// Menu
exports.getMenuItems = (req, res, next) => {
    axios.get(`${process.env.RESTAURANT}/menu`)
        .then(response => {
            //console.log(response.data);

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

// Mandando zip de imagenes
exports.getMenuItemsImages = (req, res, next) => {
    axios.get(`${process.env.RESTAURANT}/menu/images`, { responseType: 'stream' }) // Tiene que ser stream !! arraybuffer no sirve aca pq se tiene que seguir anidando. Como es objecto Stream se puede usar pipe() para pasar el output como input a la response
        .then(response => {
            //console.log(response.data);
            response.data.pipe(res); // Se anida el zip y se devuelve

            //res.status(201).sendFile(response.data); // NO SE PUEDE

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


exports.getMenuItem = (req, res, next) => {
    const menuItemId = req.params.menuItemId;

    axios.get(`${process.env.RESTAURANT}/menu/${menuItemId}`)
        .then(response => {
            //console.log(response.data);

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

// se obtiene aparte la img ya que como JSON no se puede
exports.getMenuItemImage = (req, res, next) => {
    const menuItemId = req.params.menuItemId;
    axios.get(`${process.env.RESTAURANT}/menu/images/${menuItemId}`, { responseType: 'stream' }) // como 'stream' se recibe la img pa que funcione
        .then(response => {
            response.data.pipe(res);

            //res.status(201).json(response.data);
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

// Middleware para subir la imagen por separado!! No se puede mandar por JSON asique se sube separada como multipart/form-data y se guarda en una tabla el path. La imagen se guardar en el servidor por temas de performance y lo que se guarda es la ruta
// Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
exports.postMenuItemImage = (req, res, next) => {
    const image = req.file; // no es req.body!! req.file pq es un archivo que adjunta multer, multer se encarga de lo otro
    console.log(req.file);
    const imagePath = image.path; // multer path is saved

    const data = new FormData(); // se mandan los datos como form data pq las imagenes por json no van
    data.append('image', fs.createReadStream(imagePath)) // la imagen viene como buffer asiq se almacena primero y luego se obtiene del fs


    axios.post(`${process.env.RESTAURANT}/menu/images`, data,
        {
            // importante especificar el tipo de content y el boundary al final para que funcione
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        }
    )
        .then(response => {
            fs.unlink(imagePath, (err) => { // borrando del fs la img temporal!
                if (err) {
                    throw err;
                }
                console.log("Imagen Temporal Eliminada.");
            });
            res.status(201).json(response.data);
        })
        .catch(err => {
            //console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}

// La imagen se sube por separada porque no se puede por JSON. EL id de la img se pasa luego a este POST
exports.postMenuItem = (req, res, next) => {
    const menuItem = new MenuItem(req.body.name, req.body.description, req.body.price, req.body.isAvailable, req.body.categoryId, req.body.imageId);
    console.log(menuItem);


    axios.post(`${process.env.RESTAURANT}/menu`, menuItem)
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })


}

exports.deleteMenuItem = (req, res, next) => {
    const menuItemId = req.params.menuItemId;

    axios.delete(`${process.env.RESTAURANT}/menu/${menuItemId}`)
        .then(response => {
            res.status(204).json(response.data);
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

// Orders

exports.getOrdersMenu = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);
    res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getNewOrder = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);
    res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getPayOrder = (req, res, next) => {
    checkRoles.checkIfCustomer(req.roleId);

    // Verificando q el ID del usuario sea el correcto
    if (req.userId !== req.params.userId) {
        const error = new Error('Usuario con otro ID al que se quiere acceder')
        error.statusCode = 403; // Forbidden
        throw error;
    }

    res.status(200).send('Cliente autorizado con ID: ' + req.userId);
}

exports.getOrders = (req, res, next) => {
    axios.get(`${process.env.RESTAURANT}/orders`)
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

exports.getOrder = (req, res, next) => {
    const userId = req.params.userId;

    axios.get(`${process.env.RESTAURANT}/orders/${userId}`)
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

exports.postOrder = (req, res, next) => {
    const order = req.body.order;
    const userId = req.body.userId;
    const io = req.app.get('io');
            
    //res.status(201).send('aaa')
    axios.post(`${process.env.RESTAURANT}/orders`,
        {
            userId: userId,
            order: order
        })
        .then(response => {
            res.status(201).json(response.data);
            //message to cooks app
            io.emit('newOrder', "");
        })
        .catch(err => {
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}


exports.putOrderExtra = (req, res, next) => {
    const order = req.body.order;
    const userId = req.params.userId;

    //res.status(201).send('aaa')
    axios.put(`${process.env.RESTAURANT}/orders/${userId}`,
        {
            order: order
        })
        .then(response => {
            res.status(201).json(response.data);
            const io = req.app.get('io');
            //Se envía a todas las conexiones un evento
            io.emit('extraOrder', userId)
        })
        .catch(err => {
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}

exports.patchOrder = (req, res, next) => {
    const userId = req.params.userId;
    const attributes = req.body;


    //res.status(201).send('aaa')
    axios.patch(`${process.env.RESTAURANT}/orders/${userId}`, attributes)
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}






//PYAMENTS

exports.postPayment = (req, res, next) => {
    const userId = req.params.userId;
    const email = req.body.email;
    const paymentType = req.body.paymentType;
    const tip = req.body.tip;



    axios.post(`${process.env.RESTAURANT}/orders/${userId}/payments`,
        {
            email: email,
            paymentType: paymentType,
            tip: tip
        })
        .then(response => {
            res.status(201).json(response.data);
        })
        .catch(err => {
            if (err.response) {
                err.statusCode = err.response.status;
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}














exports.requestPayment = (req, res, next) => {
    const orderId = req.params.orderId;

    axios.get(`${process.env.RESTAURANT}/orders/pay/${orderId}`)
        .then(response => {
            //console.log(response.data);

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

exports.closeCustomerOrder = (req, res, next) => {
    const orderId = req.params.orderId;

    axios.get(`${process.env.RESTAURANT}/orders/close/${orderId}`)
        .then(response => {
            //console.log(response.data);

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




