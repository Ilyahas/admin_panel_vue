<template>
  <div class="container container-margin">
    <md-card>
      <md-card-media>
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide class="bg-container" v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + serverHost + newsImgPath + news.ImgName + '\');'">
            <div class="slide-title" @click="newsClick(news.idnews)">
              <div class="container">{{news.Title}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + serverHost + newsImgPath + news.ImgName + '\');'"></swiper-slide>
        </swiper>
      </md-card-media>
    </md-card>

    <div class="articles">
      <span class="art-title">Articles</span>
      <div class="art-grid">
        <div class="article-item" v-for="(article, index) in listOfArticles" :key="index">
          <div class="art-item-title">{{article.Title}}</div>
          <div class="art-date">{{article.Date}}</div>
          <button @click="goToArticle(article.idArticles)" class="btn"><span>Read More</span> <i class="icon ti-angle-right"></i></button>
        </div>
      </div>
    </div>

    <div class="custom-section" v-for="(section, index) in listOfSections" :key="index">
      <span class="sections-title">{{section.Title}}</span>
      <div class="section-content" v-html="section.Text"></div>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
        serverHost: this.$config.serverHost,
        newsImgPath: '/img/news/',
        listOfNewsForCarusel: [],
        listOfArticles: [],
        listOfSections: [],
        TOP_NEWS_NUMBER: 5,
        TOP_ARTICLES_NUMBER: 2,
        styleBg: 'background-image:url'
      }
    },
    methods: {
      newsClick (index) {
        this.$router.push({ path: '/read-news', query: { id: index } })
      },
      goToArticle (id) {
        this.$router.push({ path: '/read-article', query: { id: id } })
      }
    },
    mounted () {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
    created () {
      /* Get Top News for slideshow */
      this.$http.post(this.$config.serverHost + '/api/getTopNews', {topNumber: this.TOP_NEWS_NUMBER}).then((res) => {
        let isNewsExist = res.body.length
        if (isNewsExist) {
          this.listOfNewsForCarusel = res.body
        }
      }).catch((error) => {
        console.log(error)
      })

      /* Get Top Articles */
      this.$http.post(this.$config.serverHost + '/api/getTopArticles', {topNumber: this.TOP_ARTICLES_NUMBER}).then((res) => {
        let isArticlesExist = res.body.length
        if (isArticlesExist) {
          this.listOfArticles = res.body
        }
      }).catch((error) => {
        console.log(error)
      })

      /* Get Sections */
      this.$http.get(this.$config.serverHost + '/api/getMainPageSections').then((res) => {
        let isSectionsExist = res.body.length
        if (isSectionsExist) {
          this.listOfSections = res.body
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";
  $titleBarHeight: 85px;
  $fontSectionSize: 60px;

  *:before,
  *:after {
    z-index: -1;
  }

  /*-----------SLIDESHOW----------------*/
  .gallery-top {
    height: 55vh !important;
    min-height: 500px!important;
    width: 100%;
  }
  .gallery-thumbs {
    background-color: rgba(105, 191, 250, 0.25);
    height: 70px!important;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 15%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .swiper-container {
    height: 100px;
    width: 100%;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
    background-color: $whiteActiveLinkColor;
  }

  .slide-title {
    text-align: center;
    display: block;
    font-size: $fontSizeTitle;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    height: $titleBarHeight;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    transition: 0.35s;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .bg-container:hover {
    cursor: pointer;

    .slide-title {
      height: 100%;
      transition: 0.35s;
    }
  }

  /*---------------Articles-------------------*/
  .articles {
    display: block;
    margin-top: 10px;

    .art-title {
      display: inline-block;
      font-size: $fontSectionSize;
      text-align: center;
      width: 100%;
    }

    .art-grid {
      position: relative;
      margin: 0 auto;
      list-style: none;

      .article-item {
        border: 1px solid;
        position: relative;
        padding: 1%;
        float: left;
        overflow: hidden;
        margin: 0 1% 1% 0;
        min-width: 320px;
        width: 47%;

        &:nth-child(even) {
          margin: 0 0 1% 0;
        }

        .art-item-title {
          font-size: $fontSizeTitle;
          height: 94px;
          overflow: hidden;
        }

        .art-date {
          color: $navbarBgColor;
          font-size: $fontSizeSmall;
        }
      }
    }
  }


  /*-----------------Sections------------------*/
  .custom-section {
    display: block;
    margin-top: 200px;
    padding: 15px 0;

    .sections-title {
      display: block;
      font-size: $fontSectionSize;
      text-align: center;
      margin-bottom: 10px;
    }

    .section-content {
      font-size: $fontSizeSmall + 5px;
    }
  }

</style>
