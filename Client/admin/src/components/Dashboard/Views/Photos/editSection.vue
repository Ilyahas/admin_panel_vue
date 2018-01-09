<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>
    <div class="row">

      <!-- Edit Section Cover image and Title -->
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <div class="card form">
          <div class="header">
            <h4 class="title">Edit Photo Section</h4>
          </div>
          <div class="content">

            <fg-input type="text"
                      label="Section Name"
                      placeholder="Enter section name"
                      v-model="sectionName">
            </fg-input>
            <label>Section photo cover</label>
            <picture-input
              ref="sectionCoverImgInput"
              v-bind:prefill="sectionImgPath"
              :crop="false"
              @change="onChangeCoverImg"
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

          </div>
        </div>
      </div>

      <!-- Add new photos to section and show existing -->
      <div class="col-xl-9 col-lg-8 col-md-6 col-sm-12">
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
        </div>
      </div>

    </div>
    <div class="text-center">
      <button class="btn btn-success btn-form-submit btn-wd" @click="saveSection">Save Section</button>
    </div>
    <modal-component v-if="showModal">
      <h3 slot="header">Delete the Photo?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
        <button class="modal-default-button btn" @click="deletePhoto">OK</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import ModalComponent from './modalComponent.vue'
  import PictureInput from 'vue-picture-input'
  import Vue from 'vue'

  export default {
    data () {
      return {
        changedCoverSection: false,
        sectionImg: {},
        sectionName: '',
        sectionImgPath: this.$config.defaultImg,

        newPhotoPath: this.$config.defaultImg,
        newPhotoName: '',
        newPhoto: {},
        newPhotoModel: {},

        allPhotos: [],
        selectedPhoto: {},
        pathToPhotos: this.$config.pathToPhotos,

        currentId: 0,
        showModal: false,
        emptyPhotoInput: {}
      }
    },
    components: {
      ModalComponent,
      PictureInput
    },
    methods: {
      saveSection () {
        if (this.sectionName === '') {
          this.notify('Section Name cannot be empty', 'ti-info', 'warning')
          return
        }
        if (this.changedCoverSection) {
          this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.sectionImg).then((res) => {
            if (res.status === 200) {
              this.saveSectionData()
            }
          })
        } else {
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          this.sectionImg = data
          this.saveSectionData()
        }
      },
      saveSectionData () {
        let sectoinData = {
          sectionName: this.sectionName,
          imgName: '',
          sectionId: this.currentId
        }
        // get name of the file
        for (let file of this.sectionImg) {
          sectoinData.imgName = file[1].name
          break
        }
        this.$http.post(this.$config.serverHost + '/api/updateSectionData', sectoinData).then((res) => {
          if (res.status === 200) {
            this.notify('Photo Section was edit', 'ti-pencil', 'success')
            this.$router.push('/photos')
          }
        }).catch((error) => {
          this.notify('Cannot update section', 'ti-save', 'warning')
          console.log(error)
        })
      },
      onChangeCoverImg () {
        if (this.$refs.sectionCoverImgInput.image) {
          this.changedCoverSection = true
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          this.sectionImg = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },

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
              this.notify('Cannot save image', 'ti-save', 'warning')
              console.log(error)
            })
          }
        }).catch((error) => {
          this.notify('Cannot save image', 'ti-save', 'warning')
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
      getPhotos () {
        this.$http.post(this.$config.serverHost + '/api/getPhotosBySectionId', {sectionId: this.currentId}).then((res) => {
          let isPhotosExist = res.body.length
          if (isPhotosExist) {
            this.allPhotos = res.body
          }
        }).catch((error) => {
          this.notify('Cannot get images', 'ti-image', 'warning')
          console.log(error)
        })
      },

      askConfirmation (photo) {
        this.selectedPhoto = photo
        this.showModal = true
      },
      deletePhoto () {
        this.$http.post(this.$config.serverHost + '/api/deletePhoto', {photoId: this.selectedPhoto.idphotos}).then((res) => {
          if (res.status === 200) {
            this.allPhotos.splice(this.allPhotos.indexOf(this.selectedPhoto), 1)
          }
        }).catch((error) => {
          this.notify('Cannot delete image', 'ti-close', 'warning')
          console.log(error)
        })
        this.showModal = false
      },

      back () {
        this.$router.go(-1)
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
      this.currentId = this.$route.query.id
      this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.currentId}).then((res) => {
        let isSectionExist = res.body.length
        if (isSectionExist) {
          this.sectionName = res.body[0].SectionName
          this.sectionImgPath = this.$config.pathToCovers + res.body[0].CoverImgName
        } else {
          this.notify('This Photo Section does not exist', 'ti-gallery', 'danger')
          this.$router.push('/photos')
        }
      }).catch((error) => {
        this.notify('Cannot get section', 'ti-gallery', 'warning')
        console.log(error)
      })
      this.getPhotos()
      setTimeout(() => { this.emptyPhotoInput = Vue.util.extend({}, this.$refs.photoInput) }, 1000)
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }

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
