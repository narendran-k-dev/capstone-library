const util = require('util');
const fs = require('fs');
const multer = require('multer');
const path = require('path')
const { v4: uuidv4, v4 } = require('uuid');

const MAX_SIZE = 20 * 1024 *1024

const storage = multer.diskStorage({
    destination:(request,file,cb)=>{
        const bookId = request.params.bookid;
        console.log(bookId)
        const uploadPath = path.join(__dirname,"../../resource",bookId)
        fs.mkdirSync(uploadPath,{recursive:true})
        cb(null,uploadPath)
    },
    filename:(request,file,cb)=>{
        cb(null,uuidv4()+file.originalname)
    }
})

const uploadfile = multer({
    storage: storage,
    limits:{fileSize:MAX_SIZE},
}).single('BookImage')

const uploadFileMiddleware = util.promisify(uploadfile)
module.exports = uploadFileMiddleware