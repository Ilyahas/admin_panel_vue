const multer = require('multer');
const path = require('path');

const storageDist = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../Client/admin/dist/static/img/photoSectionCovers')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});
const storageStatic = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../Client/admin/static/img/photoSectionCovers')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});

exports.uploadSectionCover = (req, res) => {
    isUploaded = [false, false];
    let uploadDist = multer({
        storage: storageDist,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null);
            }
            callback(null, true);
        }
    }).single('file');
    let uploadStatic = multer({
        storage: storageStatic,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null);
            }
            callback(null, true);
        }
    }).single('file');
    uploadDist(req, res, function(err) {
        if(err)
            res.status(400).end("File is not uploaded");
        isUploaded[0] = true;
    });
    uploadStatic(req, res, function(err) {
        if(err)
            res.status(400).end("File is not uploaded");
        isUploaded[1] = true;
    });
    // ------------------- change to async await --------------------------- //
    setTimeout(()=>{if(isUploaded[0] && isUploaded[1]) res.status(200).end("File is uploaded")}, 100);
};