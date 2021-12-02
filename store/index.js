import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = () => new Vuex.Store({

  state: {
    counter: 0,
    user: null
  },
  mutations: {
    auth(state, {user}){
      state.user = user;
    },
    logout(state){
      state.user = null;
    },
    increment (state) {
      state.counter++
    }
  }
})

export default store
