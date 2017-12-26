<template>
  <div>
    <section class="form">
      <fg-input type="text"
                label="Section Name"
                placeholder="Enter category name"
                v-model="categoryName">
      </fg-input>
      <label>Section photo cover</label>
      <section>
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
      </section>
    </section>
    <button class="btn btn-success" @click="saveSection">Save</button>
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'
  export default {
    data () {
      return {
        categoryName: '',
        sectionCoverImg: this.$config.defaultImg,
        imgFile: ''
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveSection () {
        this.$http.post('/api/uploadSectionCover', this.imgFile).then((res) => {
          console.log(res)
        })
        let sectoinData = {
          name: this.categoryName,
          imgName: '' // add name of the new file and change in DB path to name
        }
        this.$http.post('/api/addSection', sectoinData).then((res) => {
          console.log(res)
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
      }
    }
  }
</script>
<style scoped>
  .form{
    border: 1px solid;
    border-radius: 5px;
    padding: 25px;
    width: 50%;
    max-width: 550px;
  }
  button {
    margin-top: 15px;
  }
</style>
