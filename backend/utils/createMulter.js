const multer = require("multer");

var storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename:  (req, file, cb) => {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
