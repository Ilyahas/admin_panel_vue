<template>
  <div class="container container-margin">
    <div class="title">{{articlePageContent.Title}}</div>
    <div class="article-content" v-html="articlePageContent.Text"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        articlePageContent: {}
      }
    },
    methods: {

    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getArticlePage').then((res) => {
        let isNewsExist = res.body.length
        if (isNewsExist) {
          this.articlePageContent = res.body[0]
        } else {
          // notify: id is wrong
          this.$router.push('/news')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .title {
    font-size: $fontSizeTitle + 10px;
  }
</style>
