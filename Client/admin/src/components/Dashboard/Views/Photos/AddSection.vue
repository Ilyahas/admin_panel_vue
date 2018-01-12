<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <div class="row">
      <div class="col-lg-4 col-sm-12">
        <sectioncover-component></sectioncover-component>
      </div>
    </div>
  </div>
</template>
<script>
  import SectioncoverComponent from './SectioncoverComponent.vue'

  export default {
    components: {
      SectioncoverComponent
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }
</style>
