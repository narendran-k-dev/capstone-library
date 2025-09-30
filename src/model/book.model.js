module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      author:String,
      genre:String,
      publishedDate :Date,
      description: String,
      createdById:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      }
    },
    { timestamps: true }
  );

  const Book = mongoose.model("Book", schema);
  return Book;
};