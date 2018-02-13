<template>
  <div class="card form">
    <div class="content">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <fg-input type="text"
                    label="Section Title"
                    placeholder="Enter Section title"
                    v-model="title">
          </fg-input>
        </div>
      </div>
      <div>
        <label>Page Text</label>
        <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
      </div>
      <div class="text-center">
        <button v-if="isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('/api/addMainPageSection')">Save</button>
        <button v-if="!isNewSection" class="btn btn-success btn-form-submit btn-wd" @click="saveSection('/api/updateMainPageSection')">Update</button>
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
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }]
        ],
        title: '',
        content: '',
        isNewSection: true
      }
    },
    methods: {
      getTodayDate () {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        if (dd < 10) {
          dd = '0' + dd
        }

        if (mm < 10) {
          mm = '0' + mm
        }

        today = dd + '-' + mm + '-' + yyyy
        return today
      },
      saveSection (strUrl) {
        let isTitleValid = this.title.length > 3
        if (!isTitleValid) {
          this.notify('Section Title is too short', 'ti-info', 'warning')
          return
        }
        let sectionData = {}
        if (this.isNewSection) {
          sectionData = {
            title: this.title,
            text: this.content
          }
        } else {
          sectionData = {
            title: this.title,
            text: this.content,
            mainPageSectionId: this.currentId
          }
        }
        this.$http.post(this.$config.serverHost + strUrl, sectionData).then((res) => {
          if (res.status === 200) {
            this.notify('Section was updated', 'ti-pencil', 'success')
            this.$router.go(-1)
          }
        }).catch((error) => {
          this.notify('Cannot update section', 'ti-pencil', 'warning')
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
      if (this.currentId !== undefined) {
        this.isNewSection = false
      }
      if (!this.isNewSection) {
        this.$http.post(this.$config.serverHost + '/api/getMainPageSectionById', {mainPageSectionId: this.currentId}).then((res) => {
          let isSectionExist = res.body.rows.length
          if (isSectionExist) {
            // init variables
            this.title = res.body.rows[0].title
            this.content = res.body.rows[0].text
          } else {
            this.notify('The Section does not exist', 'ti-gallery', 'danger')
            this.$router.go(-1)
          }
        }).catch((error) => {
          this.notify('Cannot get the section', 'ti-gallery', 'warning')
          console.log('error: ', error)
        })
      }
    }
  }
</script>
