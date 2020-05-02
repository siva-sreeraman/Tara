var AWS = require("aws-sdk");

const upload = require("../services/file-upload.service");

// const TARA_BUCKET_NAME = process.env.TARA_S3_BUCKET;
// const TARA_AWS_ACCESS_KEY = process.env.TARA_AWS_ACCESS_KEY;
// const TARA_SECRET_ACCESS_KEY = process.env.TARA_SECRET_ACCESS_KEY;
// const TARA_S3_REGION = process.env.TARA_S3_REGION;

// const TARA_BUCKET_NAME = "tara-project";
// const TARA_AWS_ACCESS_KEY = "ASIA23HRT255C4N4U5FT";
// const TARA_SECRET_ACCESS_KEY = "BcJRUmveIjSfjWAbvzl85pmhg9hAvvVIsgLreQmg";
// const TARA_S3_REGION = "us-east-1";

const TARA_BUCKET_NAME = "tara-playground";
const TARA_AWS_ACCESS_KEY = "AKIATVI3TWXJQRZNQ566";
const TARA_SECRET_ACCESS_KEY = "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";
const TARA_S3_REGION = "us-west-2";

const singleUpload = upload.single("file");
let responseBody = null;
const uploadFile = async (req, res) => {
  singleUpload(req, res, async (err) => {
    fileType = req.body.type;
    req.body.folderName = "test-folder/";
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err }],
      });
    }
    responseBody = { imageUrl: req.file.location };
    return res.json(responseBody);
  });
};

AWS.config.update({
  credentials: {
    accessKeyId: TARA_AWS_ACCESS_KEY,
    secretAccessKey: TARA_SECRET_ACCESS_KEY,
  },
  region: TARA_S3_REGION,
});

var s3 = new AWS.S3();

const createUploadUrl = async (req, res) => {
  const params = {
    Bucket: TARA_BUCKET_NAME,
    Expires: 3600, //time to expire in seconds

    Fields: {
      key: "test",
    },
    conditions: [
      // { acl: "private" },
      { success_action_status: "201" },
      // ["starts-with", "$key", ""][("content-length-range", 0, 100000)],
      // { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
      // ["starts-with", "$Content-Type", "image/png"],
      // { "Content-Type": "image/png" },
    ],
  };
  params.Fields.key = "test/" + req.query.filename || "filename";
  s3.createPresignedPost(params, function (err, data) {
    if (err) {
      // console.log("Error", err);
      res.status(500).json({
        msg: "Error",
        Error: "Error creating presigned URL",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

const createPresignedGetUrl = async (req, res) => {
  const key = req.query.key;
  var params = {
    Bucket: TARA_BUCKET_NAME,
    Key: key,
    Expires: 60,
  };
  var url = s3.getSignedUrl("getObject", params, (err, data) => {
    if (!!err) {
      res.status(500).send(err);
      console.log("err", err);
      return;
    }
    console.log("data", data);
    res.send(data);
  });
};

const getFiles = async (req, res) => {
  var params = {
    Bucket: TARA_BUCKET_NAME /* required */,
    // ContinuationToken: 'STRING_VALUE',
    // Delimiter: 'STRING_VALUE',
    // EncodingType: url,
    // FetchOwner: true || false,
    // MaxKeys: 'NUMBER_VALUE',
    // Prefix: "test/",
    Prefix: req.query.s3Key + "/",
    // RequestPayer: requester,
    // StartAfter: 'STRING_VALUE'
  };
  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(401).send(err);
    }
    res.send(data);
  });
};

module.exports = {
  uploadFile,
  createUploadUrl,
  createPresignedGetUrl,
  getFiles,
};
