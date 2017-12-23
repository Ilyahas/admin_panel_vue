<template>
  <div>
    <section class="form">
      <fg-input type="text"
                label="Category Name"
                placeholder="Enter category name"
                v-model="categoryName">
      </fg-input>
    </section>
    <button class="btn btn-success" @click="saveCategory">Save</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        categoryName: ''
      }
    },
    methods: {
      saveCategory () {
        console.log(this.categoryName)
        this.$http.post('/api/addCategory', {categoryName: this.categoryName}).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
<style scoped>
  .form{
    border: 1px solid;
    border-radius: 5px;
    padding: 25px;
    width: 50%;
    max-width: 550px;
  }
  button {
    margin-top: 15px;
  }
</style>
