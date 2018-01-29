<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
        <div class="login100-form validate-form">
					<span class="login100-form-title p-b-33">
						Admin Panel
					</span>

          <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="login" placeholder="Login" v-model="userlogin">
            <span class="focus-input100-1"></span>
            <span class="focus-input100-2"></span>
          </div>

          <div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
            <input class="input100" type="password" name="password" placeholder="Password" v-model="password">
            <span class="focus-input100-1"></span>
            <span class="focus-input100-2"></span>
          </div>

          <div class="container-login100-form-btn m-t-20">
            <button class="login100-form-btn" @click="submit">
              Sign in
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userlogin: '',
      password: '',
      host: 'http://localhost:3000'
    }
  },
  methods: {
    submit () {
      if (this.userlogin === '') {
        this.$noty.warning('Login is empty')
        return
      }
      if (this.password === '') {
        this.$noty.warning('Password is empty')
        return
      }
      this.$http.post(this.host + '/login', {login: this.userlogin, password: this.password}).then((res) => {
        if (res.status === 200) {
          window.location.href = this.host + '/admin'
        }
      }).catch((error) => {
        this.$noty.error('Some server problem, Try later')
        console.log(error)
      })
    }
  }
}
</script>
