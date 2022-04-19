import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {
  Message,
  Row,
  Col,
  Timeline,
  TimelineItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  vueTypedJs from 'vue-typed-js'
import api from '@/apis'
import router from '@/router'

Vue.use(VueRouter)
Vue.use(vueTypedJs)
Vue.use(Row)
Vue.use(Col)
Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$api = api
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
