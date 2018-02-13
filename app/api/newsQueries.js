module.exports = {
    'addNews': 'INSERT INTO news (Text, Title, ImgName, Date) VALUE ($1::text, $2::text, $3::text, $4::text)',
    'deleteNews': 'DELETE FROM news WHERE idnews = $1::integer',
    'getNewsList': 'SELECT * FROM news order by idnews DESC',
    'getNewsById': 'SELECT * FROM news WHERE idnews = $1::integer',
    'getTopNews': 'SELECT * FROM news order by idnews DESC LIMIT $1::integer OFFSET $2::integer',
    'updateNewsWithImg': 'UPDATE news SET Text=$1::text, Title=$2::text, ImgName=$3::text WHERE idnews = $4::integer',
    'updateNewsData': 'UPDATE news SET Text=$1::text, Title=$2::text WHERE idnews = $3::integer'
};