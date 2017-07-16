import Vue from 'vue'
import 'muse-ui/dist/muse-ui.css'
import MuseUI from 'muse-ui'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(MuseUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
