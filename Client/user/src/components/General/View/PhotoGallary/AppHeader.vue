<template>
  <header id="header">
    <h1>{{ header }}</h1>
  </header>
</template>

<script>
import {EventBus} from '../../../../event_bus'

export default {
  name: 'app-header',
  data () {
    return {
      header: ''
    }
  },
  created () {
    EventBus.$on('section', (obj) => {
      this.header = obj.section_name
    })
  }
}
</script>
