<template>
  <div class="card form">
    <div class="header">
      <h4 class="title">Add Photos</h4>
    </div>
    <div class="content">

      <div class="row">

        <div class="col-lg-4 col-md-6 col-sm-4">
          <div class="photoFrame" ref="photoFrameInput">
            <fg-input type="text"
                      label="Photo Name"
                      placeholder="Enter name of the photo"
                      v-model="newPhotoName">
            </fg-input>
            <picture-input
              ref="photoInput"
              @change="onAddNewPhoto"
              :crop="false"
              width="640"
              height="480"
              margin="16"
              accept="image/jpeg,image/png"
              size="10"
              buttonClass="btn"
              :customStrings="{
                      upload: '<h1>Bummer!</h1>',
                      drag: 'Drag a 😺 GIF or GTFO'
                    }">
            </picture-input>
            <div class="text-center">
              <button class="btn btn-success btn-form-submit" @click="saveNewPhoto"><i class="ti-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Photos in Section -->
        <div class="col-lg-4 col-md-6 col-sm-4" v-for="photo in allPhotos">
          <div class="photoFrame" ref="photoFrameShow">
            <span class="photoTitle">{{photo.PhotoName}}</span>
            <button class="deletePhotoBtn as-link" @click="askConfirmation(photo)"><i class="ti-close"></i>
            </button>
            <div class="photoContainer">
              <img v-bind:src="pathToPhotos + photo.PhotoImgName">
            </div>
          </div>
        </div>

      </div>

    </div>
    <modal-component v-if="showModal" class="modalWindow">
      <h3 slot="header">Delete the Photo?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
        <button class="modal-default-button btn" @click="deletePhoto">OK</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'
  import PictureInput from 'vue-picture-input'

  export default {
    props: {
      currentId: String
    },
    data () {
      return {
        newPhotoPath: this.$config.defaultImg,
        newPhotoName: '',
        newPhoto: {},
        newPhotoModel: {},
        selectedPhoto: {},

        allPhotos: [],
        pathToPhotos: this.$config.pathToPhotos,
        showModal: false
      }
    },
    components: {
      ModalComponent,
      PictureInput
    },
    methods: {
      saveNewPhoto () {
        if (this.$refs.photoInput.image === undefined) {
          this.notify('Section Picture cannot be empty', 'ti-info', 'warning')
          return
        }
        // upload photo
        this.$http.post(this.$config.serverHost + '/api/uploadPhoto', this.newPhoto).then((res) => {
          if (res.status === 200) {
            let photoData = {
              photoName: this.newPhotoName,
              imgName: '',
              sectionId: this.currentId
            }
            // get name of the file
            for (let file of this.newPhoto) {
              photoData.imgName = file[1].name
              break
            }
            // save photo data to DB
            this.$http.post(this.$config.serverHost + '/api/addPhotoData', photoData).then((res) => {
              if (res.status === 200) {
                this.$router.go(this.$router.currentRoute)
              }
            }).catch((error) => {
              this.notify('Cannot save image data', 'ti-save', 'warning')
              console.log(error)
            })
          }
        }).catch((error) => {
          this.notify('Cannot upload image', 'ti-save', 'warning')
          console.log(error)
        })
      },
      onAddNewPhoto () {
        if (this.$refs.photoInput.image) {
          let data = new FormData()
          data.append('file', this.$refs.photoInput.file)
          this.newPhoto = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },

      askConfirmation (photo) {
        this.selectedPhoto = photo
        this.showModal = true
      },
      deletePhoto () {
        this.$http.post(this.$config.serverHost + '/api/deletePhoto', {photoId: this.selectedPhoto.idPhotos}).then((res) => {
          if (res.status === 200) {
            this.allPhotos.splice(this.allPhotos.indexOf(this.selectedPhoto), 1)
          }
        }).catch((error) => {
          this.$config.notify('Cannot delete image', 'ti-close', 'warning')
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
          }
        )
      }
    },
    created () {
      this.$http.post(this.$config.serverHost + '/api/getPhotosBySectionId', {sectionId: this.currentId}).then((res) => {
        let isPhotosExist = res.body.length
        if (isPhotosExist) {
          this.allPhotos = res.body
        }
      }).catch((error) => {
        this.notify('Cannot get images', 'ti-image', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  .photoFrame {
    border: 1px solid;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    margin-bottom: 15px;

    & img {
      width: 100%;
    }

    & .deletePhotoBtn {
      cursor: pointer;
      display: inline-block;
      float: right;
    }

  }
</style>
