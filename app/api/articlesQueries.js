module.exports = {
    'getArticlePage': 'SELECT * FROM ArticlePage WHERE idArticlePage = 1',
    'updateArticlePage': 'UPDATE ArticlePage SET Text=:text, Title=:title WHERE idArticlePage = 1',
    'getArticles': 'SELECT * FROM Articles order by idArticles DESC',
    'getTopArticles': 'SELECT * FROM Articles order by idArticles DESC LIMIT :topNumber OFFSET :fromNumber',
    'getArticleById': 'SELECT * FROM Articles WHERE idArticles = :articleId',
    'addArticle': 'INSERT INTO Articles (Title, Text, Date) VALUE (:title, :text, :date)',
    'updateArticle': 'UPDATE Articles SET Title = :title, Text = :text WHERE idArticles = :articleId',
    'deleteArticle': 'DELETE FROM Articles WHERE idArticles = :articleId'
};