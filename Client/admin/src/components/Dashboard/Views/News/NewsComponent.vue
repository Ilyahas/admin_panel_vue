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
            v-bind:prefill="newsImgPath"
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
        <button v-if="!isNewNews" class="btn btn-success btn-form-submit btn-wd" @click="saveNews">Save</button>
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
        newsImgPath: this.$config.defaultImg,
        pathToSectionCovers: this.$config.pathToNewsCover,
        changedCoverNews: false,
        title: '',
        image: '',
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
      addNews () {
        if (this.title === '') {
          this.notify('News Title cannot be empty', 'ti-info', 'warning')
          return
        }
        if (this.$refs.pictureInput.image === undefined) {
          this.notify('News Cover cannot be empty', 'ti-info', 'warning')
          return
        }
        this.onChange()
        this.$http.post(this.$config.serverHost + '/api/uploadNewsCover', this.image).then((res) => {
          if (res.status === 200) {
            this.addNewsData()
          }
        }).catch((error) => {
          this.notify('Cannot add news', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      addNewsData () {
        let newsData = {
          text: this.content,
          title: this.title,
          imgName: ''
        }
        // get name of the file
        for (let file of this.image) {
          newsData.imgName = file[1].name
        }
        this.$http.post(this.$config.serverHost + '/api/addNewsData', newsData).then((res) => {
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
        if (this.sectionName === '') {
          this.notify('Section Name cannot be empty', 'ti-info', 'warning')
          return
        }
        if (this.changedCoverNews) {
          this.$http.post(this.$config.serverHost + '/api/uploadSectionCover', this.sectionImg).then((res) => {
            if (res.status === 200) {
              this.saveNewsData()
            }
          })
        } else {
          // QUESTION ABOUT THIS THREE LINES ???????????????????????????????
          let data = new FormData()
          data.append('file', this.$refs.sectionCoverImgInput.file)
          this.sectionImg = data

          this.saveNewsData()
        }
      },
      saveNewsData () {
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
      }
      if (this.isNewNews) {
        this.$http.post(this.$config.serverHost + '/api/getNewsById', {newsId: this.currentId}).then((res) => {
          let isNewsExist = res.body.length
          if (isNewsExist) {
            this.title = res.body[0].Title
            this.newsImgPath = this.$config.pathToNewsCover + res.body[0].CoverImgName
          } else {
            this.notify('This News does not exist', 'ti-gallery', 'danger')
            this.$router.push('/news')
          }
        }).catch((error) => {
          this.notify('Cannot get news', 'ti-gallery', 'warning')
          console.log(error)
        })
      }
    }
  }
</script>
