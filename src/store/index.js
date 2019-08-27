import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
const state = {
  userInfo: {},  // 操作员信息
}
const mutations = {
  setuserInfo (state, info) {
    state.operatorInfo = info
  }
}
export default new vuex.Store({
	state
	
	
})