<template>
  <div class="container container-margin">
      <div class="news-item shadow" v-for="(news, index) in listOfNews" :key="index" @click="goToNews(news.idnews)" >
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



  .news-item {
    display: inline-block;
    border: 1px solid $whiteActiveLinkColor;
    padding: 10px 15px;
    margin: 5px 0 5px 1%;
    height: 250px;
    width: 29%;

    &:nth-child(1), &:nth-child(3n + 4) {
      margin-left: 0;
    }

    &:hover {
      cursor: pointer;
    }

    .img-container {
      text-align: center;

      img {
        height: 150px;
      }

    }

    .news-content {

      .title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        height: 85px;
        width: 100%;
      }

      .news-date{
        color: $navbarBgColor;
        position: absolute;
      }

    }

  }
</style>
