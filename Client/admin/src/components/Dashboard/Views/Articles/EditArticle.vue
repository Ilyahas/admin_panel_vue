<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <article-component :currentId="currentId"></article-component>
  </div>
</template>
<script>
  import ArticleComponent from './ArticleComponent.vue'

  export default {
    data () {
      return {
        currentId: '0'
      }
    },
    components: {
      ArticleComponent
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
