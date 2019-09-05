import Vue from 'vue'
import VueX from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(VueX)


export default new VueX.Store({
  actions,
  getters,
  state,
  mutations,

})