<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/photos/add-section"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="section in sections">
        <div class="card">
          <div class="header">
            <h4 class="title">{{section.section_name}}</h4>
          </div>
          <div class="content text-center">
            <img class="border-white section-card" v-bind:src="section.img_data">
            <hr>
            <div class="row row-edit">
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: '/photos/edit-section', query: {id: section.id_photo_sections}}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>
              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(section)" class="as-link"><i class="ti-close"></i> <span>Delete</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more"></span>
      </infinite-loading>
    </div>

    <modal-component v-if="showModal">
      <h3 slot="header">Видалити "{{selectedSection.section_name}}"?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Відмінити</button>
        <button class="modal-default-button btn" @click="deleteSection">Так</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        TOP_PHOTOSECTIONS_NUMBER: 9,
        isMorePhotoSectionsForLoad: true,
        sections: [],
        selectedSection: {},
        showModal: false
      }
    },
    methods: {
      infiniteHandler ($state) {
        let fromLoadPhotoSectionsIndex = this.sections.length

        if (this.isMorePhotoSectionsForLoad) {
          this.$http.post(this.$config.serverHost + '/api/getTopSections', {
            topNumber: this.TOP_PHOTOSECTIONS_NUMBER,
            fromNumber: fromLoadPhotoSectionsIndex
          }).then((res) => {
            let isNewsExist = res.body.rows.length
            if (isNewsExist) {
              this.sections = this.sections.concat(res.body.rows)
              $state.loaded()
            } else {
              this.isMorePhotoSectionsForLoad = false
              $state.complete()
            }
          }).catch((error) => {
            console.log(error)
            $state.complete()
          })
        }
      },
      askConfirmation (section) {
        this.selectedSection = section
        this.showModal = true
      },
      deleteSection () {
        this.$http.post(this.$config.serverHost + '/api/deleteSection', {sectionId: this.selectedSection.id_photo_sections}).then((res) => {
          if (res.status === 200) {
            this.notify('Секція фотографії була видалена', 'ti-trash', 'success')
            this.sections.splice(this.sections.indexOf(this.selectedSection), 1)
          }
        }).catch((error) => {
          this.notify('Неможливо видалити секцію фотографій', 'ti-trash', 'warning')
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
    components: {
      ModalComponent,
      InfiniteLoading
    }
  }
</script>

<style scoped lang="scss">

  .content{
    overflow: hidden;
  }

  .title {
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
