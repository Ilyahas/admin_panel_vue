<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/articles/add-article"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="article in listOfArticles">

        <div class="card">
          <div class="header">
            <h4 class="title">{{article.Title}}</h4>
            <span class="title-date">{{article.Date}}</span>
          </div>
          <div class="content">
            <div class="article-content" v-html="article.Text"></div>
            <hr>
            <div class="row row-edit">
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: '/articles/edit-article', query: {id: article.idArticles}}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>
              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(article)" class="as-link"><i class="ti-close"></i> <span>Delete</span></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <modal-component v-if="showModal">
      <h3 slot="header">Delete "{{selectedArticle.Title}}"?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
        <button class="modal-default-button btn" @click="deleteArticle">OK</button>
      </div>
    </modal-component>
  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'

  export default {
    data () {
      return {
        showModal: false,
        listOfArticles: [],
        selectedArticle: {}
      }
    },
    components: {
      ModalComponent
    },
    methods: {
      askConfirmation (article) {
        this.selectedArticle = article
        this.showModal = true
      },
      deleteArticle () {
        this.$http.post(this.$config.serverHost + '/api/deleteArticle', {articleId: this.selectedArticle.idArticles}).then((res) => {
          if (res.status === 200) {
            this.notify('Article was deleted', 'ti-trash', 'success')
            this.listOfArticles.splice(this.listOfArticles.indexOf(this.selectedArticle), 1)
          }
        }).catch((error) => {
          this.notify('Cannot delete article', 'ti-trash', 'warning')
          console.log(error)
        })
        this.showModal = false
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
      this.$http.get(this.$config.serverHost + '/api/getArticles').then((res) => {
        this.listOfArticles = res.body
      }).catch((error) => {
        this.notify('Cannot get sections', 'ti-gallery', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">

  .title {
    height: 50px;
    overflow: hidden;
  }

  .article-content {
    height: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
