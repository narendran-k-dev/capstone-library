const contoller = require('../controller/controller.book.js');
const { bookValidation } = require('../util/bookValidator.js');
const { validator } = require('../middleware/validators.js')
module.exports = app => {
    const route = require('express').Router();
    const bookPath = '/books'
    route.post(bookPath,bookValidation,validator, contoller.addbook);
    route.get(bookPath, contoller.findAllBooks);
    route.delete(`${bookPath}/:id`, contoller.deleteABook)
    route.put(`${bookPath}/:id`, contoller.updateBook)
    app.use('/api', route);
};
