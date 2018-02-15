module.exports = {
    'addNews': 'INSERT INTO news (title, content, img_name, img_data, created_date) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)',
    'deleteNews': 'DELETE FROM news WHERE id_news = $1::integer',
    'getNewsList': 'SELECT * FROM news order by id_news DESC',
    'getNewsById': 'SELECT * FROM news WHERE id_news = $1::integer',
    'getTopNews': 'SELECT * FROM news order by id_news DESC LIMIT $1::integer OFFSET $2::integer',
    'updateNewsWithImg': 'UPDATE news SET title=$1::text, content=$2::text, img_name=$3::text, img_data=$4::text WHERE id_news = $5::integer',
    'updateNewsData': 'UPDATE news SET title=$1::text, content=$2::text WHERE id_news = $3::integer'
};