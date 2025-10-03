const db = require('../model');
const Review = db.Review;
const User = db.User;

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
        const reviews = await Review.find({ bookId });
        console.log(reviews.length)
        if (reviews.length === 0) {
            response.status(400).send({
                message: ' oops no reviews found'
            })
        }
        response.status(200).send(reviews);

    } catch (err) {
        response.status(500).send({
            message: err.message || 'Error retrieving reviews for this book'
        });
    }
}

exports.deleteAReview = async (request, response) => {
    if (!request.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    try {
        const reviewId = request.params.id;
        const userid = request.body.userid;
        const newUser = await User.findById(userid)
        const newReview = await Review.findById(reviewId)


        if ((newUser.role === 'admin') || newUser._id.equals(newReview.userID)) {

            Review.findByIdAndDelete(reviewId, { useFindAndModify: false }).then(data => {
                if (!data) {
                    response.status(404).send({
                        message: `Cannot delete review with id=${reviewId}. `
                    });
                } else {
                    response.send({
                        message: "review deleted successfully!"
                    });
                }
            })

        } else {
            response.status(403).send({
                message: 'sorry u either have to be admin or the creater of this review to delete it '
            })
        }
    } catch (err) {
        response.status(400).send({ message: err.message || 'error while deleting review ' })
    }

}

exports.updateReviews = async (request, response) => {
    const id = request.params.id;
    const userid = request.body.userID
    const newUser = await User.findById(userid)
    const newReview = await Review.findById(id)
    console.log(newUser, 'asdasdasd')
    if (!request.body) {
        return response.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    if (newUser.role === 'admin' || newUser._id.equals(newReview.userID)) {

        Review.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    response.status(404).send({
                        message: `Cannot update review with id=${id}.  review not found!`
                    });
                } else response.send({ message: "review updated successfully." });
            })
            .catch(err => {
                response.status(400).send({
                    message: err.message || "Error updating review  with id=" + id
                });
            });
    }
    else {
        response.status(403).send({
            message: 'sorry u either have to be admin or the creater of this review to edit it '
        })
    }
};