const multer = require('multer')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {

    if (file) {
      cb(null, Date.now() + file.originalname)
    }
    else {
      cb({ message: "not found" }, null)
    }
  }
});

const fileType = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
    cb(null, true)
  else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 5
  },
  fileFilter: fileType
})

module.exports.upload = upload