module.exports = {
    "addPhotoSection": "INSERT INTO admin_panel.PhotoSections (SectionName, CoverImgName) VALUE ('{sectionName}', '{imgName}')",
    "getPhotoSections": "SELECT * FROM admin_panel.PhotoSections order by idPhotoSections DESC",
    "getPhotoSectionById": "SELECT * FROM admin_panel.PhotoSections WHERE idPhotoSections = {sectionId}",
    "updatePhotoSection": "UPDATE admin_panel.PhotoSections SET SectionName='{sectionName}', CoverImgName='{imgName}' WHERE idPhotoSections = {sectionId}",
    "deleteSection": "DELETE FROM admin_panel.PhotoSections WHERE idPhotoSections = {sectionId}",
    "addNewPhoto": "INSERT INTO admin_panel.Photos (PhotoName, PhotoImgName, idPhotoSections) VALUE ('{photoName}', '{imgName}', '{sectionId}')",
    "getPhotosInSection": "SELECT * FROM admin_panel.Photos WHERE idPhotoSections = {sectionId} order by idphotos DESC",
    "deletePhotoFromSection": "DELETE FROM admin_panel.Photos WHERE idphotos = {photoId}"
};