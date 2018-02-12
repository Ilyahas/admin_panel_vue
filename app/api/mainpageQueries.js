module.exports = {
    'getMainPageSections': 'SELECT * FROM MainPageSections order by idMainPageSections DESC',
    'getTopMainPageSections': 'SELECT * FROM MainPageSections order by idMainPageSections DESC LIMIT :topNumber',
    'getMainPageSectionById': 'SELECT * FROM MainPageSections WHERE idMainPageSections = :mainPageSectionId',
    'addMainPageSection': 'INSERT INTO MainPageSections (Title, Text) VALUE (:title, :text)',
    'updateMainPageSection': 'UPDATE MainPageSections SET Title = :title, Text = :text WHERE idMainPageSections = :mainPageSectionId',
    'deleteMainPageSection': 'DELETE FROM MainPageSections WHERE idMainPageSections = :mainPageSectionId'
};