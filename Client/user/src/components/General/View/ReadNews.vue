<template>
  <div class="container container-margin">
    <div class="title">{{news.Title}}</div>
    <small class="title-date">{{news.Date}}</small>
    <div class="title-img"><img :src="serverHost + newsImgPath + news.ImgName"></div>
    <div class="news-content" v-html="news.Text"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        serverHost: this.$config.serverHost,
        newsImgPath: '/img/news/',
        news: {}
      }
    },
    created () {
      if (this.$route.query.id) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.$route.query.id}).then((res) => {
          let isNewsExist = res.body.length
          if (isNewsExist) {
            this.news = res.body[0]
          } else {
            this.$noty.error('News does not exist')
            this.$router.push('/news')
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$noty.error('News does not exist')
        this.$router.push('/news')
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
    font-size: $fontSizeTitle - 10px;
    margin-top: 15px;
  }
  .title-img {
    margin-top: 15px;

    img {
      width: 100%;
    }
  }

  @include breakpoint(xs) {
    .news-content {
      font-size: 18px;
      padding: 0 2%;
    }
  }
</style>
