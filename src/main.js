import Vue from 'vue'
import {Menu, MenuItem} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App'
import router from './router'

locale.use(lang)

Vue.use(Menu)
Vue.use(MenuItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
