<template>
  <div class="container container-margin">
    <md-card>
      <md-card-media>
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide class="bg-container" v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + news.ImgData + '\');'">
            <div class="slide-title" @click="newsClick(news.idnews)">
              <div class="container">{{news.Title}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + news.ImgData + '\');'"></swiper-slide>
        </swiper>
      </md-card-media>
    </md-card>

    <div class="articles">
      <span class="art-title">Articles</span>
      <div>

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
        listOfNewsForCarusel: [],
        TOP_NEWS_NUMBER: 5,
        styleBg: 'background-image:url'
      }
    },
    methods: {
      newsClick (index) {
        this.$router.push({ path: '/read-news', query: { id: index } })
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
      this.$http.post(this.$config.serverHost + '/api/getTopNews', {topNumber: this.TOP_NEWS_NUMBER}).then((res) => {
        let isNewsExist = res.body.length
        if (isNewsExist) {
          this.listOfNewsForCarusel = res.body
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
    font-size: 24px;
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
    margin-top: 10px;

    .art-title {
      display: inline-block;
      font-size: 70px;
      text-align: center;
      width: 100%;
    }
  }

</style>
