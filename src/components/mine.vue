<template>
<div class="mine">
  <div class="login" v-if="username">
    <div class="touxiang">
      <img src="../assets/touxiang.jpg" alt="">
      <span class="username">{{username}}</span>
    </div>
    <div class="device">
      <span>我的设备</span>
      <img src="../assets/more.svg" alt="">
    </div>
    <div class="device">
      <span>自定义房间</span>
      <img src="../assets/more.svg" alt="">
    </div>
    <div class="device">
      <span>自定义颜色</span>
      <img src="../assets/more.svg" alt="">
    </div>
  </div>
  <div class="wrapper" v-else>
    <div class="username">
      用户名：<el-input size="large"></el-input>
    </div>
    <div class="password">
      密码：<el-input size="large" type="password"></el-input>
    </div>
    <el-button class="login-btn" type="primary">登录</el-button>
    <span class="signup">没有账号？<span style="color: red;">点击注册</span></span>
  </div>
</div>
</template>

<script>
  import store from '../store/store'
  export default {
    data() {
      return {

      }
    },
    computed: {
      username: () => store.state.username
    }
  }
</script>

<style scoped>
  .wrapper {
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
  .signup {
    font-size: 1.2rem;
    margin-top: -4rem;
  }
  .login {
    /* display: flex;
    flex-direction: cloumn; */
    width: 100vw;
  }
  .login .touxiang {
    display: flex;
    height: 15rem;
    width: 100%;
    justify-content: space-around;
    font-size: 4.5rem;
    line-height: 9rem;
    border-bottom: 2px solid #ccc;
    padding: 3rem 3rem;
    box-sizing: border-box;
  }
  .login .touxiang img {
      height: 10rem;
      border: 1px solid #ccc;
      border-radius: 50%;
  }
  .login .touxiang .username {
    width: 12rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .login .device {
    display: flex;
    justify-content: space-between;
    height: 8rem;
    border-bottom: 2px solid #ccc;
    align-items: center;
    font-size: 3rem;
    padding: 0 2rem 0 4rem;
  }
  .login .device img {
    height: 5rem;
  }
</style>