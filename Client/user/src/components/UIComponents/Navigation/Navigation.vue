<template>
  <div v-bind:class="{scrollOff: hideContent, navbar: true}">
    <div id="nav-icon" v-bind:class="{open: isOpen}" @click="toggleOpen">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container">
      <ul class="nav-list">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <router-link v-for="(link,index) in navbarLinks" :to="link.path" tag="li" :ref="link.name" v-bind:key="link.name">
          <a>{{link.name}}</a>
        </router-link>
      </ul>
      <slide-x-left-transition :duration="300">
      <ul class="nav-list-mobile" v-show="isOpen">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <router-link v-on:click.native="toggleOpen" v-for="(link,index) in navbarLinks" :to="link.path" tag="li" :ref="link.name" v-bind:key="link.name" >
          <a>{{link.name}}</a>
        </router-link>
      </ul>
      </slide-x-left-transition>
    </div>
  </div>
</template>
<script>
  import { SlideXLeftTransition } from 'vue2-transitions'

  export default {
    props: {
      navbarLinks: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        isOpen: false,
        hideContent: false,
        activeLinkIndex: 0
      }
    },
    components: {
      SlideXLeftTransition
    },
    methods: {
      toggleOpen () {
        this.isOpen = !this.isOpen
        if (!this.hideContent) {
          setTimeout(() => {
            this.hideContent = !this.hideContent
          }, 300)
        } else {
          this.hideContent = !this.hideContent
        }
      },
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

  $mobilePadding: 12px;

  .navbar {
    background-color: $navbarBgColor;

    @include breakpoint(xs) {
      padding: $mobilePadding;
    }

    .nav-list-mobile {
      background-color: $navbarBgColor;
      font-size: 25px;
      position: absolute;
      margin: 24px 0 0 0;
      top: 25px;
      right: 0;
      bottom: 0;
      max-height: 100vh;
      overflow: hidden;
      padding-bottom: 1px;
      height: calc(100% - 50px);
      width: 100%;
      z-index: 99999;

      @include breakpoint(sm) {
        display: none !important;
      }

    }

    .nav-list {
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

      @include breakpoint(xs) {
        display: none;
      }
    }

    li {
      list-style-type: none;

      @include breakpoint(xs) {
        border-bottom: 1px solid $whiteActiveLinkColor;
        margin: 0 auto;
        width: 80%;

        &:last-child {
          border-bottom: 1px solid $whiteColor;
        }
      }

      a {
        color: $whiteColor;
        line-height: 50px;
        padding: 15px 0;
        text-decoration: none;
        outline : none;

        @include breakpoint(xs) {
          width: 100%;
          display: inline-block;
          line-height: 200%;
        }

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

  /* hamburger */

  #nav-icon {
    display: none;
    width: 40px;
    height: calc(50px - 12px * 2);
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;

    @include breakpoint(xs) {
      display: block;
    }

  }

  #nav-icon span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: $whiteColor;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  }

  #nav-icon span:nth-child(1) {
    top: 0px;
  }

  #nav-icon span:nth-child(2),#nav-icon span:nth-child(3) {
    top: 10px;
  }

  #nav-icon span:nth-child(4) {
    top: 20px;
  }

  #nav-icon.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  #nav-icon.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

</style>
