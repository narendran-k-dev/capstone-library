const { body } = require('express-validator');

exports.reviewValidation = [
    body('rating').trim().notEmpty().withMessage('ratings cant be empty').isFloat({min:0 , max:5}).withMessage('rating cant be greater than 5 or less tahn zero '),
    body('comments').trim().notEmpty().withMessage('comments cant be empty')
]