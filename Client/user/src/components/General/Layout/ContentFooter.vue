<template>
  <footer class="footer" v-if="showFooter">
    <div class="container">
      <!--<nav class="pull-left">
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>-->
      <div class="copyright">
        Copyright &copy; {{ new Date().getFullYear() }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data () {
      return {
        navbarLinks: {
          type: Array,
          default: () => []
        },
        showFooter: true
      }
    },
    methods: {
      hideFooterIfPhotos () {
        if (this.$route.path === '/photos') {
          this.showFooter = false
        } else {
          this.showFooter = true
        }
      }
    },
    mounted () {
      this.hideFooterIfPhotos()
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        this.hideFooterIfPhotos()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .footer {
    background-color: $navbarBgColor;
    color: $whiteColor;
    padding: 25px 0;
    width: 100%;
  }

</style>
