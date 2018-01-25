<template>
  <div class="navbar">
    <div class="container">
    <ul>
      <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
      <router-link v-for="(link,index) in navbarLinks" :to="link.path" tag="li" :ref="link.name" v-bind:key="link.name">
        <a>{{link.name}}</a>
      </router-link>
    </ul>
    </div>
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
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .navbar {
    background-color: $navbarBgColor;

    ul {
      cursor: default;
      display: flex;
      justify-content: space-between;

      margin: 0;
      padding: 0;
      height: 50px;
      width: 40%;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    li {
      list-style-type: none;

      a {
        color: $whiteColor;
        line-height: 50px;
        padding: 15px 0;
        text-decoration: none;
        outline : none;

        &:first-child{
          padding-left: 0;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      &.active a {
        color: $whiteActiveLinkColor !important;
        &:hover {
          text-decoration: none !important;
        }
      }
    }

  }

</style>
