const contoller = require('../controller/controller.book.js')
module.exports = app => {
    const route = require('express').Router();
    const bookPath = '/books'
    route.post(bookPath, contoller.addbook); 
    route.get(bookPath,contoller.findAllBooks);
    route.delete(`${bookPath}/:id`,contoller.deleteABook)
    route.put(`${bookPath}/:id`,contoller.updateBook)
    app.use('/api', route);
};
