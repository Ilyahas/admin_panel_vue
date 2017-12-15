<template>
  <div class="wrapper">
    <top-nav></top-nav>
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
