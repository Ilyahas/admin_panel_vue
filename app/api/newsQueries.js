module.exports = {
    'addNews': 'INSERT INTO news (Text, Title, ImgName, Date) VALUE (:text, :title, :imgName, :date)',
    'deleteNews': 'DELETE FROM news WHERE idnews = :newsId',
    'getNewsList': 'SELECT * FROM news order by idnews DESC',
    'getNewsById': 'SELECT * FROM news WHERE idnews = :newsId',
    'getTopNews': 'SELECT * FROM news order by idnews DESC LIMIT :topNumber OFFSET :fromNumber',
    'updateNewsWithImg': 'UPDATE news SET Text=:text, Title=:title, ImgName=:imgName WHERE idnews = :newsId',
    'updateNewsData': 'UPDATE news SET Text=:text, Title=:title WHERE idnews = :newsId'
};