const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const config = require('./config');
AWS.config.update({
    accessKeyId: config.s3.keyId,
    secretAccessKey: config.s3.keySecret,
});
const ep = new AWS.Endpoint(config.s3.host);
const s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2' });

const createUploadStorage = (path) => {
    return multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path)
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        }
    });
};

const createUploadFunction = (storage) => {
    return multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null);
            }
            callback(null, true);
        }
    }).single('file');
};

const uploadFile = (call, req, res) => {
    return new Promise(resolve => {
        call(req, res, (err) => {
            resolve(!err);
        });
    });
};

exports.uploadImgs = async (req, res, path) => {
    // let uploadDist = createUploadFunction(createUploadStorage("../Client/admin/dist/static/img/" + path));
    let uploadStatic = createUploadFunction(createUploadStorage(path));

    // let [isUploadedDist, isUploadedStatic] = await Promise.all([uploadFile(uploadDist, req, res), uploadFile(uploadStatic, req, res)]);

    let isUploadedStatic = uploadFile(uploadStatic, req, res);

    if(isUploadedStatic) {
        res.status(200).end("File is uploaded");
    } else {
        res.status(400).end("File is not uploaded");
    }
};

const createS3Storage = (path) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: config.s3.bucket,
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                cb(null, path + file.originalname)
            }
        })
    }).single('file');
};

exports.uploadImgS3 = async (req, res, path) => {
    let uploadStatic = createS3Storage(path);
    let isUploadedStatic = uploadFile(uploadStatic, req, res);

    if(isUploadedStatic) {
        res.status(200).end("File is uploaded");
    } else {
        res.status(400).end("File is not uploaded");
    }
};