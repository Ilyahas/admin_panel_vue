<template>
  <div class="card form">
    <div class="content">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <fg-input type="text"
                    label="Заголовок для сторінки"
                    placeholder="Введіть заголовок"
                    v-model="title">
          </fg-input>
        </div>
      </div>
      <div>
        <label>Текст сторінки</label>
        <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
      </div>
      <div class="text-center">
        <button class="btn btn-success btn-form-submit btn-wd" @click="save">Зберегти</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      currentId: String
    },
    data () {
      return {
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['image'], [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        title: '',
        content: ''
      }
    },
    methods: {
      save () {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('Заголовок сторінки закороткий', 'ti-info', 'warning')
          return
        }
        let contactsData = {
          title: this.title,
          content: this.content
        }
        this.$http.post(this.$config.serverHost + '/api/updateContacts', contactsData).then((res) => {
          if (res.status === 200) {
            this.notify('Сторінка оновлена', 'ti-pencil', 'success')
          }
        }).catch((error) => {
          this.notify('Неможливо оновити сторінку', 'ti-pencil', 'warning')
          console.log(error)
        })
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
      }
    },
    created () {
      this.$http.get(this.$config.serverHost + '/api/getContacts').then((res) => {
        let isContactsExist = res.body.rows.length
        if (isContactsExist) {
          // init variables
          this.title = res.body.rows[0].title
          this.content = res.body.rows[0].content
        } else {
          this.notify('Такої сторінки не існує', 'ti-pencil', 'danger')
          this.$router.go(-1)
        }
      }).catch((error) => {
        this.notify('Неможливо отримати сторінку', 'ti-pencil', 'warning')
        console.log('error: ', error)
      })
    }
  }
</script>
