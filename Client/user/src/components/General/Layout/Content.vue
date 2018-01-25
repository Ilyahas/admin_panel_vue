<template>
  <div class="main">
    <div class="container-fluid">
      <transition name="fade" mode="out-in">
        <!-- your content here -->
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .35s
  }
  /* .fade-leave-active in <2.1.8 */

  .fade-enter,
  .fade-leave-to
  {
    opacity: 0
  }

</style>

