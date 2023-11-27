const multer = require("multer");

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (request, file, cb) => {
  const allowedMimeTypes = ["image/*"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ error: "Only specific image file types are allowed!" }, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
