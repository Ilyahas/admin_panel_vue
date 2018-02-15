<template>
    <div id="viewer">
        <div class="inner">
            <div class="nav-next" @click="selectNext()"></div>
            <div class="nav-previous" @click="selectPrev()"></div>
        </div>
        <div class="slide active" v-if="photo">
            <div class="caption">
                <h2>{{ photo.photo_title }}</h2>
            </div>
            <div class="image" :style='{ backgroundImage: "url(" + photo.img_data + ")", backgroundSize: "cover",  backgroundPosition: "center" }'>
            </div>
        </div>
    </div>
</template>

<script>
import {EventBus} from '../../../../event_bus'

export default {
  name: 'viewer',
  data () {
    return {
      photo: null
    }
  },
  created () {
    EventBus.$on('loaded', (obj) => {
      this.photo = obj
    })
  },
  methods: {
    selectNext () {
      EventBus.$emit('move', 1)
    },
    selectPrev () {
      EventBus.$emit('move', -1)
    }
  }
}
</script>
