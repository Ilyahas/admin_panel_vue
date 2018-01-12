<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <news-component :currentId="currentId"></news-component>
  </div>
</template>
<script>
  import NewsComponent from './NewsComponent.vue'

  export default {
    data () {
      return {
        currentId: '0'
      }
    },
    components: {
      NewsComponent
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
