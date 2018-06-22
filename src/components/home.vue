<template>
  <div class="wrapper">
    <!-- 天气部分开始 -->
    <div class="weather">
      <div class="date">
        <span class="date-info">{{date}}</span>
        <span>{{weather}}</span>
      </div>
      <div class="weather-info">
        <span>哈尔滨市</span>
        <span class="tem">{{now}}</span>
      </div>
    </div>
    <!-- 在线设备开始 -->
    <div class="online-dev" @click="goDevList('online')" v-if="onlineDev.length">
      <div class="dev-wrapper">
        <div class="title">
        在线设备数:{{this.onlineDev.length}}
        </div>
        <div class="items">
          <span>照明设备：{{this.online.light}}</span>
          <span>测量设备：{{this.online.measure}}</span>
          <span>其他设备：{{this.online.other}}</span>
        </div>
      </div>
      <img src="../assets/more.svg" alt="">
    </div>
    <!-- 运行设备开始 -->
    <div class="online-dev"  @click="goDevList('on')" v-if="onDev.length">
      <div class="dev-wrapper">
        <div class="title">
        运行设备数:{{this.onDev.length}}
        </div>
        <div class="items">
          <span>照明设备：{{this.on.light}}</span>
          <span>测量设备：{{this.on.measure}}</span>
          <span>其他设备：{{this.on.other}}</span>
        </div>
      </div>
      <img src="../assets/more.svg" alt="">
    </div>
    <!-- 测量设备开始 -->
    <div class="online-dev"  @click="goDevList('measure')" v-if="measureDev.length">
      <div class="dev-wrapper">
        <div class="title">
        测量设备
        </div>
        <div class="items">
          <span v-for="item in this.measureDev">
            {{item.name}}：{{item.value}}
          </span>
        </div>
      </div>
      <img src="../assets/more.svg" alt="">
    </div>
    <el-button class="addDev" type="primary" @click="dialogShow = true">添加新设备</el-button>
    <!--对话框-->
    <el-dialog
      title="添加新设备"
      :visible.sync="dialogShow"
      width="85%">
      <div class="dialog-wrapper">
        <el-row>
          <el-col :span="12">设备名称：</el-col>
          <el-col  :span="12"><el-input v-model="addName"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">设备房间：</el-col>
          <el-col  :span="12">
            <el-select v-model="addRoom">
              <el-option
                v-for="item in rooms"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">设备类型：</el-col>
          <el-col  :span="12">
            <el-select v-model="addType" placeholder="请选择">
              <el-option
                v-for="item in devType"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="addDev">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import store from '../store/store'
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    data() {
      return {
        date: '2018年6月19日',
        weather: '',
        now: '',
        dialogShow: false,
        addName: '',
        addRoom: '',
        devType: [{
          name: '照明设备',
          type: 1
        }, {
          name: '测量设备',
          type: 2
        }, {
          name: '其他设备',
          type: 3
        }],
        addType: '',
      }
    },
    mounted() {
      let $this = this
      let date = new Date()
      $this.date = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      this.$http.get('https://www.easy-mock.com/mock/5b179caf9b96bf2b03752e42/cloud/weather').then((res) => {
        let data = res.body.data
        $this.weather = data.weather + data.tem
        $this.now = data.now
      })
    },
    computed: {
      onlineDev: () => store.getters.onlineDev,
      lightDev: () => store.getters.lightDev,
      measureDev: () => store.getters.measureDev,
      otherDev: () => store.getters.otherDev,
      onDev: () => store.getters.onDev,
      rooms: () => store.getters.rooms,
      username: () => store.getters.username,
      online() {
        let light = 0;
        let measure = 0;
        let other = 0;
        let arr = this.onlineDev;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 1) {
            light++
          } else if (arr[i].type === 2) {
            measure++
          } else {
            other++
          }
        }
        return {
          light,
          measure,
          other
        }
      },
      on() {
        let light = 0;
        let measure = 0;
        let other = 0;
        let arr = this.onDev;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 1) {
            light++
          } else if (arr[i].type === 2) {
            measure++
          } else {
            other++
          }
        }
        return {
          light,
          measure,
          other
        }
      }
    },
    methods: {
      goDevList(i) {
        this.$router.push({path: 'devList', query:{dev: i}})
      },
      addDev() {
        let $this = this;
        if (!this.addName) {
          this.$message({
            message: '请输入设备名',
            type: 'error'
          })
          return
        }
        if (!this.addType) {
          this.$message({
            message: '请选择设备类型',
            type: 'error'
          })
          return
        }
        let dev = {
          name: this.addName,
          room: this.addRoom,
          type: this.addType,
          value: null,
          switch: true,
          online: true
        }
        store.commit('addDevice', dev)
        this.dialogShow = false
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        setTimeout(() => {
          $this.$router.go(0)
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .el-container {
    height: 95vh;
  }
  .weather {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    border-bottom: 2px solid #ccc;
  }
  .weather div{
    display: flex;
    flex-direction: column;
    height: 6rem;
    justify-content: space-between;

  }
  .weather div span.date-info {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .weather div span.tem {
    font-weight: bold;
    font-size: 3rem;
  }

  .online-dev {
    display: flex;
    height: 9rem;
    padding: 1rem;
    padding-left: 4rem;
    border-bottom: 2px solid #ccc;
    justify-content: space-between;
    align-items:center;
  }
  .online-dev .dev-wrapper{
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .online-dev .title {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 3rem;
  }
  .online-dev .items {
    display: flex;
    flex-direction: column;
  }
  .online-dev img {
    height: 5rem;
  }
  .addDev {
    height: 5rem;
    width: 80vw;
    margin-top: 3rem;
    font-size: 2rem;
  }
  .dialog-wrapper .el-row {
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 40px;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-around;
  }
</style>
