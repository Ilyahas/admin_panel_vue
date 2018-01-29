module.exports = {
    'addNews': 'INSERT INTO admin_panel.news (Text, Title, CoverImgName, ImgData, Date) VALUE (:text, :title, :imgName, :imgData, :date)',
    'deleteNews': 'DELETE FROM admin_panel.news WHERE idnews = :newsId',
    'getNewsList': 'SELECT * FROM admin_panel.news order by idnews DESC',
    'getNewsById': 'SELECT * FROM admin_panel.news WHERE idnews = :newsId',
    'getTopNews': 'SELECT * FROM admin_panel.news order by idnews DESC LIMIT :topNumber OFFSET :fromNumber',
    'updateNewsWithImg': 'UPDATE admin_panel.news SET Text=:text, Title=:title, CoverImgName=:imgName, ImgData =:imgData WHERE idnews = :newsId',
    'updateNewsData': 'UPDATE admin_panel.news SET Text=:text, Title=:title WHERE idnews = :newsId'
};