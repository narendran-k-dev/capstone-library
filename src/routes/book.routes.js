const bookcontoller = require('../controller/controller.book.js');
const reviewcontroller = require('../controller/controller.review.js');
const { bookValidation } = require('../util/bookValidator.js');
const { validator } = require('../middleware/validators.js');
const { reviewValidation } = require('../util/reviewValidator.js');
const userController = require('../controller/controller.user.js')
const { userValidator } = require('../util/userValidator.js')
const auth = require('../middleware/jwtvalidator.js')
const rateLimiter = require('../util/rateLimiter.js')

module.exports = app => {
    const route = require('express').Router();
    const bookPath = '/books';

    route.post('/register', userValidator, validator, userController.registerUser);
    route.post(bookPath,auth, bookValidation, validator, bookcontoller.addbook);
    route.post(`${bookPath}/:id/review`,auth, reviewValidation, validator, reviewcontroller.addreview)

    route.get('/login', rateLimiter,userController.loginUser)
    route.get(`${bookPath}/:id/review`,auth, reviewcontroller.getreview)
    route.get(bookPath,auth, bookcontoller.findAllBooks);

    route.delete(`${bookPath}/:id`,auth, bookcontoller.deleteABook)

    route.put(`${bookPath}/:id`,auth, bookcontoller.updateBook)

    app.use('/api', route);
};
