const bookcontoller = require('../controller/controller.book.js');
const reviewcontroller = require('../controller/controller.review.js');
const { bookValidation } = require('../util/bookValidator.js');
const { validator } = require('../middleware/validators.js');
const { reviewValidation } = require('../util/reviewValidator.js');
const userController = require('../controller/controller.user.js')
const adminControl = require('../controller/controller.admin.js')
const { userValidator } = require('../util/userValidator.js')
const auth = require('../middleware/jwtvalidator.js')
const rateLimiter = require('../util/rateLimiter.js');
const { updatebookvalidation } = require('../util/updatebookvalidator.js');

module.exports = app => {
    const route = require('express').Router();
    const bookPath = '/books';

    route.post('/register', userValidator, validator, userController.registerUser);
    route.post(bookPath, auth, bookValidation, validator, bookcontoller.addbook);
    route.post(`${bookPath}/:id/review`, auth, reviewValidation, validator, reviewcontroller.addreview)
    route.post(`/user/:userid/book/:bookid/image`,bookcontoller.uploadImage)

    route.get('/login', rateLimiter, userController.loginUser)
    route.get(`${bookPath}/:id/review`, auth, reviewcontroller.getreview)
    route.get(`${bookPath}/:value`,auth, bookcontoller.findInBooks)
    route.get(bookPath, auth, bookcontoller.findAllBooks);
    route.get('/profile/:id', userController.viewprofie);
    route.get('/admin/users',auth, adminControl.viewAllUsers),

    route.delete(`${bookPath}/:id`, auth, bookcontoller.deleteABook)
    route.delete(`${bookPath}/review/:id`, auth, reviewcontroller.deleteAReview)
    route.delete('/admin/reviews/:id', adminControl.deleteReview)
 
    route.put(`${bookPath}/:id`, auth, updatebookvalidation, validator, bookcontoller.updateBook)
    route.put(`${bookPath}/reviews/:id`, auth, reviewcontroller.updateReviews)
    route.put('/profile/:id',auth, userController.updateProfile);

    app.use('/api', route);
};
