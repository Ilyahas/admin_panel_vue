<template>
  <div class="container container-margin">
    <div class="grid">
      <figure class="effect-milo" v-for="(news, index) in listOfNews" :key="index" @click="goToNews(news.idnews)" >
        <img :src="news.ImgData">
        <figcaption>
          <h2>{{news.Title}}</h2>
          <p>{{news.Date}}</p>
        </figcaption>
      </figure>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        listOfNews: [],
        TOP_NEWS_NUMBER: 12,
        isMoreNewsForLoad: true
      }
    },
    components: {
      InfiniteLoading
    },
    methods: {
      goToNews (newsId) {
        this.$router.push({ path: '/read-news', query: { id: newsId } })
      },
      infiniteHandler ($state) {
        let fromLoadNewsIndex = this.listOfNews.length

        if (this.isMoreNewsForLoad) {
          this.$http.post(this.$config.serverHost + '/api/getTopNews', {
            topNumber: this.TOP_NEWS_NUMBER,
            fromNumber: fromLoadNewsIndex
          }).then((res) => {
            let isNewsExist = res.body.length
            if (isNewsExist) {
              this.listOfNews = this.listOfNews.concat(res.body)
              $state.loaded()
            } else {
              this.isMoreNewsForLoad = false
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

  figure.effect-milo {
    background: rgba(0, 0, 0, 0.7);
    max-height: 217px;
  }

  figure.effect-milo img {
    max-width: none;
    width: -webkit-calc(100% + 60px);
    width: calc(100% + 60px);
    opacity: 1;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: translate3d(-30px,0,0) scale(1.15);
    transform: translate3d(-30px,0,0) scale(1.15);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  figure.effect-milo:hover img {
    opacity: 0.5;
    -webkit-transform: translate3d(0,0,0) scale(1.05);
    transform: translate3d(0,0,0) scale(1.05);
  }

  figure.effect-milo h2 {
    font-size: $fontSizeTitle - 7px;
    text-align: right;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px;
  }

  figure.effect-milo p {
    padding: 0 5px 0 0;
    width: 30%;
    border-right: 1px solid #fff;
    text-align: right;
    font-size: 15px;
    opacity: 0;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: translate3d(-40px,0,0);
    transform: translate3d(-40px,0,0);
  }

  figure.effect-milo:hover p {
    opacity: 1;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }

</style>
