module.exports = {
    "addNews": "INSERT INTO admin_panel.news (Text, Title, CoverImgName) VALUE ('{text}', '{title}', '{imgName}')",
    "deleteNews": "DELETE FROM admin_panel.news WHERE idnews = {newsId}",
    "getNewsList": "SELECT * FROM admin_panel.news order by idnews DESC",
    "getNewsById": "SELECT * FROM admin_panel.news WHERE idnews = {newsId}",
    "updateNews": "UPDATE admin_panel.news SET Text='{text}', Title='{title}',CoverImgName='{imgName}' WHERE idnews = {newsId}",
};