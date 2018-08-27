<template>
  <div id="calendar">
    <vue-event-calendar :events="events"
                        @month-changed="handleMonthChanged">
      <template scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item">
          <div class="eventItemData">
            <h3>{{event.title}}</h3>
            <hr>
            <h5>{{event.desc}}</h5>
          </div>
        </div>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
  let today = new Date()
  export default {
    data () {
      return {
        isEventEditable: false,
        events: []
      }
    },
    methods: {
      handleMonthChanged (data) {
        let dataArray = data.split('.')

        let eventMonth = {
          year: dataArray[1],
          month: parseInt(dataArray[0]).toString()
        }
        this.refreshEvents(eventMonth)
      },
      insertEventToArray (eventsToInsert) {
        this.events = []
        for (let i = 0; i < eventsToInsert.length; ++i) {
          this.events.push({
            date: eventsToInsert[i].year + '/' + eventsToInsert[i].month + '/' + eventsToInsert[i].day,
            title: eventsToInsert[i].title,
            desc: eventsToInsert[i].description
          })
          console.log(this.events);
        }
      },
      refreshEvents (eventMonth) {
        this.$http.post(this.$config.serverHost + '/api/getEvents', eventMonth).then((res) => {
          let eventArray = res.body.rows
          this.insertEventToArray(eventArray)
        }).catch((error) => {
          console.log('error: ', error)
        })
      }
    },
    created () {
      this.$EventCalendar.toDate(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)

      let eventMonth = {
        year: today.getFullYear().toString(),
        month: (today.getMonth() + 1).toString()
      }
      this.refreshEvents(eventMonth)
    }
  }
</script>

<style>
  #calendar {
    margin: 10px 0;
  }
  h1, h2, h3, hr {
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
    font-size: 1.5rem !important;
  }

  .activeDate {
    color: white;
    background-color: #2c3e50;
  }

  .input-event-text {
    margin-bottom: 10px;
  }
  .event-title, .event-desc {
    color: black;
    width: 100%;
  }

  .eventItemData {
    min-height: 40px;
  }


</style>
