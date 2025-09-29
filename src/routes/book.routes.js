const bookcontoller = require('../controller/controller.book.js');
const reviewcontroller = require('../controller/controller.review.js');
const { bookValidation } = require('../util/bookValidator.js');
const { validator } = require('../middleware/validators.js')
module.exports = app => {
    const route = require('express').Router();
    const bookPath = '/books'
    route.post(bookPath,bookValidation,validator, bookcontoller.addbook);
    route.post(`${bookPath}/:id/review`,reviewcontroller.addreview)
    route.get(`${bookPath}/:id/review`,reviewcontroller.getreview)
    route.get(bookPath, bookcontoller.findAllBooks);
    route.delete(`${bookPath}/:id`, bookcontoller.deleteABook)
    route.put(`${bookPath}/:id`, bookcontoller.updateBook)
    app.use('/api', route);
};
