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
      <div class="blocks">
        <div class="copyright">
          <span class="text-cr">Copyright &copy; {{ new Date().getFullYear() }}. All rights reserved.</span>
        </div>
        <div class="youtute-icon">
          <a href="#"><img src="../../../assets/youtube.png"></a>
        </div>
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
    padding: 5px 0;
    width: 100%;

    @include breakpoint(xs) {
      text-align: center;
    }

    .blocks {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      height: 70px;

      .copyright {
        width: 100%;
      }

      .youtute-icon {
        width: 100%;



        a {
          img {
            float: right;
            opacity: 0.8;
            transition: all 0.5s;
          }
          &:hover {
            img {
              opacity: 1;
              transition: all 0.5s;
            }
          }
        }
      }

    }
  }

</style>
