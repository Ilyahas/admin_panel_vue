<template>
  <div id="app">
    <router-link class="btn btn-success btn-top" to="/news/add-news"><i class="ti-plus"></i></router-link>
    <vue-event-calendar
      :events="demoEvents"
      @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"
    ></vue-event-calendar>
  </div>
</template>

<script>
  let today = new Date()
  export default {
    name: 'app',
    data () {
      return {
        events: [],
        demoEvents: [{
          date: `${today.getFullYear()}/${today.getMonth() + 1}/15`,
          title: 'Title-1',
          desc: 'longlonglong description'
        }, {
          date: `${today.getFullYear()}/${today.getMonth() + 1}/24`,
          title: 'Title-2'
        }, {
          date: `${today.getFullYear()}/${today.getMonth() === 11 ? 1 : today.getMonth() + 2}/06`,
          title: 'Title-3',
          desc: 'description'
        }]
      }
    },
    methods: {
      handleDayChanged (data) {
        console.log(this.demoEvents)
        console.log('date-changed', data)
      },
      handleMonthChanged (data) {
        console.log('month-changed', data)
      }
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getEvents').then((res) => {
        let events = res.body.rows.length
        if (isArticleExist) {
          this.title = res.body.rows[0].title
          this.content = res.body.rows[0].content
        }
      }).catch((error) => {
        this.notify('Неможливо отримати сторінку', 'ti-pencil', 'warning')
        console.log('error: ', error)
      })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
  }
  h1, h2, h3 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .t-center{
    text-align: center;
    margin: 20px;
  }
  .cal-wrapper, .date-num, .item{
    font-size: 2rem !important;
  }

</style>
