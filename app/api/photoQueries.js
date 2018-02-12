module.exports = {
    'addPhotoSection': 'INSERT INTO PhotoSections (SectionName, ImgName) VALUE (:sectionName, :imgName)',
    'getPhotoSections': 'SELECT * FROM PhotoSections order by idPhotoSections DESC',
    'getPhotoSectionById': 'SELECT * FROM PhotoSections WHERE idPhotoSections = :sectionId',
    'getTopSections': 'SELECT * FROM PhotoSections order by idPhotoSections DESC LIMIT :topNumber OFFSET :fromNumber',
    'updatePhotoSectionWithImg': 'UPDATE PhotoSections SET SectionName=:sectionName, ImgName=:imgName WHERE idPhotoSections = :sectionId',
    'updatePhotoSection': 'UPDATE PhotoSections SET SectionName=:sectionName WHERE idPhotoSections = :sectionId',
    'deleteSection': 'DELETE FROM PhotoSections WHERE idPhotoSections = :sectionId',
    'deleteAllPhotosInSection': 'DELETE FROM Photos WHERE idPhotoSections = :sectionId',
    'addNewPhoto': 'INSERT INTO Photos (PhotoName, PhotoImgName, idPhotoSections) VALUE (:photoName, :imgName, :sectionId)',
    'getPhotosInSection': 'SELECT * FROM Photos WHERE idPhotoSections = :sectionId order by idphotos DESC',
    'deletePhotoFromSection': 'DELETE FROM Photos WHERE idphotos = :photoId'
};