<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

    <div class="card form">
      <div class="header">
        <h4 class="title">Add Photo Section</h4>
      </div>
      <div class="content">
        <form>
          <fg-input type="text"
                    label="Section Name"
                    placeholder="Enter category name"
                    v-model="sectionName">
          </fg-input>
          <label>Section photo cover</label>
          <picture-input
              ref="pictureInput"
              @change="onChange"
              width="600"
              height="600"
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
          <div class="clearfix"></div>
        </form>
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
        imgFile: ''
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveSection () {
        this.$http.post('http://localhost:3000/api/uploadSectionCover', this.imgFile).then((res) => {
          if (res.status === 200) {
            this.$http.post('http://localhost:3000/api/addSectionData', sectoinData).then((res) => {
              if (res.status === 200) {
                this.$router.push('/photos')
              }
            })
          }
        })

        let sectoinData = {
          sectionName: this.sectionName,
          imgName: ''
        }
        // get name of the file
        for (let file of this.imgFile) {
          sectoinData.imgName = file[1].name
        }
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
        this.$router.push('/photos')
      }
    }
  }
</script>
<style scoped lang="scss">
  .form{
    width: 50%;
    max-width: 750px;
  }
</style>
