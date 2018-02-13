module.exports = {
    'addPhotoSection': 'INSERT INTO PhotoSections (SectionName, ImgName) VALUE ($1::text, $2::text)',
    'getPhotoSections': 'SELECT * FROM PhotoSections order by idPhotoSections DESC',
    'getPhotoSectionById': 'SELECT * FROM PhotoSections WHERE idPhotoSections = $1::text',
    'getTopSections': 'SELECT * FROM PhotoSections order by idPhotoSections DESC LIMIT $1::integer OFFSET $2::integer',
    'updatePhotoSectionWithImg': 'UPDATE PhotoSections SET SectionName=$1::text, ImgName=$2::text WHERE idPhotoSections = $3::integer',
    'updatePhotoSection': 'UPDATE PhotoSections SET SectionName=$sectionName WHERE idPhotoSections = $1::integer',
    'deleteSection': 'DELETE FROM PhotoSections WHERE idPhotoSections = $1::integer',
    'deleteAllPhotosInSection': 'DELETE FROM Photos WHERE idPhotoSections = $1::integer',
    'addNewPhoto': 'INSERT INTO Photos (PhotoName, PhotoImgName, idPhotoSections) VALUE ($1::text, $2::text, $3::integer)',
    'getPhotosInSection': 'SELECT * FROM Photos WHERE idPhotoSections = $1::text order by idphotos DESC',
    'deletePhotoFromSection': 'DELETE FROM Photos WHERE idphotos = $1::text'
};