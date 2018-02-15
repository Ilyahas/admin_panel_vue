module.exports = {
    'getMainPageSections': 'SELECT * FROM mainpage_sections order by id_mainpage_sections',
    'getTopMainPageSections': 'SELECT * FROM mainpage_sections order by id_mainpage_sections LIMIT $1::integer',
    'getMainPageSectionById': 'SELECT * FROM mainpage_sections WHERE id_mainpage_sections = $1::integer',
    'addMainPageSection': 'INSERT INTO mainpage_sections (title, content) VALUES ($1::text, $2::text)',
    'updateMainPageSection': 'UPDATE mainpage_sections SET title = $1::text, content = $2::text WHERE id_mainpage_sections = $3::integer',
    'deleteMainPageSection': 'DELETE FROM mainpage_sections WHERE id_mainpage_sections = $1::integer'
};