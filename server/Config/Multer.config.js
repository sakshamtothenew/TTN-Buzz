const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req , file , cb) {
            cb(null , __dirname + '/uploads')
    },
    filename : function(req , file , cb) {
        cb(null , Date.now() + file.originalname)
    } 
});


const fileType = (req , file , cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
     cb(null , true )

     else {
         cb(null , false)
     }
}



const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 1024 * 5
    },
    fileFilter : fileType
})

module.exports.upload = upload