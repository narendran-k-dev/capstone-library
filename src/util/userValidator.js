
const { body } = require('express-validator');
exports.userValidator = [
    body('username').trim().notEmpty().withMessage('username cant be empty').isString('username must be a string ').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('email').trim().notEmpty().withMessage('email cant be empty').isEmail().withMessage('please follow standard email formats').normalizeEmail(),
    body('password').trim().notEmpty().withMessage('password cant be empty').isLength({ min: 8 }).withMessage('minimum 8 charecters required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
]