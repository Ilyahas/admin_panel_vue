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
        sectionImg: {},
        sectionName: '',
        sectionImgPath: this.$config.defaultImg,
        isNewSection: true
      }
    },
    components: {
      PictureInput
    },
    methods: {
      addSection () {
        if (this.sectionName === '') {
          this.notify('Section Name cannot be empty', 'ti-info', 'warning')
          return
        }
        if (!this.changedCoverSection) {
          this.notify('Section Picture cannot be default', 'ti-info', 'warning')
          return
        }
        this.onChangeCoverImg()
        this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.sectionImg).then((res) => {
          if (res.status === 200) {
            this.addSectionData()
          }
        }).catch((error) => {
          this.notify('Cannot add section', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      addSectionData () {
        let sectionData = {
          sectionName: this.sectionName,
          imgName: ''
        }
        // get name of the file
        for (let file of this.sectionImg) {
          sectionData.imgName = file[1].name
        }
        this.$http.post(this.$config.serverHost + '/api/addSectionData', sectionData).then((res) => {
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
          // QUESTION ABOUT THIS THREE LINES ???????????????????????????????
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
            this.sectionImgPath = this.$config.pathToSectionCovers + res.body[0].CoverImgName
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
