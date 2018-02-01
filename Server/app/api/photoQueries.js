module.exports = {
    'addPhotoSection': 'INSERT INTO admin_panel.PhotoSections (SectionName, ImgName) VALUE (:sectionName, :imgName)',
    'getPhotoSections': 'SELECT * FROM admin_panel.PhotoSections order by idPhotoSections DESC',
    'getPhotoSectionById': 'SELECT * FROM admin_panel.PhotoSections WHERE idPhotoSections = :sectionId',
    'getTopSections': 'SELECT * FROM admin_panel.PhotoSections order by idPhotoSections DESC LIMIT :topNumber OFFSET :fromNumber',
    'updatePhotoSectionWithImg': 'UPDATE admin_panel.PhotoSections SET SectionName=:sectionName, ImgName=:imgName WHERE idPhotoSections = :sectionId',
    'updatePhotoSection': 'UPDATE admin_panel.PhotoSections SET SectionName=:sectionName WHERE idPhotoSections = :sectionId',
    'deleteSection': 'DELETE FROM admin_panel.PhotoSections WHERE idPhotoSections = :sectionId',
    'deleteAllPhotosInSection': 'DELETE FROM admin_panel.Photos WHERE idPhotoSections = :sectionId',
    'addNewPhoto': 'INSERT INTO admin_panel.Photos (PhotoName, PhotoImgName, idPhotoSections) VALUE (:photoName, :imgName, :sectionId)',
    'getPhotosInSection': 'SELECT * FROM admin_panel.Photos WHERE idPhotoSections = :sectionId order by idphotos DESC',
    'deletePhotoFromSection': 'DELETE FROM admin_panel.Photos WHERE idphotos = :photoId'
};