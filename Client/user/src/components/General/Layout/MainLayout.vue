<template>
  <div class="wrapper">
    <nav-bar :navbar-links="$navbar.navbarLinks"></nav-bar>

    <site-content></site-content>
  </div>
</template>
<script>
  import SiteContent from './Content.vue'
  import TopNav from './TopNav.vue'

  export default {
    components: {
      SiteContent,
      TopNav
    }
  }
</script>
