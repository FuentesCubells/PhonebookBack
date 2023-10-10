const multer = require('multer');

// Define storage options
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, './public/images'); // Set the upload directory
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
