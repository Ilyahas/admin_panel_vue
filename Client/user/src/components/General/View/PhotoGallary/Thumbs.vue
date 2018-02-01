<template>
    <section id="thumbnails">
        <article v-for="(item, index) in items" v-bind:class="{ 'active': activeIndex == index }">
            <a class="thumbnail" v-on:click="selectImage(item, index)">
                <img v-bind:src="serverHost + photosImgPath + item.PhotoImgName" alt="" />
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
      serverHost: this.$config.serverHost,
      photosImgPath: '/img/photos/',
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
      this.$http.post(this.$config.serverHost + '/api/getPhotosBySectionId', {sectionId: obj.idPhotoSections}).then((res) => {
        let isPhotosExist = res.body.length
        if (isPhotosExist) {
          this.items = res.body
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
