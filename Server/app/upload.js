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
    isUploaded = [false, false];
    let uploadDist = createUploadFunction(createUploadStorage('../Client/admin/dist/static/img/photoSectionCovers'));
    let uploadStatic = createUploadFunction(createUploadStorage('../Client/admin/static/img/photoSectionCovers'));

    isUploaded[0] = await uploadFile(uploadStatic, req, res);
    console.log(isUploaded[0]);

    // ------------------- change to async await --------------------------- //
    //setTimeout(()=>{if(isUploaded[0] && isUploaded[1]) res.status(200).end("File is uploaded")}, 100);

};