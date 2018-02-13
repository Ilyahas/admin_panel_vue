module.exports = {
    'addPhotoSection': 'INSERT INTO photosections (SectionName, ImgName) VALUES ($1::text, $2::text)',
    'getPhotoSections': 'SELECT * FROM photosections order by idPhotoSections DESC',
    'getPhotoSectionById': 'SELECT * FROM photosections WHERE idPhotoSections = $1::integer',
    'getTopSections': 'SELECT * FROM photosections order by idPhotoSections DESC LIMIT $1::integer OFFSET $2::integer',
    'updatePhotoSectionWithImg': 'UPDATE photosections SET SectionName=$1::text, ImgName=$2::text WHERE idPhotoSections = $3::integer',
    'updatePhotoSection': 'UPDATE photosections SET SectionName=$sectionName WHERE idPhotoSections = $1::integer',
    'deleteSection': 'DELETE FROM photosections WHERE idPhotoSections = $1::integer',
    'deleteAllPhotosInSection': 'DELETE FROM photos WHERE idPhotoSections = $1::integer',
    'addNewPhoto': 'INSERT INTO photos (PhotoName, PhotoImgName, idPhotoSections) VALUES ($1::text, $2::text, $3::integer)',
    'getPhotosInSection': 'SELECT * FROM photos WHERE idPhotoSections = $1::integer order by idphotos DESC',
    'deletePhotoFromSection': 'DELETE FROM photos WHERE idphotos = $1::integer'
};