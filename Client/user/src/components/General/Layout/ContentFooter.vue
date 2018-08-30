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
          <span class="text-cr">Copyright &copy; {{ new Date().getFullYear() }}. Усі права захищені.</span>
        </div>
        <div class="youtute-icon">
          <a href="https://www.youtube.com/user/HramsmZP" target="_blank">
            <div class="img-text">Дивитися відео на YouTube</div>
            <img src="../../../assets/youtube.png">
          </a>
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
      justify-content: space-between;
      height: 70px;

      .copyright {
        width: 120%;
      }

      .youtute-icon {
        width: 300px;

        a {
          opacity: 0.8;
          transition: all 0.3s;

          &:hover {
            opacity: 1;
            transition: all 0.3s;
          }

          img {
            float: right;
          }

        }

        .img-text {
          color: #fff;
          display: inline-block;
          width: 80px;
        }
      }

    }
  }

</style>
