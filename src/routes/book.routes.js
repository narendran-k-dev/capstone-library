const contoller = require('../controller/controller.book.js')
module.exports = app => {
    const route = require('express').Router();
    route.post('/books', contoller.add); 
    app.use('/api', route);
};
