<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <main-page-section-component></main-page-section-component>
  </div>
</template>
<script>
  import MainPageSectionComponent from './MainPageSectionComponent.vue'

  export default {
    components: {
      MainPageSectionComponent
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
