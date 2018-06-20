<template>
  <el-container>
    <el-main>
      <home v-if="tab === 'home'"></home>
      <room v-if="tab === 'room'"></room>
      <mine v-if="tab === 'mine'"></mine>
    </el-main>
    <el-footer>
      <el-row class="tabs">
        <el-col :span="8" :class="{active: tab === 'home'}" @click.native="changeTab('home')">
          <span class="tab-item">主页</span>
        </el-col>
        <el-col :span="8" :class="{active: tab === 'room'}" @click.native="changeTab('room')">
          <span class="tab-item">房间</span>
        </el-col>
        <el-col :span="8" :class="{active: tab === 'mine'}" @click.native="changeTab('mine')">
          <span class="tab-item">我的</span>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
const home = () =>
  import ('./home.vue')
const room = () =>
  import ('./room.vue')
const mine = () =>
  import ('./mine.vue')
export default {
  name: 'index',
  components: {
    home,
    room,
    mine
  },
  data () {
    return {
      // 当前tab
      tab: 'room',
    }
  },
  computed: {
  
  },
  methods: {
    changeTab(index) {
      this.tab = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container {
   height: 100vh;
   overflow: hidden; 
   padding: 0;
  }
  .el-main {
    height: 95vh;
    /* background: #f40; */
    padding: 0;
  }
  .el-footer {
    height: 5vh;
    padding: 0;
  }
  .tabs {
    height:100%;
    border-top: 1px solid #ccc;
  }
  .tabs .el-col {
    height: 100%;
    border-right: 1px solid #ccc;
  }
  .tabs .el-col:last-child {
    border-right: 0;
  }
  .tabs .el-button {
    height: 100%;
    width: 100%;
  }
  .tabs .tab-item{
    line-height: 5rem;;
  }
  .tabs .el-col.active{
    background: #409EFF;
    color: #fff;
  }
</style>
