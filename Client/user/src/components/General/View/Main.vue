<template>
  <div>
    <md-card>
      <md-card-media>
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide v-for="(news, index) in listOfNewsForCarusel" :key="index" :style="styleBg + '(\'' + news.ImgData + '\');'">

            <div class="slide-title">
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
<style lang="scss" scoped>
  @import "../../../assets/sass/styles/GlobalVar";
  $titleBarHeight: 70px;

  .gallery-top {
    height: 60vh !important;
    min-height: 500px!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 100px!important;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 18%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .swiper-container {
    height: 300px;
    width: 100%;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
    background-color: $whiteActiveLinkColor;
  }

  .slide-title {
    display: block;
    height: $titleBarHeight;
    font-size: 25px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }


</style>
