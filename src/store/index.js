import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // Array of user email that have registrated {emali, password}
    users: [],
    userEmail: '',
    userName: ''
  },
  getters: {
    getEmail: (state) => {
      return state.userEmail
    }
  },
  mutations: {
    setEmail (state, email) {
      state.userEmail = email
    }
  },
  actions: {},
  plugins: [createPersistedState()]
})
export default store
