<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/main-page/add-section"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="section in listOfSections">

        <div class="card">
          <div class="header">
            <h4 class="title">{{section.title}}</h4>
          </div>
          <div class="content">
            <div class="section-content" v-html="section.text"></div>
            <hr>
            <div class="row row-edit">
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: '/main-page/edit-section', query: {id: section.idmainpagesections}}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
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
      <h3 slot="header">Delete "{{selectedSection.title}}"?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
        <button class="modal-default-button btn" @click="deleteSection">OK</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'

  export default {
    data () {
      return {
        showModal: false,
        listOfSections: [],
        selectedSection: {}
      }
    },
    components: {
      ModalComponent
    },
    methods: {
      askConfirmation (section) {
        this.selectedSection = section
        this.showModal = true
      },
      deleteSection () {
        this.$http.post(this.$config.serverHost + '/api/deleteMainPageSection', {mainPageSectionId: this.selectedSection.idMainPageSections}).then((res) => {
          if (res.status === 200) {
            this.notify('Section was deleted', 'ti-trash', 'success')
            this.listOfSections.splice(this.listOfSections.indexOf(this.selectedSection), 1)
          }
        }).catch((error) => {
          this.notify('Cannot delete section', 'ti-trash', 'warning')
          console.log(error)
        })
        this.showModal = false
      },
      notify (msg, icon, type) {
        this.$notifications.notify(
          {
            message: msg,
            icon: icon,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: type
          })
      }
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getMainPageSections').then((res) => {
        this.listOfSections = res.body.rows
      }).catch((error) => {
        this.notify('Cannot get sections', 'ti-gallery', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">

  .title {
    height: 50px;
    overflow: hidden;
  }

  .section-content {
    height: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
