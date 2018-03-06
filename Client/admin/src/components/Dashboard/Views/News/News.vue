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
                <router-link :to="{ path: '/news/edit-news', query: {id: news.id_news}}"><i class="ti-pencil"></i> <span>Редагувати</span></router-link>
              </div>
              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(news)" class="as-link"><i class="ti-close"></i> <span>Видалити</span></button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more"></span>
      </infinite-loading>
    </div>

    <modal-component v-if="showModal">
      <h3 slot="header">Видалити "{{selectedNews.title}}"?</h3>
      <div slot="footer">
        <button class="modal-default-button btn btn-success" @click="showModal = false">Відміна</button>
        <button class="modal-default-button btn" @click="deleteNews">Так</button>
      </div>
    </modal-component>

  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        TOP_NEWS_NUMBER: 12,
        isMoreNewsForLoad: true,
        newsImg: this.$config.imagesHost + this.$config.defaultImg,
        newsList: [],
        selectedNews: {},
        showModal: false
      }
    },
    methods: {
      infiniteHandler ($state) {
        let fromLoadNewsIndex = this.newsList.length

        if (this.isMoreNewsForLoad) {
          this.$http.post(this.$config.serverHost + '/api/getTopNews', {
            topNumber: this.TOP_NEWS_NUMBER,
            fromNumber: fromLoadNewsIndex
          }).then((res) => {
            let isNewsExist = res.body.rows.length
            if (isNewsExist) {
              this.newsList = this.newsList.concat(res.body.rows)
              $state.loaded()
            } else {
              this.isMoreNewsForLoad = false
              $state.complete()
            }
          }).catch((error) => {
            console.log(error)
            $state.complete()
          })
        }
      },
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
          this.notify('Неможливо видалити новину', 'ti-trash', 'warning')
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
      ModalComponent,
      InfiniteLoading
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
