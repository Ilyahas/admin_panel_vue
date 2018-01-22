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
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        listOfNews: [],
        TOP_NEWS_NUMBER: 9
      }
    },
    methods: {
      goToNews (newsId) {
        this.$router.push({ path: '/read-news', query: { id: newsId } })
      }
    },
    created () {
      this.$http.post(this.$config.serverHost + '/api/getTopNews', {topNumber: this.TOP_NEWS_NUMBER}).then((res) => {
        let isNewsExist = res.body.length
        if (isNewsExist) {
          this.listOfNews = res.body
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  figure.effect-milo {
    background: rgba(0, 0, 0, 0.7);
    max-height: 218px;
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
    font-size: 18px;
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
