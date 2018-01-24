<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <main-page-section-component :currentId="currentId"></main-page-section-component>
  </div>
</template>
<script>
  import MainPageSectionComponent from './MainPageSectionComponent.vue'

  export default {
    data () {
      return {
        currentId: '0'
      }
    },
    components: {
      MainPageSectionComponent
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    },
    created () {
      this.currentId = this.$route.query.id.toString()
    }
  }
</script>
