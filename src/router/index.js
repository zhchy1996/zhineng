import Vue from 'vue'
import Router from 'vue-router'
const index = () =>
  import ('../components/index.vue')
const signup = () =>
  import ('../components/signup.vue')
const devList = () =>
  import ('../components/devList.vue')
const detail = () =>
  import ('../components/detail.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/signup',
    name: 'signup',
    component: signup
  }, {
    path: '/devList',
    name: 'devList',
    component: devList
  }, {
    path: '/detail',
    name: 'detail',
    component: detail
  }]
})
