<template>
  <div class="container container-margin">
    <div class="article-item" v-for="(article, index) in listOfArticles" :key="index">
      <div class="art-item-title">{{article.title}}</div>
      <div class="art-date">{{article.created_date}}</div>
      <div class="art-content" v-html="article.content"></div>
      <button @click="goToArticle(article.id_articles)" class="btn"><span>Read More</span> <i class="icon ti-angle-right"></i></button>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        listOfArticles: [],
        TOP_ARTICLES_NUMBER: 3,
        isMoreArticlesForLoad: true
      }
    },
    components: {
      InfiniteLoading
    },
    methods: {
      goToArticle (id) {
        this.$router.push({ path: '/read-article', query: { id: id } })
      },
      infiniteHandler ($state) {
        let fromLoadArticlesIndex = this.listOfArticles.length
        if (this.isMoreArticlesForLoad) {
          this.$http.post(this.$config.serverHost + '/api/getTopArticles', {
            topNumber: this.TOP_ARTICLES_NUMBER,
            fromNumber: fromLoadArticlesIndex
          }).then((res) => {
            let isArticlesExist = res.body.rows.length
            if (isArticlesExist) {
              this.listOfArticles = this.listOfArticles.concat(res.body.rows)
              $state.loaded()
            } else {
              this.isMoreArticlesForLoad = false
              $state.complete()
            }
          }).catch((error) => {
            console.log(error)
            $state.complete()
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .article-item {
    border: 1px solid;
    padding: 20px;
    margin-bottom: 15px;
    overflow: hidden;

    @include breakpoint(xs) {
      margin-bottom: 1%;
    }

    .art-item-title {
      font-size: $fontSizeTitle;
    }

    .art-date {
      color: $navbarBgColor;
      font-size: $fontSizeSmall;
    }

    .art-content {
      overflow: hidden;
      height: 210px;
    }

    *:before,
    *:after {
      z-index: -1;
    }

  }
</style>
