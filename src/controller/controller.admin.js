const db = require('../model')
const User = db.User;
const Review = db.Review;

exports.viewAllUsers = async (request, response) => {
    const id = request.body.id;
    const newUser = await User.findById(id);
    if (!newUser) {
        return response.status(404).send({ message: 'cant validate ur id , please check ' })
    }
    if (newUser && newUser.role === 'admin') {
        const data = await User.find()
        if (data.length < 0) {
            return response.status(400).send({ message: 'oops no user created yet' });
        }
        else {
            return response.status(200).send(data)
        }
    }
    else {
        return response.status(403).send({ message: 'sorry u have to be an admin to access this page ' });

    }
}
exports.deleteReview = async (request, response) => {
    const id = request.body.id;
    const reviewId = request.params.id

    const newUser = await User.findById(id);
    if (!newUser) {
        return response.status(404).send({ message: 'cant validate ur id , please check ' })
    }
    if (newUser && newUser.role === 'admin') {
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
    }
    else {
        return response.status(403).send({ message: 'sorry u have to be an admin to access this page ' });

    }
}