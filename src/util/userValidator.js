const { body } = require('express-validator');

const lowercase = new RegExp(process.env.PASSWORD_LOWERCASE);
const uppercase = new RegExp(process.env.PASSWORD_UPPERCASE);
const number = new RegExp(process.env.PASSWORD_NUMBER);
const special = new RegExp(process.env.PASSWORD_SPECIAL);
const minLength = parseInt(process.env.PASSWORD_MIN_LENGTH, 10);

exports.userValidator = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username can’t be empty')
        .isString().withMessage('Username must be a string')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email can’t be empty')
        .isEmail().withMessage('Please follow standard email formats')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password can’t be empty')
        .isLength({ min: minLength }).withMessage(process.env.PASSWORD_ERROR_MINLENGTH)
        .matches(lowercase).withMessage(process.env.PASSWORD_ERROR_LOWERCASE)
        .matches(uppercase).withMessage(process.env.PASSWORD_ERROR_UPPERCASE)
        .matches(number).withMessage(process.env.PASSWORD_ERROR_NUMBER)
        .matches(special).withMessage(process.env.PASSWORD_ERROR_SPECIAL),
];
