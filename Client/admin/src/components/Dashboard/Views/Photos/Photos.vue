<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/photos/add-category"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="section in sections">

        <div class="card">
          <div class="header">
            <h4 class="title">{{section.SectionName}}</h4>
          </div>
          <div class="content">
            <img class="border-white section-card" v-bind:src="pathToCovers + section.CoverImgName">
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        pathToCovers: this.$config.pathToCovers,
        sections: {}
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
        console.log(res.body)
        this.sections = res.body
      })
    }
  }
</script>

<style scoped>

</style>
