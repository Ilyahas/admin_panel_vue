<template>
  <div class="card form">
    <div class="content">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <fg-input type="text"
                    label="Article Title"
                    placeholder="Enter Article title"
                    v-model="title">
          </fg-input>
        </div>
      </div>
      <div>
        <label>Article Text</label>
        <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
      </div>
      <div class="text-center">
        <button class="btn btn-success btn-form-submit btn-wd" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      currentId: String
    },
    data () {
      return {
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        title: '',
        content: ''
      }
    },
    methods: {
      save () {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('Article Title is too short', 'ti-info', 'warning')
          return
        }
        let articleData = {
          title: this.title,
          text: this.content
        }
        this.$http.post(this.$config.serverHost + '/api/updateArticlePage', articleData).then((res) => {
          if (res.status === 200) {
            this.notify('Page was updated', 'ti-pencil', 'success')
          }
        }).catch((error) => {
          this.notify('Cannot update page', 'ti-pencil', 'warning')
          console.log(error)
        })
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
      this.$http.get(this.$config.serverHost + '/api/getArticlePage').then((res) => {
        let isArticleExist = res.body.rows.length
        console.log(res.body.rows[0])
        if (isArticleExist) {
          // init variables
          this.title = res.body.rows[0].title
          this.content = res.body.rows[0].text
        } else {
          this.notify('The Article does not exist', 'ti-pencil', 'danger')
          this.$router.go(-1)
        }
      }).catch((error) => {
        this.notify('Cannot get the article', 'ti-pencil', 'warning')
        console.log('error: ', error)
      })
    }
  }
</script>
