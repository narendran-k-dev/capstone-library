module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      author:String,
      genre:String,
      date:Date,
      description: String,
    },
    { timestamps: true }
  );

  const Book = mongoose.model("Book", schema);
  return Book;
};