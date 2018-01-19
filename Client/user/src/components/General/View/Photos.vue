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

    },
    created () {
      if (this.$route.query.id) {
        this.sectionId = this.$route.query.id.toString()
        this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.$route.query.id}).then((res) => {
          let isPhotosExist = res.body.length
          if (isPhotosExist) {
            EventBus.$emit('section', res.body[0])
          } else {
            // notify: id is wrong
            // this.$router.push('/photo-sections')
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

</style>
