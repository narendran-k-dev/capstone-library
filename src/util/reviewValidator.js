const { body } = require('express-validator');

exports.reviewValidation = [
    body('rating').trim().notEmpty().withMessage('ratings cant be empty').isFloat({max:5}).withMessage('rating cant be greater than 5 '),
    body('comments').trim().notEmpty().withMessage('comments cant be empty')
]