module.exports = {
    'addPhotoSection': 'INSERT INTO admin_panel.photosections (SectionName, CoverImgName) VALUE ("{sectionName}", "{imgName}")',
    'getPhotoSections': 'SELECT * FROM admin_panel.photosections',
    'getPhotoSectionById': 'SELECT * FROM admin_panel.photosections WHERE idPhotoSections = {sectionId}',
    'updatePhotoSection': 'UPDATE admin_panel.photosections SET SectionName="{sectionName}", CoverImgName="{imgName}" WHERE idPhotoSections = {sectionId}',
    'deleteSection': 'DELETE FROM admin_panel.photosections WHERE idPhotoSections = {sectionId}',
    'addNewPhoto': 'INSERT INTO admin_panel.photos (PhotoName, PhotoImgName, idPhotoSections) VALUE ("{photoName}", "{imgName}", "{sectionId}")',
    'getPhotosInSection': 'SELECT * FROM admin_panel.photos WHERE idPhotoSections = {sectionId}',
    'deletePhotoFromSection': 'DELETE FROM admin_panel.photos WHERE idphotos = {photoId}'
};