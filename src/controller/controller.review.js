const db = require('../model');
const Review = db.Review;

exports.addreview = async (request, response) => {
    try {
        const review = new Review({
            userID: request.body.userID,
            bookId: request.params.id,
            rating: request.body.rating,
            comments: request.body.comments
        })
        const data = await review.save()
        response.send(data)

    } catch (err) {
        response.status(400).send({
            message: err.message || 'error while adding review '
        })
    }
}

exports.getreview = async (request, response) => {
    const bookId = request.params.id;
    try {
        const reviews = await Review.find({ bookId }).populate('bookId');
        response.status(200).send(reviews);
    } catch (err) {
        response.status(500).send({
            message: err.message || 'Error retrieving reviews for this book'
        });
    }
}