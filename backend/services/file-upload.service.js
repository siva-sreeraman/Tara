const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const S3_BUCKET_NAME = "hs-playground";

let s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: (req, file, cb) => {
      const newFileName = Date.now().toString() + "_" + file.originalname;
      const fullPath = "root/admin/scripts/" + newFileName;
      cb(null, fullPath);
    },
  }),
});

module.exports = upload;
