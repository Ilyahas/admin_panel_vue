<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <news-component></news-component>
  </div>
</template>
<script>
  import NewsComponent from './NewsComponent.vue'

  export default {
    components: {
      NewsComponent
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
