<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>
    <div class="row">

      <div class="col-lg-4 col-sm-12">
        <div class="card form">
          <div class="header">
            <h4 class="title">Add Photo Section</h4>
          </div>
          <div class="content">
              <fg-input type="text"
                        label="Section Name"
                        placeholder="Enter category name"
                        v-model="sectionName">
              </fg-input>
              <label>Section photo cover</label>
              <picture-input
                ref="pictureInput"
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
                <button class="btn btn-success btn-form-submit btn-wd" @click="saveSection">Save</button>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'

  export default {
    data () {
      return {
        sectionName: '',
        sectionCoverImg: this.$config.defaultImg,
        imgFile: '',
        newPhoto: ''
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveSection () {
        if (this.sectionName === '') {
          // notification about empty name's field
          return
        }
        this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.imgFile).then((res) => {
          if (res.status === 200) {
            let sectionData = {
              sectionName: this.sectionName,
              imgName: ''
            }
            // get name of the file
            for (let file of this.imgFile) {
              sectionData.imgName = file[1].name
            }
            this.$http.post(this.$config.serverHost + '/api/addSectionData', sectionData).then((res) => {
              if (res.status === 200) {
                this.$router.push('/photos')
              }
            })
          }
        })
      },
      onChange () {
        if (this.$refs.pictureInput.image) {
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
          this.imgFile = data
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }
</style>
