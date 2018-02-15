<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/news/add-news"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="news in newsList">

        <div class="card">
          <div class="header">
            <h4 class="title">{{news.title}}</h4>
            <span class="title-date">{{news.created_date}}</span>
          </div>
          <div class="content">
            <div class="text-center">
              <img class="border-white section-card" v-bind:src="news.img_data">
            </div>
            <div class="news-content" v-html="news.content">
            </div>
            <hr>
            <div class="row row-edit">
              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: '/news/edit-news', query: {id: news.id_news}}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>
              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(news)" class="as-link"><i class="ti-close"></i> <span>Delete</span></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <modal-component v-if="showModal">
      <h3 slot="header">Delete "{{selectedNews.title}}"?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Cancel</button>
        <button class="modal-default-button btn" @click="deleteNews">OK</button>
      </div>
    </modal-component>

  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'

  export default {
    data () {
      return {
        newsImg: this.$config.imagesHost + this.$config.defaultImg,
        newsList: [],
        selectedNews: {},
        showModal: false
      }
    },
    methods: {
      askConfirmation (news) {
        this.selectedNews = news
        this.showModal = true
      },
      deleteNews () {
        this.$http.post(this.$config.serverHost + '/api/deleteNews', {newsId: this.selectedNews.id_news}).then((res) => {
          if (res.status === 200) {
            this.notify('News was deleted', 'ti-trash', 'success')
            this.newsList.splice(this.newsList.indexOf(this.selectedNews), 1)
          }
        }).catch((error) => {
          this.notify('Cannot delete news', 'ti-trash', 'warning')
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
    components: {
      ModalComponent
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getNews').then((res) => {
        this.newsList = res.body.rows
      }).catch((error) => {
        this.notify('Cannot get sections', 'ti-gallery', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">

  .content{
    overflow: hidden;
  }

  .news-content {
    padding: 0 3px;
    overflow: hidden;
    height: 64px;
    width: 100%;
  }

  .title {
    display: block;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }


</style>
