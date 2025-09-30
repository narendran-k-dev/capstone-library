const db = require('../model');
const Book = db.Book;
const User = db.User;

module.exports = verifyOwnership = async (reques, resposne, next) => {
    const id = req.params.id;
    const userid = req.body.userid
    try {

        if (!id || !userid) {
            return resposne.status(400).send({
                message: 'Id is missing '
            })
        }
        const newUser = await User.findById(userid)
        const newBook = await Book.findById(id)


        if (newUser.role === 'admin' || newUser._id.equals(newBook.createdById)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied: not the owner' });
        }
    } catch (err) {
        resposne.status(400).send({
            message: err.message || 'error while checking user access control'
        })
    }
}