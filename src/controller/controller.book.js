const db = require('../model');
const Book = db.Book;
exports.add = async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            description: req.body.description,
        })
        const data = await book.save()
        res.send(data)
    } catch (err) {
        res.status(400).send({
            message: err.message || "Error occurred while creating the Tutorial."
        });
    }
}