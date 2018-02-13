module.exports = {
    'getArticlePage': 'SELECT * FROM articlepage WHERE idArticlePage = 1',
    'updateArticlePage': 'UPDATE articlepage SET Title=$1::text, Text=$2::text WHERE idArticlePage = 1',
    'getArticles': 'SELECT * FROM articles order by idArticles DESC',
    'getTopArticles': 'SELECT * FROM articles order by idArticles DESC LIMIT $1::integer OFFSET $2::integer',
    'getArticleById': 'SELECT * FROM articles WHERE idArticles = $1::integer',
    'addArticle': 'INSERT INTO articles (Title, Text, Date) VALUES ($1::text, $2::text, $3::text)',
    'updateArticle': 'UPDATE articles SET Title = $1::text, Text = $2::text WHERE idArticles = $3::integer',
    'deleteArticle': 'DELETE FROM articles WHERE idArticles = $1::integer'
};