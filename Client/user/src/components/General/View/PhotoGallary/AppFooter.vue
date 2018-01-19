<template>
  <footer id="footer">
    <div v-html="text"></div>
  </footer>
</template>

<script>

export default {
  name: 'app-footer',
  data () {
    return {
      text: null
    }
  }
}
</script>
