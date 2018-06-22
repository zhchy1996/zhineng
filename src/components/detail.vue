<template>
  <div>
    <my-header title="设备详情"></my-header>
    <div class="detail">
      <div class="header">
        <div>
          设备名称:
          <el-input v-model="devName" :placeholder="devName" @change="reName"></el-input>
        </div>
        <el-select  v-model="devRoom" placeholder="请选择" @change="reRoom">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <!--控制部分-->
      <div class="control" v-if="dev.type !== 2">
        <div v-for="item in controls" class="control-item" @click="getControl">
          {{item}}
        </div>
      </div>
      <!--数据展示部分-->
      <div class="value" v-else>
        <div class="now">
          当前温度：{{dev.value}}
        </div>
        <div id="myChart" :style="{width: '350px', height: '300px'}"></div>
      </div>
      <el-button class="delDev" type="danger" @click="dialogShow = true">删除设备</el-button>
      <!--对话框-->
      <el-dialog
        title="提示"
        :visible.sync="dialogShow"
        width="65%">
        <span>确定删除{{devName}}吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="delDev">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import store from '../store/store'
  import myHeader from './header.vue'
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        dev: this.$route.query,
        devName: this.$route.query.name,
        devRoom: this.$route.query.room,
        // lightControl: ['开启','关闭','升色温', '降色温', '升亮度', '降亮度'],
        dialogShow: false,
        controls: [],
        oldRoom: '',
        oldName: ''
      }
    },
    mounted() {
      if (this.dev.type === 1) {
        this.controls = ['开启','关闭','升色温', '降色温', '升亮度', '降亮度']
      }
      if (this.dev.type === 3) {
        this.controls = ['开启', '关闭']
      }
      if (this.dev.type === 2) {
        this.drawLine();
      }
      this.oldRoom = this.dev.room
      this.oldName = this.dev.name
    },
    computed: {
      options: () => store.getters.rooms
    },
    components: {
      myHeader
    },
    methods: {
      getControl() {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
      delDev() {
        this.dialogShow = false
        store.commit('delDevice', this.devName)
        this.$router.go(-1)
      },
      drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: { text: '历史温度' , left:'center'},
            tooltip: {},
            xAxis: {
              type: 'category',
              data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}°C'
              }
            },
            series: [{
              data: [25, 24, 22, 26, 27, 28, 30],
              type: 'line'
            }]
          });
      },
      reName() {
        let dev = store.state.device
        let lock = false;
        let $this = this
        dev.forEach(function (v) {
          if ($this.devName === v.name) {
            lock = true
          }
        })
        if (lock) {
          this.$message({
            message: '名字重复',
            type: 'error'
          })
          this.devName = this.oldName
        }
        store.commit('reName', {old: this.oldName, new: this.devName})
      },
      reRoom() {
        store.commit('reRoom', {old: this.oldRoom, new: this.devRoom})
      }
    }
  }
</script>

<style scoped>
  .detail {
    padding: 2rem;
    width: 100vw;
    box-sizing: border-box;
  }
  .detail .header{
    display: flex;
    border-bottom: 2px solid #ccc;
    padding: 1.5rem 0;
    height: 3rem;
    line-height: 3rem;
    justify-content: space-around;
    font-weight: bold;
    font-size: 1.7rem;
    width: 100%;
  }
  .detail .header .el-input {
    width: 9rem;
  }
  .detail .header .el-select {
    width: 8rem;
  }
  .control {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 2rem 2rem;
    box-sizing: border-box;
    justify-content: space-around;
  }
  .control .control-item {
    height: 9rem;
    width: 9rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-top: 2rem;
    line-height: 9rem;
    font-size: 2rem;
  }
  .control .control-item:nth-child(odd) {
  }
  .delDev {
    width: 20rem;
    height: 5rem;
    font-size: 2.5rem;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-around;
  }
  .value {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .value .now {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
</style>
