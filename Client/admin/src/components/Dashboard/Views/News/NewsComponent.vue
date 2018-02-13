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
        newsImgPath: '/img/news/',
        newsImg: '',
        changedCoverNews: false,
        title: '',
        image: {},
        content: '',
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        isNewNews: true
      }
    },
    components: {
      PictureInput
    },
    methods: {
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
        let newsData = {}
        if (this.isNewNews) {
          newsData = {
            text: this.content,
            title: this.title,
            imgName: '',
            date: this.getTodayDate()
          }
          // get name of the file
          for (let file of this.image) {
            if (file[0] === 'file') {
              newsData.imgName = file[1].name
            }
          }
        } else {
          newsData = {
            text: this.content,
            title: this.title,
            imgName: '',
            newsId: this.currentId,
            isNewImg: false
          }
          if (this.changedCoverNews) {
            newsData.isNewImg = true
            // get name of the file
            for (let file of this.image) {
              if (file[0] === 'file') {
                newsData.imgName = file[1].name
              }
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
          if (this.isNewNews || newsData.isNewImg) {
            this.$http.post(this.$config.serverHost + '/api/addNewsFile', this.image).then((res) => {
              this.successUpload()
            }).catch((error) => {
              this.notify('Cannot upload image', 'ti-import', 'warning')
              console.log(error)
            })
          } else {
            this.successUpload()
          }
        }).catch((error) => {
          this.notify('Cannot add news', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.pictureInput.image) {
          this.changedCoverNews = true
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
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
        this.newsImg = this.$config.serverHost + this.$config.defaultImg
      }
      if (!this.isNewNews) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.currentId}).then((res) => {
          let isNewsExist = res.body.rows.length
          if (isNewsExist) {
            // init variables
            this.title = res.body.rows[0].title
            this.content = res.body.rows[0].text
            this.newsImg = this.$config.serverHost + this.newsImgPath + res.body.rows[0].imgname
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
