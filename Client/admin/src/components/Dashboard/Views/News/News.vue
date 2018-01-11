<template>
  <div>
    <router-link class="btn btn-success btn-top" to="/news/add-news"><i class="ti-plus"></i></router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6" v-for="news in newsList">

        <div class="card">

          <div class="header">
            <h4 class="title">{{news.Title}}</h4>
          </div>

          <div class="content text-center">
            <img class="border-white section-card" v-bind:src="pathToCovers + news.CoverImgName">
            <hr>
            <div class="row row-edit">

              <div class="col-lg-6 col-sm-6 text-center">
                <router-link :to="{ path: '/photos/edit-section', query: {id: news.idnews}}"><i class="ti-pencil"></i> <span>Edit</span></router-link>
              </div>

              <div class="col-lg-6 col-sm-6 text-center">
                <button id="show-modal" @click="askConfirmation(news)" class="as-link"><i class="ti-close"></i> <span>Delete</span></button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import ModalComponent from '../ModalComponent.vue'

  export default {
    data () {
      return {
        pathToCovers: this.$config.pathToNewsCover,
        newsList: []
      }
    },
    method: {
      askConfirmation (news) {

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
        this.newsList = res.body
      }).catch((error) => {
        this.notify('Cannot get sections', 'ti-gallery', 'warning')
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">

</style>
