<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <article-component></article-component>
  </div>
</template>
<script>
  import ArticleComponent from './ArticleComponent.vue'

  export default {
    components: {
      ArticleComponent
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
