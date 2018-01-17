<template>
  <div class="container">
      <div class="news-item shadow" v-for="(news, index) in listOfNews" :key="index">
        <div class="img-container">
          <img :src="news.ImgData">
        </div>
        <div class="news-content">
          <div class="title">{{news.Title}}</div>
          <div><small class="news-date">{{news.Date}}</small></div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        listOfNews: [],
        TOP_NEWS_NUMBER: 5
      }
    },
    methods: {

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

  .shadow {
    -moz-box-shadow:    2px 2px 2px 1px #ccc;
    -webkit-box-shadow: 2px 2px 2px 1px #ccc;
    box-shadow:         2px 2px 2px 1px #ccc;
  }

  .news-item {
    border: 1px solid $whiteActiveLinkColor;
    padding: 10px 15px;
    margin: 15px 0;
    height: 150px;
    width: 95%;

    .img-container {
      float: right;

      img {
        height: 150px;
      }

    }

    .news-content {
      float: left;

      .title {
        display: inline;
        font-size: 21px;
      }

      .news-date{
        color: $navbarBgColor;
      }

    }

  }
</style>
