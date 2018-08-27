<template>
  <div id="app">
    <vue-event-calendar :events="events"
                        @day-changed="handleDayChanged"
                        @month-changed="handleMonthChanged">
      <template scope="props">
        <button class="btn btn-success btn-top add-event" v-show="!addNewEvent" @click="addNewEvent = true"><i class="ti-plus"></i></button>
        <div v-show="addNewEvent" >
          <div class="input-event-text"><label>Заголовок: </label><input type="text" v-model="newEvent.title" class="event-title"/></div>
          <div class="input-event-text"><label>Опис: </label><textarea v-model="newEvent.desc" class="event-desc"></textarea></div>
          <button class="btn btn-primary btn-top add-event" @click="addEvent"><i class="ti-check"></i> Додати</button>
          <button class="btn btn-danger btn-top add-event" @click="addNewEvent = false"><i class="ti-close"></i> Відмінити</button>
          <hr>
        </div>

        <div v-for="(event, index) in props.showEvents" class="event-item" v-show="showEvents">
          <div class="eventItemData">
            <div v-show="!event.editable">
              <span class="editEventBtn">
                <button class="btn btn-primary" @click="editEvent(event)"><i class="ti-pencil"></i></button>
              </span>
              <h3>{{event.title}}</h3>
              <hr>
              <h5>{{event.desc}}</h5>
            </div>
            <div v-show="event.editable">
              <span class="editEventBtn">
                <button class="btn btn-primary" @click="saveEventChanges(event)"><i class="ti-check"></i></button>
                <button class="btn btn-danger" @click="cancelEventChages(event)"><i class="ti-close"></i></button>
              </span>
              <input type="text" v-model="event.title"/>
              <hr>
              <textarea v-model="event.desc"></textarea>
            </div>
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
        showEvents: false,
        addNewEvent: false,
        isEventEditable: false,
        events: [],
        newEvent: {
          title: '',
          desc: '',
          year: '',
          month: '',
          day: ''
        }
      }
    },
    methods: {
      handleDayChanged (data) {
        let dateArray = data.date.split('/')

        this.showEvents = this.events[parseInt(dateArray[2]) - 1].date === data.date &&
          this.events[parseInt(dateArray[2]) - 1].title !== ''

        this.addNewEvent = false
        this.newEvent.title = ''
        this.newEvent.desc = ''
        this.newEvent.year = dateArray[0]
        this.newEvent.month = dateArray[1]
        this.newEvent.day = dateArray[2]
      },
      handleMonthChanged (data) {
        let monthStr = data.split('.')[0]
        if (monthStr < 10) {
          monthStr = monthStr.toString()[1]
        }
        console.log('month-changed', monthStr)
        for (let i = 0; i < 31; ++i) {
          this.events[i] = {date: `${today.getFullYear()}/${monthStr}/${i + 1}`, title: ''}
        }

        let eventMonth = {
          year: data.split('.')[1],
          month: parseInt(monthStr).toString()
        }
        this.refreshEvents(eventMonth)
      },
      getEventsByData (data) {
        this.$http.post(this.$config.serverHost + '/api/getEvents', data).then((res) => {
          let eventArray = res.body.rows
          for (let i = 0; i < eventArray.length; ++i) {
            this.events[parseInt(eventArray[i].day) - 1] = {
              date: `${eventArray[i].year}/${eventArray[i].month}/${eventArray[i].day}`, title: eventArray[i].title
            }
            if (eventArray[i].description !== '') {
              this.events[parseInt(eventArray[i].day) - 1].desc = eventArray[i].description
            }
          }
        }).catch((error) => {
          this.notify('Неможливо отримати новини', 'ti-pencil', 'warning')
          console.log('error: ', error)
        })
      },
      addEvent () {
        let eventData = {
          title: this.newEvent.title,
          description: this.newEvent.desc,
          year: this.newEvent.year,
          month: this.newEvent.month,
          day: this.newEvent.day
        }
        if (eventData.title === '') {
          this.notify('Заголовок не може бути пустим', 'ti-pencil', 'warning')
          return 0
        }
        this.addNewEvent = false
        this.newEvent.title = ''
        this.newEvent.desc = ''
        this.$http.post(this.$config.serverHost + '/api/addEvent', eventData).then((res) => {
          if (res.status === 200) {
            this.notify('Подія додана', 'ti-pencil', 'success')
          }
        }).catch((error) => {
          this.notify('Неможливо додати подію', 'ti-pencil', 'warning')
          console.log(error)
        })
      },
      editEvent (event) {
        event.editable = true
      },
      saveEventChanges (event) {
        event.editable = false
      },
      cancelEventChages (event) {
        event.editable = false
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
      },
      insertEvent (date, eventArray, index) {
        this.events[date] = {
          date: `${eventArray[index].year}/${eventArray[index].month}/${eventArray[index].day}`,
          title: eventArray[index].title,
          editable: false
        }
        if (eventArray[index].description !== '') {
          this.events[date].desc = eventArray[index].description
        }
      },
      refreshEvents (eventMonth) {
        this.$http.post(this.$config.serverHost + '/api/getEvents', eventMonth).then((res) => {
          let eventArray = res.body.rows
          for (let i = 0; i < eventArray.length; ++i) {
            if (this.events[parseInt(eventArray[i].day) - 1].title === '') {
              this.insertEvent(parseInt(eventArray[i].day) - 1, eventArray, i)
            } else {
              this.insertEvent(this.events.length, eventArray, i)
            }
          }
        }).catch((error) => {
          this.notify('Неможливо отримати новини', 'ti-pencil', 'warning')
          console.log('error: ', error)
        })
      }
    },
    created () {
      this.$EventCalendar.toDate(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)
      for (let i = 0; i < 31; ++i) {
        this.events[i] = {date: `${today.getFullYear()}/${today.getMonth() + 1}/${i + 1}`, title: ''}
      }

      let eventMonth = {
        year: today.getFullYear().toString(),
        month: (today.getMonth() + 1).toString()
      }
      this.refreshEvents(eventMonth)
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
    font-size: 2rem !important;
  }
  .item:hover {
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

  .editEventBtn {
    float: right;
  }

</style>
