<template>
  <div>
    <button @click="back" class="btn btn-top"><i class="ti-arrow-left"></i></button>

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
          <button class="btn btn-success btn-form-submit btn-wd" @click="saveNews">Save</button>
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
        title: '',
        image: '',
        content: '',
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['image'], [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ]
      }
    },
    components: {
      PictureInput
    },
    methods: {
      saveNews () {
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
          }
        }).catch((error) => {
          this.notify('Cannot add news', 'ti-plus', 'warning')
          console.log(error)
        })
      },
      onChange () {
        if (this.$refs.pictureInput.image) {
          let data = new FormData()
          data.append('file', this.$refs.pictureInput.file)
          this.image = data
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
