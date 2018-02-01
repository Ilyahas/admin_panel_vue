<template>
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
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Drag a 😺 GIF or GTFO'
                }">
      </picture-input>
      <div class="text-center">
        <button v-if="isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('addSection')">Save</button>
        <button v-if="!isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('updateSection')">Update</button>
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
        photoSectionImgPath: '/img/photos/',
        photoSectionImg: this.$config.serverHost + this.$config.defaultImg,
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
        let sectionData = {}
        if (this.isNewNews) {
          sectionData = {
            sectionName: this.sectionName,
            imgName: ''
          }
          // get name of the file
          for (let file of this.image) {
            if (file[0] === 'file') {
              sectionData.imgName = file[1].name
            }
          }
        } else {
          sectionData = {
            sectionName: this.sectionName,
            imgName: '',
            sectionId: this.currentId,
            isNewImg: false
          }
          if (this.changedCoverSection) {
            sectionData.isNewImg = true
            // get name of the file
            for (let file of this.image) {
              if (file[0] === 'file') {
                sectionData.imgName = file[1].name
              }
            }
          }
        }
        return sectionData
      },
      saveSection (path) {
        if (!this.validFields()) { return }
        let sectionData = this.getPhotoSectionData()

        this.$http.post(this.$config.serverHost + '/api/' + path, sectionData).then((res) => {
          if (this.isNewSection || sectionData.isNewImg) {
            this.$http.post(this.$config.serverHost + '/api/addPhotoFile', this.image).then((res) => {
              this.successUpload()
            }).catch((error) => {
              this.notify('Cannot upload image', 'ti-import', 'warning')
              console.log(error)
            })
          } else {
            this.successUpload()
          }
        }).catch((error) => {
          this.notify('Cannot add section', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.sectionCoverImgInput.image) {
          this.changedCoverSection = true
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
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
      }
      if (!this.isNewSection) {
        this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.currentId}).then((res) => {
          let isSectionExist = res.body.length
          if (isSectionExist) {
            this.sectionName = res.body[0].SectionName
            this.photoSectionImg = this.$config.serverHost + this.photoSectionImgPath + res.body[0].ImgName
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
