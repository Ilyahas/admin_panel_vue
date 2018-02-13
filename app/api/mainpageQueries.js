module.exports = {
    'getMainPageSections': 'SELECT * FROM MainPageSections order by idMainPageSections DESC',
    'getTopMainPageSections': 'SELECT * FROM MainPageSections order by idMainPageSections DESC LIMIT $1::integer',
    'getMainPageSectionById': 'SELECT * FROM MainPageSections WHERE idMainPageSections = $1::integer',
    'addMainPageSection': 'INSERT INTO MainPageSections (Title, Text) VALUE ($title, $text)',
    'updateMainPageSection': 'UPDATE MainPageSections SET Title = $1::text, Text = $2::text WHERE idMainPageSections = $3::integer',
    'deleteMainPageSection': 'DELETE FROM MainPageSections WHERE idMainPageSections = $1::integer'
};