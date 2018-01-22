<template>
  <div class="container container-margin">
    <div class="title">{{news.Title}}</div>
    <small class="title-date">{{news.Date}}</small>
    <div class="title-img"><img :src="news.ImgData"></div>
    <div v-html="news.Text"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        news: {}
      }
    },
    methods: {

    },
    created () {
      if (this.$route.query.id) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.$route.query.id}).then((res) => {
          let isNewsExist = res.body.length
          if (isNewsExist) {
            this.news = res.body[0]
          } else {
            // notify: id is wrong
            this.$router.push('/news')
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        // notify: id is undefined
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .title {
    font-size: 24px;
  }
  .title-date {
    color: $navbarBgColor;
    display: block;
    font-size: 15px;
    margin-top: 15px;
  }
  .title-img {
    margin-top: 15px;

    img {
      width: 100%;
    }
  }
</style>
