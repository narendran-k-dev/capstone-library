
const { body } = require('express-validator');
const policy = new RegExp(process.env.PASSWORD_POLICY)
const pswderror = process.env.PASSWORD_POLICY_MSG;
exports.userValidator = [
    body('username').trim().notEmpty().withMessage('username cant be empty').isString('username must be a string ').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('email').trim().notEmpty().withMessage('email cant be empty').isEmail().withMessage('please follow standard email formats').normalizeEmail(),
    body('password').trim().notEmpty().withMessage('password cant be empty').matches(policy)
        .withMessage(pswderror),
]