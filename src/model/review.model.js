module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userID: Number,
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