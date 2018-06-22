<template>
<div class="mine">
  <div class="login" v-if="username">
    <div class="touxiang">
      <img src="../assets/touxiang.jpg" alt="">
      <span class="username">{{username}}</span>
    </div>
    <div class="device" @click="goList">
      <span>我的设备</span>
      <img src="../assets/more.svg" alt="">
    </div>
    <div class="device" @click="addRoom">
      <span>自定义房间</span>
      <img src="../assets/more.svg" alt="">
    </div>
    <div class="device">
      <span>自定义颜色</span>
      <img src="../assets/more.svg" alt="">
    </div>
    <el-button class="logout" type="danger" @click="logout">退出登录</el-button>
  </div>
  <div class="wrapper" v-else>
    <div class="username">
      用户名：<el-input size="large" v-model="logUsername"></el-input>
    </div>
    <div class="password">
      密码：<el-input size="large" type="password" v-model="logPassword"></el-input>
    </div>
    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
    <span class="signup">没有账号？<span style="color: red;" @click="signup">点击注册</span></span>
  </div>
</div>
</template>

<script>
  import store from '../store/store'
  export default {
    data() {
      return {
        logUsername: '',
        logPassword: ''
      }
    },
    computed: {
      username: () => store.state.username
    },
    methods: {
      logout() {
        store.commit('setUsername', '')
        store.commit('setDevice', [])
        this.$router.go('/')
      },
      signup() {
        this.$router.push('signup')
      },
      goList() {
        this.$router.push({path: 'devList', query: {dev: 'online'}})
      },
      login() {
        let $this = this;
        if (this.logUsername === 'zcy' && this.logPassword === 'zcy') {
          store.commit('setUsername', 'zcy')
          store.commit('setDevice', [{
      name: '客厅的灯',
      room: '客厅',
      type: 1,
      value: null,
      switch: true,
      online: true
    }, {
      name: '卫生间的灯',
      room: '卫生间',
      type: 1,
      value: null,
      switch: false,
      online: true
    }, {
      name: '阳台的灯',
      room: '阳台',
      type: 1,
      value: null,
      switch: false,
      online: true
    }, {
      name: '阳台的温度计',
      room: '阳台',
      type: 2,
      value: '23°C',
      switch: true,
      online: true
    }, {
      name: '客厅的电视',
      room: '客厅',
      type: 3,
      value: null,
      switch: false,
      online: true
    }, {
      name: '卧室的电视',
      room: '卧室',
      type: 3,
      value: null,
      switch: true,
      online: true
    }, {
      name: '厨房的锅',
      room: '厨房',
      type: 3,
      value: null,
      switch: true,
      online: true
    }, {
      name: '卧室2的灯',
      room: '卧室2',
      type: 1,
      value: null,
      switch: true,
      online: true
    }])
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          setTimeout(() => {
            $this.$router.go(0)
          }, 500);
        }
      },
      addRoom() {
        this.$router.push('/editRoom')
      }
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
    font-size: 2.5rem;
    padding: 0 2rem 0 4rem;
  }
  .login .device img {
    height: 5rem;
  }
  .login .logout {
    width: 23rem;
    height: 6rem;
    font-size: 3rem;
    margin-top: 3rem;
  }
</style>
