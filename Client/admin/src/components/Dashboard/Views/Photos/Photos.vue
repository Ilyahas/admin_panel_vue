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
            <hr>
            <div class="row">
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link to="/photos"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link to="/photos"><i class="ti-close"></i> <span>Delete</span></router-link>
              </div>
            </div>
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

<style scoped lang="scss">
  .section-card {
    height: 190px;
  }
  .text-center{
    text-align: center;

    & span{
      font-size: 17px;
    }
  }
  .row {
    margin-top: -10px;
  }
</style>
