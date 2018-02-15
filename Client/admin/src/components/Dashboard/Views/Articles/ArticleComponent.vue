<template>
  <div class="card form">
    <div class="content">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <fg-input type="text"
                    label="Page Title"
                    placeholder="Enter Page title"
                    v-model="title">
          </fg-input>
        </div>
      </div>
      <div>
        <label>Page Text</label>
        <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
      </div>
      <div class="text-center">
        <button v-if="isNewArticle" class="btn btn-success btn-form-submit btn-wd" @click="saveArticle('/api/addArticle')">Save</button>
        <button v-if="!isNewArticle" class="btn btn-success btn-form-submit btn-wd" @click="saveArticle('/api/updateArticle')">Update</button>
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
          ['image'], [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        title: '',
        content: '',
        isNewArticle: true
      }
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
      saveArticle (strUrl) {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('Article Title is too short', 'ti-info', 'warning')
          return
        }
        let articleData = {}
        if (this.isNewArticle) {
          articleData = {
            title: this.title,
            text: this.content,
            date: this.getTodayDate()
          }
        } else {
          articleData = {
            title: this.title,
            text: this.content,
            articleId: this.currentId
          }
        }
        this.$http.post(this.$config.serverHost + strUrl, articleData).then((res) => {
          if (res.status === 200) {
            this.notify('Page was updated', 'ti-pencil', 'success')
            this.$router.push('/articles')
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
      if (this.currentId !== undefined) {
        this.isNewArticle = false
      }
      if (!this.isNewArticle) {
        this.$http.post(this.$config.serverHost + '/api/getArticleById', {articleId: this.currentId}).then((res) => {
          let isArticleExist = res.body.rows.length
          if (isArticleExist) {
            // init variables
            this.title = res.body.rows[0].title
            this.content = res.body.rows[0].content
          } else {
            this.notify('The Article does not exist', 'ti-gallery', 'danger')
            this.$router.go(-1)
          }
        }).catch((error) => {
          this.notify('Cannot get the article', 'ti-gallery', 'warning')
          console.log('error: ', error)
        })
      }
    }
  }
</script>
