<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <div class="row">
      <!-- Edit Section Cover image and Title -->
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <sectioncover-component :currentId="currentId"></sectioncover-component>
      </div>
      <!-- Add new photos to section and show existing -->
      <div class="col-xl-9 col-lg-8 col-md-6 col-sm-12">
        <photocard-component :currentId="currentId"></photocard-component>
      </div>
    </div>
  </div>
</template>
<script>
  import PhotocardComponent from './PhotocardComponent.vue'
  import SectioncoverComponent from './SectioncoverComponent.vue'

  export default {
    data () {
      return {
        currentId: '0'
      }
    },
    components: {
      PhotocardComponent,
      SectioncoverComponent
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
