<template>
  <div class="container container-margin">
    <div class="title">{{article.Title}}</div>
    <small class="title-date">{{article.Date}}</small>
    <div v-html="article.Text"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        article: {}
      }
    },
    created () {
      if (this.$route.query.id) {
        this.$http.post(this.$config.serverHost + '/api/getArticleById', {articleId: this.$route.query.id}).then((res) => {
          let isArticleExist = res.body.length
          if (isArticleExist) {
            this.article = res.body[0]
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .title {
    font-size: $fontSizeTitle;
  }
  .title-date {
    color: $navbarBgColor;
    display: block;
    font-size: $fontSizeSmall;
    margin-top: 15px;
  }
  .title-img {
    margin-top: 15px;

    img {
      width: 100%;
    }
  }
</style>
