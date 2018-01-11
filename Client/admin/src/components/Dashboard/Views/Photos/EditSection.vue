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
        <photocard-component :currentId="currentId"></photocard-component>
      </div>

    </div>
    <div class="text-center">
      <button class="btn btn-success btn-form-submit btn-wd" @click="saveSection">Save Section</button>
    </div>


  </div>
</template>
<script>
  import PhotocardComponent from './PhotocardComponent.vue'
  import ModalComponent from '../ModalComponent.vue'
  import PictureInput from 'vue-picture-input'

  export default {
    data () {
      return {
        changedCoverSection: false,
        sectionImg: {},
        sectionName: '',
        sectionImgPath: this.$config.defaultImg,

        currentId: '0'
      }
    },
    components: {
      ModalComponent,
      PictureInput,
      PhotocardComponent
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
          }
        )
      }
    },
    created () {
      this.currentId = this.$route.query.id.toString()
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
