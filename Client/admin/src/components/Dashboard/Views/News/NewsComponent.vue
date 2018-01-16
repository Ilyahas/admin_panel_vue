<template>
  <div class="card form">
    <div class="header">
      <h4 class="title">Add News</h4>
    </div>
    <div class="content">
      <div class="row">
        <div class="col-lg-4 col-sm-12">
          <fg-input type="text"
                    label="News Title"
                    placeholder="Enter News title"
                    v-model="title">
          </fg-input>
          <label>News Cover</label>
          <picture-input
            ref="pictureInput"
            v-bind:prefill="newsImg"
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
        </div>
        <div class="col-lg-8 col-sm-12">
          <label>News Text</label>
          <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
        </div>
      </div>
      <div class="text-center">
        <button v-if="isNewNews" class="btn btn-success btn-form-submit btn-wd" @click="addNews">Save</button>
        <button v-if="!isNewNews" class="btn btn-success btn-form-submit btn-wd" @click="saveNews">Update</button>
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
        newsImg: '',
        changedCoverNews: false,
        title: '',
        image: {},
        content: '',
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['image'], [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        isNewNews: true
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
      addNews () {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('News Title is too short', 'ti-info', 'warning')
          return
        }
        if (!this.changedCoverNews) {
          this.notify('News Cover cannot be empty', 'ti-info', 'warning')
          return
        }

        let newsData = {
          text: this.content,
          title: this.title,
          imgName: '',
          imgData: ''
        }
        // get name of the file
        for (let file of this.image) {
          if (file[0] === 'file') {
            newsData.imgName = file[1].name
          }
          if (file[0] === 'image') {
            newsData.imgData = file[1]
          }
        }
        console.log(newsData.imgData)
        this.$http.post(this.$config.serverHost + '/api/addNews', newsData).then((res) => {
          if (res.status === 200) {
            this.notify('News was successfully added', 'ti-check', 'success')
            this.$router.push('/news')
          }
        }).catch((error) => {
          this.notify('Cannot add news', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      saveNews () {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('News Title is too short', 'ti-info', 'warning')
          return
        }

        let newsData = {
          text: this.content,
          title: this.title,
          imgName: '',
          imgData: '',
          newsId: this.currentId,
          newImg: false
        }
        if (this.changedCoverNews) {
          newsData.newImg = true
          // get name of the file
          for (let file of this.image) {
            if (file[0] === 'file') {
              newsData.imgName = file[1].name
            }
            if (file[0] === 'image') {
              newsData.imgData = file[1]
            }
          }
        }
        this.$http.post(this.$config.serverHost + '/api/updateNews', newsData).then((res) => {
          if (res.status === 200) {
            this.notify('News was edit', 'ti-pencil', 'success')
            this.$router.push('/news')
          }
        }).catch((error) => {
          this.notify('Cannot update section', 'ti-pencil', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.pictureInput.image) {
          this.changedCoverNews = true
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
          data.append('image', this.$refs.pictureInput.image)
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
          })
      }
    },
    created () {
      if (this.currentId !== undefined) {
        this.isNewNews = false
      } else {
        this.newsImg = this.$config.defaultImg
      }
      if (!this.isNewNews) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.currentId}).then((res) => {
          let isNewsExist = res.body.length
          if (isNewsExist) {
            // init variables
            this.title = res.body[0].Title
            this.content = res.body[0].Text
            this.newsImg = this.base64toFile(res.body[0].ImgData.split(',')[1], res.body[0].CoverImgName)
          } else {
            this.notify('This News does not exist', 'ti-gallery', 'danger')
            this.$router.push('/news')
          }
        }).catch((error) => {
          this.notify('Cannot get news', 'ti-gallery', 'warning')
          console.log('error: ', error)
        })
      }
    }
  }
</script>
