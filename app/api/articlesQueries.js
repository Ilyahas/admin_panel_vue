module.exports = {
    'getArticlePage': 'SELECT * FROM article_page WHERE id_article_page = 1',
    'updateArticlePage': 'UPDATE article_page SET title=$1::text, content=$2::text WHERE id_article_page = 1',
    'getContacts': 'SELECT * FROM contacts WHERE id_contacts = 1',
    'updateContacts': 'UPDATE contacts SET title = $1::text, content = $2::text WHERE id_contacts = 1',
    'getEvents': 'SELECT * FROM events WHERE year = $1::text AND month = $2::text order by id_events DESC',
    'updateEvent': 'UPDATE events SET title = $1::text, description = $2::text, year = $3::text, month = $4::text WHERE id_articles = $5::integer',
    'addEvent': 'INSERT INTO events (title, description, year, month, day) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)',
    'getArticles': 'SELECT * FROM articles order by id_articles DESC',
    'getTopArticles': 'SELECT * FROM articles order by id_articles DESC LIMIT $1::integer OFFSET $2::integer',
    'getArticleById': 'SELECT * FROM articles WHERE id_articles = $1::integer',
    'addArticle': 'INSERT INTO articles (title, content, created_date) VALUES ($1::text, $2::text, $3::text)',
    'updateArticle': 'UPDATE articles SET title = $1::text, content = $2::text WHERE id_articles = $3::integer',
    'deleteArticle': 'DELETE FROM articles WHERE id_articles = $1::integer'
};