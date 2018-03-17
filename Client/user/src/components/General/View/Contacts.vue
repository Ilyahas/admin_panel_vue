<template>
  <div class="container container-margin">
    <div class="title">{{Contacts.title}}</div>
    <div class="article-content" v-html="Contacts.content"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        Contacts: {}
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
