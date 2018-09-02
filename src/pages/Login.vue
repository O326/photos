<template>
  <div class="login-page">
    <h1>登录</h1>
    <input type="text" v-model="account" placeholder="请输入账号" />
    <input type="text" v-model="pwd" placeholder=" 请输入密码" />
    <button @click="onSubmit">登录</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      account: '',
      pwd: ''
    }
  },
  mounted () {

  },
  methods: {
    onSubmit () {
      const LOGIN_URL = '//webhostapi.000webhostapp.com/database/login.php'
      const { account, pwd } = this
      if (!account || !pwd) {
        alert('请输入密码或账号')
        return
      }
      axios.get(`${LOGIN_URL}?account=${account}&pwd=${pwd}`).then(res => {
        if (res.data === 'SUCCESS') {
          localStorage.setItem('last_login_time', +new Date())
          this.$router.back()
        } else {
          alert(res.data)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photo-content {
  width: 800px;
  margin: 0 auto;
}
</style>
