const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Book = require("./book.model.js")(mongoose);
db.Review = require("./review.model.js")(mongoose);
module.exports = db;