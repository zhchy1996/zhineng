import Vue from 'Vue';
import Vuex from 'Vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      path: [
        'username',
        'device'
      ]
    })
  ],
  state: {
    // device type 1.照明 2.测量 3.其他
    device: [{
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
    }],
    username: 'zcy',
    user_id: 0,
    group: '',
    score: 0,
  },
  mutations: {
    setDevice(state, data) {
      state.device = data
    },
    setUsername(state, data) {
      state.username = data
    },
    delDevice(state, data) {
      state.device.forEach((v, i) => {
        if (v.name === data) {
          state.device.splice(i, 1)
        }
      })
    },
    addDevice(state, data) {
      state.device.push(data)
    },
    reName(state, data) {
      let dev = state.device
      dev.forEach((v, i) => {
        if (v.name === data.old) {
          state.device[i].name = data.new
        }
      })
    },
    reRoom(state, data) {
      let dev = state.device
      dev.forEach((v, i) => {
        if (v.room === data.old) {
          state.device[i].room = data.new
        }
      })
    }
  },
  getters: {
    rooms(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        arr.push(dev[i].room)
      }
      return [...new Set(arr)]
    },
    onlineDev(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        if (dev[i].online) {
          arr.push(dev[i])
        }
      }
      return arr
    },
    onDev(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        if (dev[i].switch) {
          arr.push(dev[i])
        }
      }
      return arr
    },
    lightDev(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        if (dev[i].type === 1) {
          arr.push(dev[i])
        }
      }
      return arr
    },
    measureDev(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        if (dev[i].type === 2) {
          arr.push(dev[i])
        }
      }
      return arr
    },
    otherDev(state) {
      let arr = []
      let dev = state.device
      for (let i = 0; i < dev.length; i++) {
        if (dev[i].type === 3) {
          arr.push(dev[i])
        }
      }
      return arr
    },
  }
})