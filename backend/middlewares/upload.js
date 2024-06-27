const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//const upload = multer({ storage });
// File size limit (5MB)
const maxSize = 5 * 1024 * 1024; // 5MB in bytes

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize } // Limiting file size
});

module.exports = { upload };
