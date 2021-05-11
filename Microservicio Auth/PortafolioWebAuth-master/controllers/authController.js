// Controlador Microservicio Autenticación
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Encryption
const jwt = require('jsonwebtoken'); // JWT Tokens
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // setting the sendGrid email api key

// Toda API REST debe enviar siempre el código HTTP de respuesta dependiendo el resultado de esta. Por ej: 201 se creó algo, 403 Forbidden, 200 OK, etc

// Registro de Usuario
exports.postSignup = (req, res, next) => {
    // TODO: Deestructure
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const roleId = 1;


    // email body
    const msg = {
        to: email,
        from: 'portafolio_caso3@hotmail.com', // Use the email address or domain you verified above
        subject: 'Usuario Registrado',
        text: 'Usuario Registrado',
        html: `
        <html>
            <body style="border: 1px solid black; padding: 10px;">
                <h1>Usuario Registrado</h1>
                <br>
                <h3>Se ha registrado en el restaurante. ¡Bienvenido!</h3>
                <br>
                <p><i>Restaurante Siglo XXI</i></p>
            </body>
        </html>
        `,
    };



    // VALIDAR QUE NO EXISTA EL USERNAME
    User.findOne({
        where: { username: username }
    }).then(user => {
        // Si ya existe el usuario, error
        if (user) {
            const error = new Error('El nombre de usuario ya existe');
            error.statusCode = 401;
            throw error;
        }

        // Si no existe Se transforma en hash la contraseña y se agrega a la DB. Promesas anidadas pq o sino se ejecutarían los then() siguientes
        return bcrypt
            .hash(password, 12) // 2do param es la longitud del SALT para añadirle mayor seguridad.
            .then(hashedPw => {
                return User.create({ // Método Sequelize que inserta un usuario. Devuelve Promesa por eso el return
                    email: email,
                    username: username,
                    password: hashedPw,
                    name: name,
                    lastName: lastName,
                    roleId: roleId
                });
            })
            .then(result => {
                //seding the email
                (async () => {
                    try {
                        await sgMail.send(msg);
                    } catch (error) {
                        console.error(error);

                        if (error.response) {
                            console.error(error.response.body)
                        }
                    }
                })();
                res.status(201).json({ message: 'User created!', userId: result.id }); // Si se crea el usuario se manda JSON con mensaje e ID
            })
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}


// Login Usuario
exports.postLogin = (req, res, next) => {
    // TODO: Deestructure
    const username = req.body.username;
    const password = req.body.password;
    let loadedUser; // Usuario cargado de la BD


    // Sequelize. Se va a buscar un solo usuario a la BD que tenga el mismo username
    User.findOne({
        where:
            { username: username }
    })
        .then(user => {
            if (!user) { // En caso de no encontrar ninguno, se lanza excepción
                const error = new Error('No se han encontrado usuarios con el nombre de usuario ingresado');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            console.log(user);
            return bcrypt.compare(password, user.password); // Se comparan contraseña ingresada con hash almacenado
        })
        .then(isEqual => { // SI las contraseñas no son iguales, excepción
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // Sino, se crea TOKEN para el usuario. Los campos que quiero que tenga el token se asignan acá
            const token = jwt.sign(
                {
                    username: loadedUser.username,
                    userId: loadedUser.id.toString(),
                    roleId: loadedUser.roleId.toString(),
                    email: loadedUser.email.toString()
                },
                'llavetoken',
                { expiresIn: '6h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.id.toString(), roleId: loadedUser.roleId.toString(), email: loadedUser.email.toString() }); // Se devuelve JSON con token e ID de usuario
        })
        .catch(err => {

            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}