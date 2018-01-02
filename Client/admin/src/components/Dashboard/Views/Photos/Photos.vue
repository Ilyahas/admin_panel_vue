<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/photos/add-section"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="section in sections">

        <div class="card">

          <div class="header">
            <h4 class="title">{{section.SectionName}}</h4>
          </div>

          <div class="content">
            <img class="border-white section-card" v-bind:src="pathToCovers + section.CoverImgName">
            <hr>
            <div class="row row-edit">

              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: 'photos/edit-section', query: { id: section.idPhotoSections }}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>

              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(section)" class="as-link"><i class="ti-close"></i> <span>Delete</span></button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
    <modal-component v-if="showModal">
      <h3 slot="header">Delete "{{selectedSection.SectionName}}"</h3>
      <div slot="footer">
        <button class="modal-default-button btn" @click="deleteSection">OK</button>
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import modalComponent from './modalComponent.vue'

  export default {
    data () {
      return {
        pathToCovers: this.$config.pathToCovers,
        sections: {},
        selectedSection: {},
        showModal: false
      }
    },
    methods: {
      askConfirmation (section) {
        this.selectedSection = section
        this.showModal = true
      },
      deleteSection () {
        this.$http.post(this.$config.serverHost + '/api/deleteSection', {sectionId: this.selectedSection.idPhotoSections}).then((res) => {
          if (res.status === 200) {
            this.sections.splice(this.sections.indexOf(this.selectedSection), 1)
          }
        })
        this.showModal = false
      }
    },
    components: {
      modalComponent
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getSections').then((res) => {
        this.sections = res.body
      })
    }
  }
</script>

<style scoped lang="scss">
  .btn-top{
    margin-bottom: 10px;
  }
  .section-card {
    height: 190px;
  }
  .content{
    overflow: hidden;
  }
  .text-center{
    text-align: center;

    & span{
      font-size: 17px;
    }
  }
  .row-edit {
    margin-top: -10px;
  }
</style>
