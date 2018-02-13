module.exports = {
    'getArticlePage': 'SELECT * FROM ArticlePage WHERE idArticlePage = 1',
    'updateArticlePage': 'UPDATE ArticlePage SET Text=$text, Title=$title WHERE idArticlePage = 1',
    'getArticles': 'SELECT * FROM Articles order by idArticles DESC',
    'getTopArticles': 'SELECT * FROM Articles order by idArticles DESC LIMIT $1::integer OFFSET $2::integer',
    'getArticleById': 'SELECT * FROM Articles WHERE idArticles = $1::integer',
    'addArticle': 'INSERT INTO Articles (Title, Text, Date) VALUE ($1::text, $2::text, $3::text)',
    'updateArticle': 'UPDATE Articles SET Title = $1::text, Text = $2::text WHERE idArticles = $3::integer',
    'deleteArticle': 'DELETE FROM Articles WHERE idArticles = $1::integer'
};