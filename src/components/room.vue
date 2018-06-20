<template>
  <div class="wrapper">
    <div class="room" v-for="item in rooms">
      {{item}}
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
      rooms: () => store.getters.rooms
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    width: 100vw;
    justify-content: space-around;
    padding: 2rem 2rem;
    box-sizing: border-box;
  }
  .wrapper .room {
    width: 10rem;
    height: 10rem;
    border: 2px solid #ccc;
    line-height: 10rem;
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
  }
</style>