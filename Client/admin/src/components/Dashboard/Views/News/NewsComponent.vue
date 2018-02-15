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
            :crop="false"
            v-bind:prefill="newsImg"
            @change="onChange"
            width="640"
            height="480"
            margin="16"
            accept="image/jpeg,image/png"
            size="15"
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
        <button v-if="isNewNews" class="btn btn-success btn-form-submit btn-wd" @click="saveNews('addNews')">Save</button>
        <button v-if="!isNewNews" class="btn btn-success btn-form-submit btn-wd" @click="saveNews('updateNews')">Update</button>
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
        newsImg: this.$config.serverHost + this.$config.defaultImg,
        imgBase64: '',
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
      getTodayDate () {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        if (dd < 10) {
          dd = '0' + dd
        }

        if (mm < 10) {
          mm = '0' + mm
        }

        today = dd + '-' + mm + '-' + yyyy
        return today
      },
      validFields () {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('News Title is too short', 'ti-info', 'warning')
          return false
        }
        if (!this.changedCoverNews && this.isNewNews) {
          this.notify('News Cover cannot be default', 'ti-info', 'warning')
          return false
        }
        return true
      },
      getNewsData () {
        let newsData = {
          title: this.title,
          text: this.content,
          imgName: '',
          imgData: '',
          newsId: this.currentId,
          date: this.getTodayDate(),
          isNewImg: false
        }
        if (!this.isNewNews && this.changedCoverNews) {
          newsData.isNewImg = true
          for (let file of this.image) {
            if (file[0] === 'file') {
              newsData.imgName = file[1].name
            }
            if (file[0] === 'data') {
              newsData.imgData = file[1]
            }
          }
        }
        return newsData
      },
      successUpload () {
        this.notify('News was successfully added', 'ti-check', 'success')
        this.$router.push('/news')
      },
      saveNews (path) {
        if (!this.validFields()) { return }
        let newsData = this.getNewsData()
        this.$http.post(this.$config.serverHost + '/api/' + path, newsData).then((res) => {
          this.successUpload()
        }).catch((error) => {
          this.notify('Cannot add news', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.pictureInput.image !== this.imgBase64) {
          this.changedCoverNews = true
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
          data.append('data', this.$refs.pictureInput.image)
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
      }
      if (!this.isNewNews) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.currentId}).then((res) => {
          let isNewsExist = res.body.rows.length
          if (isNewsExist) {
            // init variables
            this.title = res.body.rows[0].title
            this.content = res.body.rows[0].content
            this.imgBase64 = res.body.rows[0].img_data
            this.newsImg = this.base64toFile(this.imgBase64.split(',')[1], res.body.rows[0].img_name)
          } else {
            this.notify('This News does not exist', 'ti-gallery', 'danger')
          }
        }).catch((error) => {
          this.notify('Cannot get news', 'ti-gallery', 'warning')
          console.log('error: ', error)
        })
      }
    }
  }
</script>
