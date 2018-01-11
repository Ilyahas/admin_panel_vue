module.exports = {
    "addNews": "INSERT INTO admin_panel.news (Text, Title, CoverImgName) VALUE ('{text}', '{title}', '{imgName}')",
    "getNewsList": "SELECT * FROM admin_panel.news order by idnews DESC",
    "getNewsById": "SELECT * FROM admin_panel.news WHERE idnews = {idNews}"
};