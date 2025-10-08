const util = require('util');
const fs = require('fs');
const multer = require('multer');
const path = require('path')

const MAX_SIZE = 20 * 1024 *1024

const storage = multer.diskStorage({
    destination:(request,file,cb)=>{
        const bookId = request.params.bookid;
        const uploadPath = path.join(__dirname,"../../resource",bookId)
       
        cb(null,uploadPath)
    },
    filename:(request,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploadfile = multer({
    storage: storage,
    limits:{fileSize:MAX_SIZE},
}).single('BookImage')

const uploadFileMiddleware = util.promisify(uploadfile)
module.exports = uploadFileMiddleware