<template>
  <div class="container container-margin">
    <div class="grid">
      <figure class="photoSection-item" v-for="(section, index) in listOfSections" :key="index" @click="goToSection(section.idPhotoSections)">
        <img :src="section.ImgData">
        <figcaption>
          <div class="title"><span>{{section.SectionName}}</span></div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        listOfSections: []
      }
    },
    methods: {
      goToSection (id) {
        this.$router.push({ path: '/photos', query: { id: id } })
      }
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getSections').then((res) => {
        let isSectionsExist = res.body.length
        if (isSectionsExist) {
          this.listOfSections = res.body
        } else {
          // notify: id is wrong
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

  .photoSection-item {
    height: 230px;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.35s;
    -webkit-transition: 0.35s;

    .title {
      padding: 10px;
      width: calc(100% - 10px);
      overflow: hidden;

      span {
      }
    }

    img {
      height: 230px;
      opacity: 0.7;
      -webkit-transition: 0.35s;
      transition: 0.35s;
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    &:hover {
      background: rgba(0, 0, 0, 0.8);
      transition: 0.35s;
      -webkit-transition: 0.35s;

      img {
        opacity: 0.5;
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
      }
    }

  }






</style>
