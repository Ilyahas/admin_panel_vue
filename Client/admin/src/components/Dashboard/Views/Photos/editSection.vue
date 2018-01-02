<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>
    <div class="row">

      <div class="col-lg-4 col-sm-12">
        <div class="card form">
          <div class="header">
            <h4 class="title">Edit Photo Section</h4>
          </div>
          <div class="content">
            <form>
              <fg-input type="text"
                        label="Section Name"
                        placeholder="Enter section name"
                        v-model="sectionName">
              </fg-input>
              <label>Section photo cover</label>
              <picture-input
                ref="pictureInput"
                v-bind:prefill="sectionCoverImgPath"
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
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-8 col-sm-12">
        <div class="card form">
          <div class="header">
            <h4 class="title">Add Photos</h4>
          </div>
          <div class="content">
            <div class="row">

              <div class="col-lg-4 col-sm-6">
                <form>
                  <fg-input type="text"
                            label="Photo Name"
                            placeholder="Enter name of the photo"
                            v-model="newPhotoName">
                  </fg-input>
                  <picture-input
                    ref="photoInput"
                    @change="onAddNewPhoto"
                    v-bind:prefill="newPhotoPath"
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
                    <button class="btn btn-success btn-form-submit" @click="saveNewPhoto"><i class="ti-plus"></i></button>
                  </div>
                </form>
              </div>

              <!-- repead part -->
              <div class="col-lg-4 col-sm-6">
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="text-center">
      <button class="btn btn-success btn-form-submit btn-wd" @click="saveSection">Save Section</button>
    </div>
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'

  export default {
    data () {
      return {
        sectionName: '',
        sectionCoverImgPath: this.$config.defaultImg,
        imgFile: '',
        newPhotoPath: '',
        newPhotoName: '',
        newPhoto: ''
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveSection () {
        // upload photo
        this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.imgFile).then((res) => {
          if (res.status === 200) {
            let sectoinData = {
              sectionName: this.sectionName,
              imgName: ''
            }
            // get name of the file
            for (let file of this.imgFile) {
              sectoinData.imgName = file[1].name
              break
            }
            // save photo data to DB
            this.$http.post(this.$config.serverHost + '/api/addSectionData', sectoinData).then((res) => {
              if (res.status === 200) {
                this.$router.push('/photos')
              }
            })
          }
        })
      },
      saveNewPhoto () {
        // upload photo
        this.$http.post(this.$config.serverHost + '/api/uploadPhoto', this.newPhoto).then((res) => {
          if (res.status === 200) {
            let photoData = {
              photoName: this.newPhotoName,
              imgName: ''
            }
            // get name of the file
            for (let file of this.imgFile) {
              photoData.imgName = file[1].name
              break
            }
            // save photo data to DB
            this.$http.post(this.$config.serverHost + '/api/addPhotoData', photoData).then((res) => {
              if (res.status === 200) {
                // successfull noptification
              }
            })
          }
        })
      },
      onChange () {
        console.log(this.$refs.pictureInput.file)
        if (this.$refs.pictureInput.image) {
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
          this.imgFile = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
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
      back () {
        this.$router.push('/photos')
      }
    },
    created () {
      this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.$route.query.id}).then((res) => {
        this.sectionName = res.body[0].SectionName
        this.sectionCoverImgPath = this.$config.pathToCovers + res.body[0].CoverImgName
      })
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }
</style>
