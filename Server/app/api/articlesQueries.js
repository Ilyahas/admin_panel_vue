module.exports = {
    'getArticlePage': 'SELECT * FROM admin_panel.ArticlePage WHERE idArticlePage = 1',
    'updateArticlePage': 'UPDATE admin_panel.ArticlePage SET Text="{text}", Title="{title}" WHERE idArticlePage = 1',
    'getArticles': 'SELECT * FROM admin_panel.Articles order by idArticles DESC',
    'getArticleById': 'SELECT * FROM admin_panel.Articles WHERE idArticles = {articleId}',
    'addArticle': 'INSERT INTO admin_panel.Articles (Title, Text, Date) VALUE ("{title}", "{text}", "{date}")',
    'updateArticle': 'UPDATE admin_panel.Articles SET Title = "{title}", Text = "{text}"',
    'deleteArticle': 'DELETE FROM admin_panel.Articles WHERE idArticles = {articleId}'
};