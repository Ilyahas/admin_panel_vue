<template>
  <div class="navbar">
    <ul class="navList container">
      <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
      <router-link v-for="(link,index) in navbarLinks" :to="link.path" tag="li" :ref="link.name" v-bind:key="link.name">
        <a>{{link.name}}</a>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      navbarLinks: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        activeLinkIndex: 0
      }
    },
    methods: {
      findActiveLink () {
        this.navbarLinks.find((element, index) => {
          let found = element.path === this.$route.path
          if (found) {
            this.activeLinkIndex = index
          }
          return found
        })
      }
    },
    mounted () {
      this.findActiveLink()
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        this.findActiveLink()
      }
    }
  }
</script>
<style>

</style>