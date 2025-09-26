const { body } = require('express-validator');
const db = require('../model');

const Book = db.Book;
const allowedGenres = ['Action & Adventure', 'Mystery', 'Fantasy', 'Science Fiction', 'Romance', 'Historical Fiction'];
const date = new Date();
const year = date.getFullYear();

exports.bookValidation = [
    body('title').trim().notEmpty().withMessage('Book title cant be empty').isLength({ max: 1000 }).withMessage('Title cannot be longer than 1000 characters').custom(async title => {
        let finder = title.trim();
        try {
            const existing = await Book.findOne({ title: finder }).collation({ locale: 'en', strength: 2 }).exec();
            if (existing) {
                throw new Error('Title already exists!');
            }
        } catch (err) {
            throw err;
        }
    }),
    body('author').trim().notEmpty().withMessage('author cant be empty').isLength({ max: 1000 })
        .withMessage('Title cannot be longer than 1000 characters'),
    body('genre').trim().notEmpty().withMessage('gener cant be empty').isIn(allowedGenres).withMessage(`Genre must be one of: ${allowedGenres.join(', ')} `),
    body('publishedDate').trim().notEmpty().withMessage('date cant be empty').isISO8601().withMessage('date should be in yyyy-mm-dd format').custom(async date => {
        let inputdate = new Date(date);
        let todaysdate = new Date();
        console.log(inputdate, "input date");
        console.log(todaysdate, "today date ")
        try {
            if (inputdate > todaysdate) {
                throw new Error('date cant be greater than todays date ')
            }
        }
        catch (err) {
            throw err;
        }
    })
]

