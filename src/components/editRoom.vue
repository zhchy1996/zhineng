<template>
  <div>
    <my-header title="自定义房间"></my-header>
    <div class="edit-room">
      <div class="room" v-for="(item,i) in rooms">
        <el-input v-model="rooms[i]"></el-input>
      </div>
      <!-- <div class="add" @click="addRoom">
        <i class="el-icon-circle-plus"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
  import store from '../store/store'
  import myHeader from './header.vue'
  export default {
    data() {
      return {

      }
    },
    computed: {
      rooms: () => store.getters.rooms
    },
    methods: {

    },
    components: {
      myHeader
    }
  }
</script>

<style scoped>
.edit-room {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    width: 100vw;
    justify-content: space-around;
    padding: 2rem 2rem;
    box-sizing: border-box;
  }
  .edit-room .room,.add {
    width: 6rem;
    height: 6rem;
    border: 2px solid #ccc;
    line-height: 6rem;
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    padding:2rem 2rem;
    /* box-szing: border-box; */
  }
  .edit-room .add i{
    font-size: 8rem;
    line-height: inherit;
  }
</style>
