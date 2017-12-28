const multer = require('multer');
const path = require('path');

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

exports.uploadSectionCover = async (req, res) => {
    let uploadDist = createUploadFunction(createUploadStorage('../Client/admin/dist/static/img/photoSectionCovers'));
    let uploadStatic = createUploadFunction(createUploadStorage('../Client/admin/static/img/photoSectionCovers'));

    let [isUploadedDist, isUploadedStatic] = await Promise.all([uploadFile(uploadDist, req, res), uploadFile(uploadStatic, req, res)]);

    if(isUploadedDist && isUploadedStatic) {
        res.status(200).end("File is uploaded");
    } else {
        res.status(400).end("File is not uploaded");
    }

};