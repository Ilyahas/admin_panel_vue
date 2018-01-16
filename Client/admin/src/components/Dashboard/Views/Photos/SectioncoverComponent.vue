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
        v-bind:prefill="sectionImg"
        :crop="false"
        @change="onChange"
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
        <button v-if="isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="addSection">Save</button>
        <button v-if="!isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection">Update</button>
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
        changedCoverSection: false,
        sectionImg: '',
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
      addSection () {
        let isSectionNameValid = this.sectionName.length > 3
        if (!isSectionNameValid) {
          this.notify('Section Name is too short', 'ti-info', 'warning')
          return
        }
        if (!this.changedCoverSection) {
          this.notify('Section Picture cannot be default', 'ti-info', 'warning')
          return
        }
        let sectionData = {
          sectionName: this.sectionName,
          imgName: '',
          imgData: ''
        }
        // get name of the file
        for (let file of this.image) {
          if (file[0] === 'file') {
            sectionData.imgName = file[1].name
          }
          if (file[0] === 'image') {
            sectionData.imgData = file[1]
          }
        }
        this.$http.post(this.$config.serverHost + '/api/addSection', sectionData).then((res) => {
          if (res.status === 200) {
            this.notify('Section was successfully added', 'ti-check', 'success')
            this.$router.push('/photos')
          }
        }).catch((error) => {
          this.notify('Cannot add section', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      saveSection () {
        let isSectionNameValid = this.sectionName.length > 3
        if (!isSectionNameValid) {
          this.notify('Section Name is too short', 'ti-info', 'warning')
          return
        }

        let sectionData = {
          sectionName: this.sectionName,
          imgName: '',
          imgData: '',
          sectionId: this.currentId,
          newImg: false
        }
        if (this.changedCoverSection) {
          sectionData.newImg = true
          // get name of the file
          for (let file of this.image) {
            if (file[0] === 'file') {
              sectionData.imgName = file[1].name
            }
            if (file[0] === 'image') {
              sectionData.imgData = file[1]
            }
          }
        }
        this.$http.post(this.$config.serverHost + '/api/updateSection', sectionData).then((res) => {
          if (res.status === 200) {
            this.notify('Photo Section was edit', 'ti-pencil', 'success')
            this.$router.push('/photos')
          }
        }).catch((error) => {
          this.notify('Cannot update section', 'ti-save', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.sectionCoverImgInput.image) {
          this.changedCoverSection = true
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          data.append('image', this.$refs.sectionCoverImgInput.image)
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
        this.sectionImg = this.$config.defaultImg
      }
      if (!this.isNewSection) {
        this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.currentId}).then((res) => {
          let isSectionExist = res.body.length
          if (isSectionExist) {
            this.sectionName = res.body[0].SectionName
            this.sectionImg = this.base64toFile(res.body[0].ImgData.split(',')[1], res.body[0].CoverImgName)
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
