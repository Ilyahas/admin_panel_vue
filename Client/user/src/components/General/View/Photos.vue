<template>
  <div class="photoAlbum">
    <div id="main">
      <app-header></app-header>
      <thumbs></thumbs>
      <app-footer></app-footer>
    </div>
    <viewer></viewer>
  </div>
</template>
<script>
  import AppHeader from './PhotoGallary/AppHeader'
  import AppFooter from './PhotoGallary/AppFooter'
  import Thumbs from './PhotoGallary/Thumbs'
  import Viewer from './PhotoGallary/Viewer'
  import {EventBus} from '../../../event_bus'

  export default{
    data () {
      return {
        sectionId: ''
      }
    },
    components: {
      AppFooter,
      AppHeader,
      Thumbs,
      Viewer
    },
    methods: {
      getPhotos (id) {
        this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: id}).then((res) => {
          let isPhotosExist = res.body.rows.length
          if (isPhotosExist) {
            EventBus.$emit('section', res.body.rows[0])
          } else {
            this.$noty.error('Photo Section does not exist')
            this.$router.push('/photo-sections')
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.getPhotos(to.query.id)
      }
    },
    created () {
      if (this.$route.query.id) {
        this.sectionId = this.$route.query.id.toString()
        this.getPhotos(this.$route.query.id)
      } else {
        this.$noty.error('Photo Section does not exist')
        this.$router.push('/photo-sections')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .photoAlbum #main {
    @include breakpoint(xs) {
      left: 0 !important;
      width: 85vw !important;
    }
  }

</style>
