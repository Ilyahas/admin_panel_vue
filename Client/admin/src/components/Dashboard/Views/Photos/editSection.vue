<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>
    <div class="row">

      <!-- Edit Section Cover image and Title -->
      <div class="col-lg-4 col-sm-12">
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
                v-bind:prefill="sectionCoverImgPath"
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
      <div class="col-lg-8 col-sm-12">
        <div class="card form">
          <div class="header">
            <h4 class="title">Add Photos</h4>
          </div>
          <div class="content">

            <div class="row">

              <div class="col-lg-4 col-sm-4">
                <div class="photoFrame">
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
                </div>
              </div>

              <!-- Photos in Section -->
              <div class="col-lg-4 col-sm-4" v-for="photo in allPhotos" >
                <div class="photoFrame">
                  <span class="photoTitle">{{photo.PhotoName}}</span>
                  <div>
                    <img v-bind:src="pathToPhotos + photo.PhotoImgName" width="120">
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
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'

  export default {
    data () {
      return {
        changedCoverSection: false,
        sectionName: '',
        sectionCoverImgPath: this.$config.defaultImg,
        imgFile: '',
        newPhotoPath: '',
        newPhotoName: '',
        newPhoto: '',
        allPhotos: [],
        pathToPhotos: this.$config.pathToPhotos,
        currentId: 0
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveSection () {
        if (this.changedCoverSection) {
          this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.imgFile).then((res) => {
            if (res.status === 200) {
              this.saveSectionData()
            }
          })
        } else {
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          this.imgFile = data
          this.saveSectionData()
        }
      },
      saveNewPhoto () {
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
                // successfull noptification
              }
            })
          }
        })
      },
      onChangeCoverImg () {
        if (this.$refs.sectionCoverImgInput.image) {
          this.changedCoverSection = true
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
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
      },
      saveSectionData () {
        let sectoinData = {
          sectionName: this.sectionName,
          imgName: '',
          sectionId: this.currentId
        }
        // get name of the file
        for (let file of this.imgFile) {
          sectoinData.imgName = file[1].name
          break
        }
        this.$http.post(this.$config.serverHost + '/api/updateSectionData', sectoinData).then((res) => {
          if (res.status === 200) {
            this.$router.push('/photos')
          }
        })
      }
    },
    created () {
      this.currentId = this.$route.query.id
      this.$http.post(this.$config.serverHost + '/api/getSectionById', {sectionId: this.currentId}).then((res) => {
        this.sectionName = res.body[0].SectionName
        this.sectionCoverImgPath = this.$config.pathToCovers + res.body[0].CoverImgName
      })
      this.$http.post(this.$config.serverHost + '/api/getPhotosBySectionId', {sectionId: this.currentId}).then((res) => {
        this.allPhotos = res.body
      })
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }
  .photoFrame{
    border: 1px solid;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    height: 260px;
    margin-bottom: 15px;
  }
</style>
