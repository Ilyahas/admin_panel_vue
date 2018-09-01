<template>
  <div class="container container-margin">

    <md-card class="desktop">
      <md-card-media>
        <!-- swiper -->
        <swiper :options="swiperOption" class="gallery-top" ref="swiperTop">
          <swiper-slide class="bg-container" v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + news.img_data+ '\');'">
            <div class="slide-title" @click="newsClick(news.id_news)">
              <div class="container">{{news.title}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </md-card-media>
    </md-card>

    <md-card class="mobile">
      <md-card-media>
        <!-- swiper -->
        <swiper :options="swiperOptionMobile" class="gallery-top" ref="swiperTop">
          <swiper-slide class="bg-container" v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + news.img_data+ '\');'">
            <div class="slide-title" @click="newsClick(news.id_news)">
              <div class="container">{{news.title}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </md-card-media>
    </md-card>

    <div class="articles">
      <span class="art-title">Статті</span>
        <div class="article-item" v-for="(article, index) in listOfArticles" :key="index">
          <div class="art-item-title">{{article.title}}</div>
          <div class="art-date">{{article.created_date}}</div>
          <button @click="goToArticle(article.id_articles)" class="btn"><span>Детальніше</span> <i class="icon ti-angle-right"></i></button>
        </div>
    </div>

    <div class="main-sections">
      <div class="custom-section" v-for="(section, index) in listOfSections" :key="index">
        <span class="sections-title">{{section.title}}</span>
        <pre><div class="section-content" v-html="section.content"></div></pre>
      </div>
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
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionMobile: {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        listOfNewsForCarusel: [],
        listOfArticles: [],
        listOfSections: [],
        TOP_NEWS_NUMBER: 9,
        TOP_ARTICLES_NUMBER: 5,
        styleBg: 'background-image:url'
      }
    },
    methods: {
      newsClick (index) {
        this.$router.push({ path: '/read-news', query: { id: index } })
      },
      goToArticle (id) {
        this.showPublishes = false
        let data = Object.assign({}, this.$route.query)
        data['id'] = id
        this.$router.push({ path: '/read-article', query: data })
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
        let isNewsExist = res.body.rows.length
        if (isNewsExist) {
          this.listOfNewsForCarusel = res.body.rows
        }
      }).catch((error) => {
        console.log(error)
      })

      /* Get Top Articles */
      this.$http.post(this.$config.serverHost + '/api/getTopArticles', {topNumber: this.TOP_ARTICLES_NUMBER}).then((res) => {
        let isArticlesExist = res.body.rows.length
        if (isArticlesExist) {
          this.listOfArticles = res.body.rows
        }
      }).catch((error) => {
        console.log(error)
      })

      /* Get Sections */
      this.$http.get(this.$config.serverHost + '/api/getMainPageSections').then((res) => {
        let isSectionsExist = res.body.rows.length
        if (isSectionsExist) {
          this.listOfSections = res.body.rows
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
  $fontSectionSize: 50px;

  *:before,
  *:after {
    z-index: -1;
  }

  .container {
    @include breakpoint(xs) {
      width: 100% !important;
    }
  }

  .container-margin{
    @include breakpoint(xs) {
      margin-top: 0 !important;
    }
  }

  /*-----------SLIDESHOW----------------*/

  .desktop {
    @include breakpoint(md) {
      width: 100%;
    }

    @include breakpoint(xs) {
      display: none;
    }
  }

  .mobile {
    @include breakpoint(768px) {
      display: none !important;
    }
  }



  .swiper-container {
    z-index: 1 !important;
  }
  .gallery-top {
    height: 35vh !important;
    min-height: 250px!important;
    width: 100%;
    z-index: -10;

    @include breakpoint(xs) {
      height: 25vh !important;
      min-height: 152px!important;
    }

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
  $paddingInTitle: 10px;

  .articles {
    display: block;
    margin-top: 10px;

    @include breakpoint(xs) {
      padding: 0 2%;
    }

    .art-title {
      display: inline-block;
      font-size: $fontSectionSize;
      text-align: center;
      width: 100%;

      @include breakpoint(md) {
        font-size: $fontSectionSize - 10px;
      }
    }

    .article-item {
      border: 1px solid;
      padding: 10px;
      margin-bottom: 10px;
      width: calc(100% - 22px);

      .art-item-title {
        font-size: $fontSizeTitle;
        overflow: hidden;

        @include breakpoint(md) {
          font-size: $fontSizeTitle - 5px;
        }
      }

      .art-date {
        color: $navbarBgColor;
        font-size: $fontSizeSmall;
      }
    }

  }


  /*-----------------Sections------------------*/
  .main-sections {
    margin-top: 25px;

    pre {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .custom-section {
      display: block;

      @include breakpoint(xs) {
        padding: 15px 2%;
      }

      .sections-title {
        display: block;
        font-size: $fontSectionSize;
        text-align: center;

        @include breakpoint(sm) {
          font-size: $fontSectionSize - 20px;
        }

        @include breakpoint(md) {
          font-size: $fontSectionSize - 10px;
        }
      }

      .section-content {
        white-space: pre-wrap;       /* css-3 */
        white-space: -moz-pre-wrap;  /* Mozilla, с 1999 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;
        font-size: $fontSizeSmall + 5px;
      }
    }
  }

</style>
