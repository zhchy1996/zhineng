<template>
  <div class="dev-list">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchItem"
        clearable>
      </el-input>
    </div>
    <div class="list">
      <div class="item" v-for="item in devList" v-show="item.itemShow">
        <span @click="goDetail(item)">{{item.name}}</span>
        <el-switch
          v-model="item.switch"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store/store'
  export default {
    data() {
      return {
        devList: [],
        searchItem: ''
      }
    },
    mounted() {
      let $this = this;
      // 获取参数
      let query = this.$route.query.dev
      let room = this.$route.query.room
      // 在线设备列表生成
      if (query === 'online') {
        this.devList = store.getters.onlineDev
      } else if (query === 'on') {
        this.devList = store.getters.onDev
      } else if (query === 'measure') {
        this.devList = store.getters.measureDev
      } else if (query === 'room') {
        let arr = []
        let dev = store.state.device
        dev.forEach((v) => {
          if (v.room === room) {
            arr.push(v)
          }
        })
        this.devList = arr
      }
      this.devList.forEach((v) => {
        v.itemShow =true
      })
    },
    methods: {
      goDetail(dev) {
        this.$router.push({path: 'detail', query: dev})
      }
    },
    watch: {
      searchItem: function () {
        let str = this.searchItem;
        this.devList.forEach((v) => {
          if (v.name.indexOf(str) < 0) {
            v.itemShow = false
          } else {
            v.itemShow = true
          }
        })
      }
    }
  }
</script>

<style scoped>
  .dev-list {
    padding: 2rem;
  }
  .list {
    margin-top: 2rem;
    border-top: 2px solid #ccc;
  }
  .list .item {
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .list .item span{
    width: 20rem;
    text-align: left;
  }
</style>
