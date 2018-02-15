<template>
  <div class="container container-margin">
    <div class="grid">
      <figure class="photoSection-item" v-for="(section, index) in listOfSections" :key="index" @click="goToSection(section.id_photo_sections)">
        <img :src="section.img_data">
        <figcaption>
          <div class="title"><span>{{section.section_name}}</span></div>
        </figcaption>
      </figure>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        listOfSections: [],
        TOP_PHOTOSECTIONS_NUMBER: 12,
        isMorePhotoSectionsForLoad: true
      }
    },
    components: {
      InfiniteLoading
    },
    methods: {
      goToSection (id) {
        this.$router.push({ path: '/photos', query: { id: id } })
      },
      infiniteHandler ($state) {
        let fromLoadPhotoSectionsIndex = this.listOfSections.length

        if (this.isMorePhotoSectionsForLoad) {
          this.$http.post(this.$config.serverHost + '/api/getTopSections', {
            topNumber: this.TOP_PHOTOSECTIONS_NUMBER,
            fromNumber: fromLoadPhotoSectionsIndex
          }).then((res) => {
            let isNewsExist = res.body.rows.length
            if (isNewsExist) {
              this.listOfSections = this.listOfSections.concat(res.body.rows)
              $state.loaded()
            } else {
              this.isMorePhotoSectionsForLoad = false
              $state.complete()
            }
          }).catch((error) => {
            console.log(error)
            $state.complete()
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .photoSection-item {
    max-height: 218px;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.35s;
    -webkit-transition: 0.35s;

    .title {
      font-size: $fontSizeTitle - 7px;
      padding: 10px;
      width: calc(100% - 10px);
      overflow: hidden;
    }

    img {
      height: 230px;
      opacity: 0.7;
      -webkit-transition: 0.35s;
      transition: 0.35s;
      -webkit-transform: scale(1);
      transform: scale(1);

      @include breakpoint(xs) {
        opacity: 0.5;
      }
    }

    &:hover {
      background: rgba(0, 0, 0, 0.8);
      transition: 0.35s;
      -webkit-transition: 0.35s;

      img {
        opacity: 0.5;
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
      }
    }
  }
</style>
