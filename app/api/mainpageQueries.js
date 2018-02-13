module.exports = {
    'getMainPageSections': 'SELECT * FROM mainpagesections order by idMainPageSections DESC',
    'getTopMainPageSections': 'SELECT * FROM mainpagesections order by idMainPageSections DESC LIMIT $1::integer',
    'getMainPageSectionById': 'SELECT * FROM mainpagesections WHERE idMainPageSections = $1::integer',
    'addMainPageSection': 'INSERT INTO mainpagesections (Title, Text) VALUES ($1::text, $2::text)',
    'updateMainPageSection': 'UPDATE mainpagesections SET Title = $1::text, Text = $2::text WHERE idMainPageSections = $3::integer',
    'deleteMainPageSection': 'DELETE FROM mainpagesections WHERE idMainPageSections = $1::integer'
};