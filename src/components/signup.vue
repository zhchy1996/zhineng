<template>
  <div class="signup">
    <div class="username">
      用户名：<el-input size="large" v-model="username"></el-input>
    </div>
    <div class="password">
      密码：<el-input size="large" type="password" v-model="password"></el-input>
    </div>
    <div class="password">
      确认密码：<el-input size="large" type="password" v-model="surePassword"></el-input>
    </div>
    <el-button class="login-btn" type="primary" @click="signup">注册</el-button>
  </div>
</template>

<script>
  import store from '../store/store'
  export default {
    data() {
      return {
        password: '',
        surePassword: '',
        username: ''
      }
    },
    methods: {
      signup() {
        if (!this.username) {
          this.$message({
            message: '请输入用户名',
            type: 'error'
          })
          return
        }
        if (this.password === this.surePassword) {
          store.commit('setUsername', this.username)
          this.$router.push('/')
        } else {
          this.$message({
            message: '两次输入密码不一致',
            type: 'error'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .signup {
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 5rem 1rem;
    text-align: left;
    font-size: 2.5rem;
  }
  .el-input{
    width: 15rem;
  }
  .login-btn{
    width: 50%;
    height: 4.5rem;
    font-size: 2rem;
  }
</style>
