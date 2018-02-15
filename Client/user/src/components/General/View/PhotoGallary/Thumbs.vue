<template>
    <section id="thumbnails">
        <article v-for="(item, index) in items" v-bind:class="{ 'active': activeIndex == index }">
            <a class="thumbnail" v-on:click="selectImage(item, index)">
                <img v-bind:src="item.img_data" alt="" />
            </a>
            <h2>{{ item.title }}</h2>
            <div v-html="item.content"></div>
        </article>
    </section>
</template>

<script>
import {EventBus} from '../../../../event_bus'

export default {
  name: 'thumbs',
  data () {
    return {
      items: [],
      activeIndex: 0
    }
  },
  methods: {
    selectImage (itm, index) {
      EventBus.$emit('loaded', itm)
      this.activeIndex = index
    }
  },
  created () {
    EventBus.$on('section', (obj) => {
      this.$http.post(this.$config.serverHost + '/api/getPhotosBySectionId', {sectionId: obj.id_photo_sections}).then((res) => {
        let isPhotosExist = res.body.rows.length
        if (isPhotosExist) {
          this.items = res.body.rows
          this.selectImage(this.items[0], 0)
        } else {
          // notify: id is wrong
          // this.$router.push('/photo-sections')
        }
      }).catch((error) => {
        console.log(error)
      })
    })

    EventBus.$on('move', (dir) => {
      this.activeIndex = this.activeIndex + dir
      if (dir > 0 && this.activeIndex >= this.items.length) {
        this.activeIndex = 0
      }
      if (dir < 0 && this.activeIndex < 0) {
        this.activeIndex = this.items.length - 1
      }
      EventBus.$emit('loaded', this.items[this.activeIndex])
    })
  }
}
</script>
<style scoped lang="scss">
  @import "../../../../assets/sass/styles/GlobalVar";


  .photoAlbum #thumbnails article {
    @include breakpoint(xs) {
      width: 85%;
    }
  }

</style>
