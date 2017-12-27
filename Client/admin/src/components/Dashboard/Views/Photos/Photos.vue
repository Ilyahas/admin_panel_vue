<template>
  <div>
    <router-link class="btn btn-success" to="/photos/add-category"><i class="ti-plus"></i></router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        property: 'Blank'
      }
    },
    computed: {
      propertyComputed () {
        console.log('I change when this.property changes.')
        return this.property
      }
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getSections').then((res) => {
        console.log(res)
      })
    }
  }
</script>
