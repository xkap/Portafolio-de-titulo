// Controlador Microservicio Autenticación
const User = require('../models/userModel');
const axios = require('axios');

// Toda API REST debe enviar siempre el código HTTP de respuesta dependiendo el resultado de esta. Por ej: 201 se creó algo, 403 Forbidden, 200 OK, etc. Los 2xx son siempre de exito, si los uso para error no funcioonara
// Además, como hay microservicios, los errores se deben de volver a modificar en el catch(), sino se mandarian errores 500 siempre. Por ej, el login manda un 401 si esque esta mal la contraseña o el usuario, eso se debe de especificar de nuevo en el statusCode para que al front le llegue el codigo correcto.

exports.postSignup = (req, res, next) => {
    const user = new User(req.body.email, req.body.username, req.body.password, req.body.name, req.body.lastName); // TODO: Deestructure!

    // Accediendo al microservicio de autenticación para registro
    axios.post(`${process.env.AUTH}/signup`, user)
        .then(response => {
            console.log(response);
            res.status(201).json(response.data); // response.data para que no haya problemas con el JSON

        })
        .catch(err => {//  TODO: Change catching blocks to keep nesting the errors
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

exports.postLogin = (req, res, next) => {
    const user = { username: req.body.username, password: req.body.password }; // TODO: Deestructure!

    // Lo mismo que registro
    axios.post(`${process.env.AUTH}/login`, user)
        .then(response => {
            console.log(response.data);
            res.status(201).json(response.data); // response.data para que no haya problemas con el JSON

        })
        .catch(err => { //  TODO: Change catching blocks to keep nesting the errors
            console.log(err.response);
            if (err.response) { // si hay respuesta, sino se cayo el servicio
                err.statusCode = err.response.status; // se modifica el codigo del error porque el frontend va a recibir esto, sino sería un 500 siempre
                next(err);
            } else {
                err.statusCode = 500;
                next(err);
            }
        })

}