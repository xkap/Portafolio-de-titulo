const sequelize = require('../util/database');

// Obtiene los meses en los que se registraron pagos

exports.payByCash = (req, res, next) => { 
    const orderId=req.params.orderId;   
    

    sequelize.query('CALL PayByCash(:p_order)', { replacements: { p_order: orderId} })
        .then(result => {
            res.status(200).json({ dailyIncome: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getIncomeDates = (req, res, next) => {    

    sequelize.query('CALL getIncomeDates()')
        .then(rows => {

            console.log(rows);
            res.status(200).json({ incomeDates: rows });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getDailyIncome = (req, res, next) => { 
    const month=req.params.month;   
    const year=req.params.year;

    sequelize.query('CALL getDailyIncome(:p_month,:p_year)', { replacements: { p_month: month,p_year:year} })
        .then(result => {
            res.status(200).json({ dailyIncome: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getCustomerOrders = (req, res, next) => {     

    sequelize.query('CALL getCustomerOrders()')
        .then(result => {
            res.status(200).json({ customerOrders: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getCustomerOrder = (req, res, next) => {     
    orderId= req.params.orderId;
    sequelize.query('CALL getCustomerOrder(:p_order)',{ replacements: { p_order: orderId} })
        .then(result => {
            res.status(200).json({ customerOrder: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getOrderItems = (req, res, next) => {     
    orderId= req.params.orderId;
    sequelize.query('CALL getOrderItems(:p_order)',{ replacements: { p_order: orderId} })
        .then(result => {
            res.status(200).json({ orderItems: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}