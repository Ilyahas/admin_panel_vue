<template>
  <div class="container container-margin">
    <div class="title">{{publish.title}}</div>
    <div class="article-content" v-html="publish.content"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        publish: {}
      }
    },
    methods: {
      getPublish (id) {
        this.$http.post(this.$config.serverHost + '/api/getMainPageSectionById', {mainPageSectionId: id}).then((res) => {
          let isPublishExist = res.body.rows.length
          if (isPublishExist) {
            this.publish = res.body.rows[0]
          }
        }).catch((error) => {
          this.$noty.error('Publish does not exist')
          this.$router.push('/')
          console.log(error)
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.getPublish(to.query.id)
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getPublish(this.$route.query.id)
      } else {
        this.$noty.error('Article does not exist')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .title {
    font-size: $fontSizeTitle + 10px;
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

  .article-content {
    font-size: $fontSizeTitle - 7px;
    line-height: 1.5;

    @include breakpoint(xs) {
      font-size: 18px;
      padding: 0 2%;
    }
  }

</style>
