const { body } = require('express-validator');
const db = require('../model');

const Book = db.Book;
const allowedGenres = ['Action & Adventure', 'Mystery', 'Fantasy', 'Science Fiction', 'Romance', 'Historical Fiction'];
const normalizedGenres = allowedGenres.map(g => g.toLowerCase());
const date = new Date();

exports.updatebookvalidation = [
    body('title').isLength({ max: 1000 }).withMessage('Title cannot be longer than 1000 characters').custom(async title => {
        let finder = title?.trim();
        try {
            const existing = await Book.findOne({ title: finder }).collation({ locale: 'en', strength: 2 }).exec();
            if (existing) {
                throw new Error('Title already exists!');
            }
        } catch (err) {
            throw err;
        }
    }),
    body('author').isLength({ max: 1000 })
        .withMessage('Title cannot be longer than 1000 characters'),
    body('genre').optional({ checkFalsy: true }).toLowerCase().isIn(normalizedGenres).withMessage(`Genre must be one of: ${allowedGenres.join(', ')} `),
    body('publishedDate').optional({ checkFalsy: true }).isISO8601().withMessage('date should be in yyyy-mm-dd format').custom( date => {
        let inputdate = new Date(date);
        let todaysdate = new Date();
        try {
            if (inputdate > todaysdate) {
                throw new Error('Date must not exceed todays date.')
            }
        }
        catch (err) {
            throw err;
        }
    })
]

