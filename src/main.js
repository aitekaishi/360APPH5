// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
/*router.afterEach(function (transition) {
  if (transition.meta.title) {
    document.title = transition.meta.title
  }
})*/
new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
Vue.config.keyCodes = {
	 num:[48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105]
}