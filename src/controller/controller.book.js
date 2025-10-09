const db = require('../model');
const Book = db.Book;
const User = db.User;
const uploadFileMiddleware = require('../middleware/filemanagement.js')
const path = require('path')
exports.addbook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.date,
      description: req.body.description,
      createdById: req.body.createdById,

    })
    const data = await book.save()
    res.send(data)
  } catch (err) {
    res.status(400).send({
      message: err.message || "Error occurred while creating the book."
    });
  }
}
exports.findAllBooks = (req, res) => {
  Book.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};
exports.findInBooks = async (req, res) => {
  const value = req.params.value;
  try {
    const result = await Book.find({
      $or: [
        { title: new RegExp(value, 'i') },
        { author: new RegExp(value, 'i') },
        { genre: new RegExp(value, 'i') },
        { description: new RegExp(value, 'i') }
      ]
    });

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: 'Oops, no book found' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while searching book'
    });
  }
};

exports.deleteABook = async (req, res) => {
  const id = req.params.id;
  const userid = req.body.userid
  const newUser = await User.findById(userid)
  const newBook = await Book.findById(id)
  if (newUser.role === 'admin' || newUser._id.equals(newBook.createdById)) {
    Book.findByIdAndDelete(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        } else {
          res.send({
            message: "Book was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err.message || "Could not delete book with id=" + id
        });
      });
  }
  else {
    res.status(403).send({
      message: 'sorry u either have to be admin or the creater of this book to delete it '
    })
  }

}
exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const userid = req.body.userid
  const newUser = await User.findById(userid)
  const newBook = await Book.findById(id)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  if (newUser.role === 'admin' || newUser._id.equals(newBook.createdById)) {

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found!`
          });
        } else res.send({ message: "Book was updated successfully." });
      })
      .catch(err => {
        res.status(400).send({
          message: err.message || "Error updating Book with id=" + id
        });
      });
  }
  else {
    res.status(403).send({
      message: 'sorry u either have to be admin or the creater of this book to edit it '
    })
  }
};

exports.uploadImage = async (request, response) => {
  const bookid = request.params.bookid;
  const userid = request.params.userid;
  const newBook = await Book.findById(bookid)
  const newuser = await User.findById(userid)

  try {
    if (!newBook) {
      return response.status(404).send({
        message: 'book not available please check id'
      })
    }
    if (!newuser) {
      return response.status(404).send({
        message: 'user cant be validated please check id '
      })
    }
    const bookownerid = newBook.createdById;
    if (userid === bookownerid || newuser.role === 'admin') {
      await uploadFileMiddleware(request, response).then((data) => {
        response.status(200).send({
          message: 'image uploaded successsfully'
        })
      })
    } else {
      response.status(403).send({
        message: 'sry u dont access for this route , u either have to be admin or owner of the book'
      })
    }

  } catch (err) {
    response.status(400).send({
      message: err.message || ' error while uploading image'
    })
  }
}

exports.downloadImage = async (request , response ) =>{
  try{
    const bookId = request.params.bookId;
    const imageId = request.params.imageId;
    const filePath = path.join(__dirname, '../../resource', bookId, imageId);
    console.log(filePath)
     response.sendFile(filePath, err => {
        if (err) {
            response.status(404).send('Image not found');
        }
    });
  }catch (err){
    response.status(400).send({
      message:err.message || 'error while downlading image'
    })
  }
}