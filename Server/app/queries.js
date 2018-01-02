module.exports = {
    'addPhotoSection': 'INSERT INTO admin_panel.photosections (SectionName, CoverImgName) VALUE ("{sectionName}", "{imgName}")',
    'getPhotoSections': 'SELECT * FROM admin_panel.photosections',
    'getPhotoSectionById': 'SELECT * FROM admin_panel.photosections WHERE idPhotoSections = {sectionId}',
    'deleteSection': 'DELETE FROM admin_panel.photosections WHERE idPhotoSections = {sectionId}',
    'addNewPhoto': 'INSERT INTO admin_panel.photos (PhotoName, PhotoImgName, idPhotoSections) VALUE ("{photoName}", "{imgName}", "{sectionId}")'
};