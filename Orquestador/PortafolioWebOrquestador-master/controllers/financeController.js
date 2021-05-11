
const axios = require('axios');
const checkRoles = require('../util/checkRoles'); 


exports.payByCash = (req, res, next) => {
    const orderId=req.params.orderId;  

    axios.post(`${process.env.ADMIN}/finance/customer-order/payment/cash/${orderId}`)
    .then(response => {
        console.log(response.data);
        res.status(201).json(response.data);
    })
    .catch(err => {
        console.log(err.response);
        if (err.response) {
            err.statusCode = err.response.status; 
        } else {
            err.statusCode = 500;
            next(err);
        }
    })
}

exports.getIncomeView = (req, res, next) => {
    checkRoles.checkIfFinance(req.roleId); 
    next();
}

exports.getIncomeDates = (req, res, next) => {

    axios.get(`${process.env.ADMIN}/finance/income/dates`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}

exports.getDailyIncome = (req, res, next) => {
    const month=req.params.month;   
    const year=req.params.year;

    axios.get(`${process.env.ADMIN}/finance/income/${month}/${year}`)
    .then(response => {
        console.log(response.data);
        res.status(201).json(response.data);
    })
    .catch(err => {
        console.log(err.response);
        if (err.response) {
            err.statusCode = err.response.status; 
        } else {
            err.statusCode = 500;
            next(err);
        }
    })
}

exports.getCustomerOrdersView = (req, res, next) => {
    checkRoles.checkIfFinance(req.roleId); 
    next();
}

exports.getCustomerOrders = (req, res, next) => {     
    orderId= req.params.orderId;
    axios.get(`${process.env.ADMIN}/finance/customer-orders`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
}


exports.getCustomerOrderView = (req, res, next) => {
    checkRoles.checkIfFinance(req.roleId); 
    next();
}
exports.getCustomerOrder = (req, res, next) => {     
    orderId= req.params.orderId;
    axios.get(`${process.env.ADMIN}/finance/customer-order/${orderId}`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
    
}

exports.getOrderItems = (req, res, next) => {     
    orderId= req.params.orderId;
    axios.get(`${process.env.ADMIN}/finance/customer-order/items/${orderId}`)
        .then(response => {
            console.log(response.data);

            res.status(201).json(response.data);
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                err.statusCode = err.response.status; 
            } else {
                err.statusCode = 500;
                next(err);
            }
        })
   
}