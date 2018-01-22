<template>
  <div class="container container-margin">
    <div class="article-item" v-for="(article, index) in listOfArticles" :key="index">
      <div class="art-item-title">{{article.Title}}</div>
      <div class="art-date">{{article.Date}}</div>
      <div class="art-content" v-html="article.Text"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        listOfArticles: [],
        TOP_ARTICLES_NUMBER: 9
      }
    },
    methods: {

    },
    created () {
      this.$http.post(this.$config.serverHost + '/api/getTopArticles', {topNumber: this.TOP_ARTICLES_NUMBER}).then((res) => {
        let isNewsExist = res.body.length
        if (isNewsExist) {
          this.listOfArticles = res.body
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .article-item {
    border: 1px solid;

    .art-date {
      color: $navbarBgColor;
    }

  }
</style>
