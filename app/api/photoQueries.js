module.exports = {
    'addPhotoSection': 'INSERT INTO photo_sections (section_name, img_name, img_data) VALUES ($1::text, $2::text, $3::text)',
    'getPhotoSections': 'SELECT * FROM photo_sections order by id_photo_sections DESC',
    'getPhotoSectionById': 'SELECT * FROM photo_sections WHERE id_photo_sections = $1::integer',
    'getTopSections': 'SELECT * FROM photo_sections order by id_photo_sections DESC LIMIT $1::integer OFFSET $2::integer',
    'updatePhotoSectionWithImg': 'UPDATE photo_sections SET section_name=$1::text, img_name=$2::text, img_data=$3::text WHERE idPhotoSections = $4::integer',
    'updatePhotoSection': 'UPDATE photo_sections SET section_name=$1::text WHERE id_photo_sections = $2::integer',
    'deleteSection': 'DELETE FROM photo_sections WHERE id_photo_sections = $1::integer',
    'deleteAllPhotosInSection': 'DELETE FROM photos WHERE id_photo_sections = $1::integer',
    'addNewPhoto': 'INSERT INTO photos (photo_title, img_name, id_photo_sections) VALUES ($1::text, $2::text, $3::integer)',
    'getPhotosInSection': 'SELECT * FROM photos WHERE id_photo_sections = $1::integer order by id_photos DESC',
    'deletePhotoFromSection': 'DELETE FROM photos WHERE id_photos = $1::integer'
};