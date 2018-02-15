<template>
  <div class="container container-margin">
    <div class="title">{{article.title}}</div>
    <small class="title-date">{{article.created_date}}</small>
    <div class="article-content" v-html="article.content"></div>
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
          let isArticleExist = res.body.rows.length
          if (isArticleExist) {
            this.article = res.body.rows[0]
          }
        }).catch((error) => {
          this.$noty.error('Article does not exist')
          this.$router.push('/articles')
          console.log(error)
        })
      } else {
        this.$noty.error('Article does not exist')
        this.$router.push('/articles')
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

  @include breakpoint(xs) {
    .article-content {
      font-size: 18px;
      padding: 0 2%;
    }
  }
</style>
