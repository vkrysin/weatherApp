import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // Array of user email that have registrated {emali, name}
    users: [],
    // object with field {username1: [places1], username2:[places2] }
    favoritePlaces: {},
    userEmail: '',
    userName: '',
    addToFavoriteShow: false
  },
  getters: {
    getEmail: (state) => {
      return state.userEmail
    }
  },
  mutations: {
    setEmail (state, email) {
      state.userEmail = email
    },
    addToFavorite (state, place) {
      let valueArr = state.favoritePlaces[state.userName] || []
      valueArr.push(place.toLowerCase())
      state.favoritePlaces[state.userName] = valueArr
      state.addToFavoriteShow = false
    }
  },
  actions: {},
  plugins: [createPersistedState()]
})
export default store
