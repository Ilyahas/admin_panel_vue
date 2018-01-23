module.exports = {
    'getMainPageSections': 'SELECT * FROM admin_panel.MainPageSections order by idMainPageSections DESC',
    'getTopMainPageSections': 'SELECT * FROM admin_panel.MainPageSections order by idMainPageSections DESC LIMIT :topNumber',
    'getMainPageSectionById': 'SELECT * FROM admin_panel.MainPageSections WHERE idMainPageSections = :mainPageSectionId',
    'addMainPageSection': 'INSERT INTO admin_panel.MainPageSections (Title, Text) VALUE (:title, :text)',
    'updateMainPageSection': 'UPDATE admin_panel.MainPageSections SET Title = :title, Text = :text WHERE idMainPageSections = :mainPageSectionId',
    'deleteMainPageSection': 'DELETE FROM admin_panel.MainPageSections WHERE idMainPageSections = :mainPageSectionId'
};