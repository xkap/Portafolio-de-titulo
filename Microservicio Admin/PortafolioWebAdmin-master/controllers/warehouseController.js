// Controlador Administrador

const sequelize = require('../util/database');


// Productos de Ordenes
exports.putOrderProduct = (req, res, next) => {
    const [order, product, quantity] = [req.body.order,req.body.product, req.body.quantity];

    sequelize.query('CALL updateProductQuantity(:p_order,:p_product, :p_quantity)', { replacements: { p_order: order,p_product:product, p_quantity: quantity } })
        .then(result => {
            res.status(201).json({ result: 'Producto de orden actualizado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}
exports.postOrderProduct = (req, res, next) => {
    const [order, product, quantity] = [req.body.order,req.body.product, req.body.quantity];

    sequelize.query('CALL addInventoryOrderProduct(:p_order,:p_product, :p_quantity)', { replacements: { p_order: order,p_product:product, p_quantity: quantity } })
        .then(result => {
            res.status(201).json({ result: 'Producto Insertado' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


exports.deleteOrderProduct = (req, res, next) => {
    const orderId = req.params.orderId; // se obtiene el ID de la URL dinamica /customers/:userId
    const productId = req.params.productId;

    sequelize.query('CALL deleteOrderProduct(:p_order, :p_product)', { replacements: { p_order: orderId, p_product:productId} })        
    .then(result => {
        console.log(result);
        res.status(201).json({ resultado: 'Producto eliminado de la orden' });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


exports.getOrderProducts = (req, res, next) => {
    const  orderId = req.params.orderId;
 
    sequelize.query('CALL getOrderProducts(:p_order)',{replacements: { p_order : orderId}})
        .then(rows => {
            
            console.log(rows);
            res.status(200).json({ OrderProducts: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.putOrderStatus = (req, res, next) => {
    const  orderId = req.body.orderId;
 
    sequelize.query('CALL sendToAdmin(:p_order)',{replacements: { p_order : orderId}})
    .then(result => {
        res.status(201).json({ result: 'Orden de inventario actualizada.' });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


// Ordenes de inventario
exports.getInventoryOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    sequelize.query('CALL getInventoryOrder(:p_order)',  { replacements: { p_order: orderId } })
        .then(result => {
            if (result.length === 0) { 
                const error = new Error('No existe la orden');
                error.statusCode = 404;
                throw error;
            }
            console.log(result);
            res.status(200).json({ inventoryOrder: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getInventoryOrders = (req, res, next) => {
    const userId = req.params.userId;
    sequelize.query('CALL getInventoryOrders(:p_user)', { replacements : { p_user : userId}})
        .then(rows => {
            if (rows.length === 0) { 
                const error = new Error('No existen ordenes de inventario');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ inventoryOrders: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.postInventoryOrders = (req, res, next) => {
    const [description, warehouseId] = [req.body.description, req.body.warehouseId];

    sequelize.query('CALL addInventoryOrder(:p_description, :p_warehouseId)', { replacements: { p_description: description, p_warehouseId: warehouseId } })
        .then(result => {
            res.status(201).json({ result: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}





// Recetas



exports.getRecipes = (req, res, next) => {
    sequelize.query('CALL getRecipes()')
        .then(rows => {
            if (rows.length === 0) {
                const error = new Error('No se encontraron recetas.');
                error.statusCode = 404;
                throw error;
            }
            console.log(rows);
            res.status(200).json({ recipes: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


exports.postRecipe  = (req, res, next) => {
    const [name, description, cookingTime, userId] = [req.body.name, req.body.description, req.body.cookingTime, req.body.userId];

    sequelize.query('CALL addRecipe(:p_name, :p_description, :p_cookingTime, :p_userId)', { replacements: { p_name: name, p_description:description, p_cookingTime:cookingTime, p_userId:userId } })
        .then(result => {
            res.status(201).json({ result: 'Receta agregada exitosamente' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.putRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId; 
    const [name, description, cookingTime] = [req.body.name, req.body.description, req.body.cookingTime];


  
    sequelize.query('CALL getRecipe(:p_id)', { replacements: { p_id: recipeId } })
        .then(row => {
            if (row.length === 0) { 
                const error = new Error('Receta no encontrada');
                error.statusCode = 404;
                throw error;
            }

            return sequelize.query('CALL updateRecipe(:p_id, :p_name, :p_description, :p_cookingTime)', { replacements: { p_id: recipeId, p_name: name, p_description: description, p_cookingTime:cookingTime } })
        })
        .then(result => {
            res.status(201).json({ result: 'Receta Actualizada' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}





exports.deleteRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId;


    sequelize.query('CALL getRecipe(:p_id)', { replacements: { p_id: recipeId } })
        .then(row => {
            if (row.length === 0) {
                const error = new Error('Receta no encontrada');
                error.statusCode = 404;
                throw error;
            }

            return sequelize.query('CALL deleteRecipe(:p_id)', { replacements: { p_id: recipeId } })
        })
        .then(result => {
            console.log(result);
            res.status(201).json({ resultado: 'Receta Eliminada' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}