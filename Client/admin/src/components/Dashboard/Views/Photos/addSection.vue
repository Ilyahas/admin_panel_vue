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
          this.notify('Section Name cannot be empty', 'ti-info', 'warning')
          return
        }
        if (this.$refs.pictureInput.image === undefined) {
          this.notify('Section Picture cannot be empty', 'ti-info', 'warning')
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
                this.notify('Section was successfully added', 'ti-check', 'success')
                this.$router.push('/photos')
              }
            }).catch((error) => {
              this.notify('Cannot add section', 'ti-plus', 'warning')
              console.log(error)
            })
          }
        }).catch((error) => {
          this.notify('Cannot add section', 'ti-plus', 'warning')
          console.log(error)
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
    }
  }
</script>
<style scoped lang="scss">
  .form {
    width: 100%;
  }
</style>
