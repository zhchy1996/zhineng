<template>
  <div class="header">
    <span @click="goBack">
      <i class="el-icon-arrow-left"></i>
      返回
    </span>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props:['title'],
    methods:  {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .header{
    height: 50px;
    background: #f8f8f8;
    width: 100vw;
    /*display: flex;*/
    /*justify-content: space-around;*/
    text-align: center;
    position: relative;
    line-height: 50px;
  }
  span {
    position: absolute;
    left: 2rem;
    height: 50px;
    color: #2b99ff;
    line-height: 50px;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  span i {
    /*position: absolute;*/
    font-size: 25px;
  }
</style>
