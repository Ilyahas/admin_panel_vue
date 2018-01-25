<template>
  <div class="wrapper">
    <nav-bar :navbar-links="$navbar.navbarLinks"></nav-bar>

    <div class="m-content"> <site-content></site-content> </div>

    <content-footer></content-footer>
  </div>
</template>
<script>
  import SiteContent from './Content.vue'
  import ContentFooter from './ContentFooter.vue'

  export default {
    components: {
      SiteContent,
      ContentFooter
    }
  }
</script>
<style scoped lang="scss">
  .m-content {
    min-height: 91vh;
  }
</style>
