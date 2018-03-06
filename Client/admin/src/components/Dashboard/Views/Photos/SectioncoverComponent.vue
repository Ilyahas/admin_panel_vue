<template>
  <div class="card form">
    <div class="header">
      <h4 class="title">Редагування секції фотографій</h4>
    </div>
    <div class="content">
      <fg-input type="text"
                label="Назва секції"
                placeholder="Введіть назву секції"
                v-model="sectionName">
      </fg-input>
      <label>Зображення для секції</label>
      <picture-input
        ref="sectionCoverImgInput"
        v-bind:prefill="photoSectionImg"
        :crop="false"
        @change="onChange"
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
        <button v-if="isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('addSection')">Зберегти</button>
        <button v-if="!isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('updateSection')">Оновити</button>
      </div>
    </div>

    <div class="spinner-bg" v-bind:class="{hide: isLoaded}">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'

  export default {
    props: {
      currentId: String
    },
    data () {
      return {
        isLoaded: false,
        photoSectionImg: this.$config.serverHost + this.$config.defaultImg,
        imgBase64: '',
        changedCoverSection: false,
        sectionName: '',
        image: {},
        isNewSection: true
      }
    },
    components: {
      PictureInput
    },
    methods: {
      base64toFile (b64Data, fileName, contentType, sliceSize) {
        contentType = contentType || ''
        sliceSize = sliceSize || 512
        let byteCharacters = atob(b64Data)
        let byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize)
          let byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }
          let byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }
        return new File(byteArrays, fileName, {type: contentType})
      },
      validFields () {
        let isSectionNameValid = this.sectionName.length > 3
        if (!isSectionNameValid) {
          this.notify('Section Name is too short', 'ti-info', 'warning')
          return false
        }
        if (!this.changedCoverSection && this.isNewSection) {
          this.notify('Section Picture cannot be default', 'ti-info', 'warning')
          return false
        }
        return true
      },
      successUpload () {
        this.notify('Section was successfully added', 'ti-check', 'success')
        this.$router.push('/photos')
      },
      getPhotoSectionData () {
        let sectionData = {
          sectionName: this.sectionName,
          imgName: '',
          imdData: '',
          sectionId: this.currentId,
          isNewImg: false
        }
        if (this.changedCoverSection) {
          sectionData.isNewImg = true
          for (let file of this.image) {
            if (file[0] === 'file') {
              sectionData.imgName = file[1].name
            }
            if (file[0] === 'data') {
              sectionData.imgData = file[1]
            }
          }
        }
        return sectionData
      },
      saveSection (path) {
        if (!this.validFields()) { return }
        let sectionData = this.getPhotoSectionData()

        this.$http.post(this.$config.serverHost + '/api/' + path, sectionData).then((res) => {
          this.successUpload()
        }).catch((error) => {
          this.notify('Cannot add section', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.sectionCoverImgInput.image !== this.imgBase64) {
          this.changedCoverSection = true
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          data.append('data', this.$refs.sectionCoverImgInput.image)
          this.image = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
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
      if (this.currentId !== undefined) {
        this.isNewSection = false
      } else {
        this.isLoaded = true
      }
      if (!this.isNewSection) {
        this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.currentId}).then((res) => {
          let isSectionExist = res.body.rows.length
          this.isLoaded = true
          if (isSectionExist) {
            this.sectionName = res.body.rows[0].section_name
            this.imgBase64 = res.body.rows[0].img_data
            this.photoSectionImg = this.base64toFile(this.imgBase64.split(',')[1], res.body.rows[0].img_name)
          } else {
            this.notify('This Photo Section does not exist', 'ti-gallery', 'danger')
            this.$router.push('/photos')
          }
        }).catch((error) => {
          this.notify('Cannot get section', 'ti-gallery', 'warning')
          console.log(error)
        })
      }
    }
  }
</script>
