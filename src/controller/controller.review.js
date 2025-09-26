const db = require('../model');
const Review = db.Review;

exports.addreview = async (request, response) =>{
    try{
         const review = new Review({
            userID:request.body.userID,
            bookId: request.params.id,
            rating:request.body.rating,
            comments:request.body.comments
         })
         const data = await review.save()
         response.send(data)

    }catch(err){
        response.status(400).send({
            message:err.message || 'error while adding review '
        })
    }
}