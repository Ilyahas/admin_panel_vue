module.exports = {
    'addPhotoSection': 'INSERT INTO admin_panel.PhotoSections (SectionName, CoverImgName) VALUE ("{sectionName}", "{imgName}")',
    'getPhotoSections': 'SELECT * FROM admin_panel.PhotoSections',
    'deleteSection': 'DELETE FROM admin_panel.PhotoSections WHERE idPhotoSections = {sectionId}'
};