<template>
  <div class="container container-margin">
    <div class="title">{{Contacts.title}}</div>
    <div class="article-content" v-html="Contacts.content"></div>

    <gmap-map
      :center="center"
      :zoom="15"
      style="height: 500px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        Contacts: {},
        center: {lat: 47.8194042, lng: 35.0524582},
        markers: [{
          position: {lat: 47.8197, lng: 35.0515}
        }]
      }
    },
    methods: {

    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getContacts').then((res) => {
        let isContactsExist = res.body.rows.length
        if (isContactsExist) {
          this.Contacts = res.body.rows[0]
        } else {
          this.$noty.error('Contacts does not exist')
          this.$router.push('/news')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/styles/GlobalVar";

  .title {
    font-size: $fontSizeTitle + 10px;
  }

  .article-content {
    font-size: $fontSizeTitle - 7px;
    line-height: 1.5;

    @include breakpoint(xs) {
      font-size: 18px;
      padding: 0 2%;
    }
  }
</style>
