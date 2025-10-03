module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userID: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', 
      },
      rating: Number,
      comments: String
    },
    { timestamps: true }
  );

  const Review = mongoose.model("Review", schema);
  return Review;
};