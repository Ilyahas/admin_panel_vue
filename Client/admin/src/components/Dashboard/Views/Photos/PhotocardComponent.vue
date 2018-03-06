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
                      label="Назва фотографії"
                      placeholder="Введіть назву фотографії"
                      v-model="newPhotoName">
            </fg-input>
            <picture-input
              ref="photoInput"
              @change="onAddNewPhoto"
              :crop="false"
              v-bind:prefill="newPhoto"
              width="640"
              height="480"
              margin="16"
              accept="image/jpeg,image/png"
              size="15"
              buttonClass="btn"
              :customStrings="{
                      upload: '<h1>😺</h1>',
                      drag: 'Перетащить зображення'
                    }">
            </picture-input>
            <div class="text-center">
              <button class="btn btn-success btn-form-submit" @click="saveNewPhoto"><i class="ti-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Photos in Section -->
        <div class="col-lg-4 col-md-6 col-sm-4 cardCustom" v-for="photo in allPhotos">
          <div class="photoFrame">
            <span class="photoTitle">{{photo.photo_title}}</span>
            <button class="deletePhotoBtn as-link" @click="askConfirmation(photo)"><i class="ti-close"></i>
            </button>
            <div class="photoContainer text-center">
              <img v-bind:src="photo.img_data">
            </div>
          </div>
        </div>

      </div>

    </div>
    <modal-component v-if="showModal" class="modalWindow">
      <h3 slot="header">Видалити фотографію?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Відмінити</button>
        <button class="modal-default-button btn" @click="deletePhoto">Так</button>
      </div>
    </modal-component>

    <div class="spinner-bg" v-bind:class="{hide: isLoaded}">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
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
        isLoaded: false,
        newPhoto: this.$config.serverHost + this.$config.defaultImg,
        newPhotoName: '',
        image: {},
        selectedPhoto: {},
        photoChanged: false,

        allPhotos: [],
        showModal: false
      }
    },
    components: {
      ModalComponent,
      PictureInput
    },
    methods: {
      validImg () {
        if (!this.photoChanged) {
          this.notify('Зображення Секції не може бути пустим', 'ti-info', 'warning')
          return false
        }
        return true
      },
      getPhotoData () {
        let photoData = {
          photoName: this.newPhotoName,
          imgName: '',
          imgData: '',
          sectionId: this.currentId
        }
        // get name of the file
        for (let file of this.image) {
          if (file[0] === 'file') {
            photoData.imgName = file[1].name
          }
          if (file[0] === 'data') {
            photoData.imgData = file[1]
          }
        }
        return photoData
      },
      saveNewPhoto () {
        if (!this.validImg()) { return }

        this.$http.post(this.$config.serverHost + '/api/addPhoto', this.getPhotoData()).then((res) => {
          this.$router.go(this.$router.currentRoute)
        }).catch((error) => {
          this.notify('Не можливо зберегти зображення', 'ti-save', 'warning')
          console.log(error)
        })
      },
      onAddNewPhoto () {
        if (this.$refs.photoInput.image) {
          this.photoChanged = true
          let data = new FormData()
          data.append('file', this.$refs.photoInput.file)
          data.append('data', this.$refs.photoInput.image)
          this.image = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      askConfirmation (photo) {
        this.selectedPhoto = photo
        this.showModal = true
      },
      deletePhoto () {
        this.$http.post(this.$config.serverHost + '/api/deletePhoto', {photoId: this.selectedPhoto.id_photos}).then((res) => {
          if (res.status === 200) {
            this.allPhotos.splice(this.allPhotos.indexOf(this.selectedPhoto), 1)
          }
        }).catch((error) => {
          this.$config.notify('Неможливо видалити зображення', 'ti-close', 'warning')
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
        let isPhotosExist = res.body.rows.length
        if (isPhotosExist) {
          this.allPhotos = res.body.rows
        }
        this.isLoaded = true
      }).catch((error) => {
        this.notify('Неможливо отримати зображення', 'ti-image', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  .cardCustom {
    display: inline-block;
  }
  .photoFrame {
    border: 1px solid;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    margin-bottom: 15px;

    img {
      height: 7vw;
    }

    .deletePhotoBtn {
      cursor: pointer;
      display: inline-block;
      float: right;
    }

    .photoTitle {
      text-overflow: ellipsis;
      width: 80%;
      display: inline-block;
      overflow: hidden;
    }

    .photoContainer {
      padding: 10px;
    }


  }
</style>
