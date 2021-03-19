import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // Array of user email that have registrated {email, name}
    users: [],
    // object with field {username1: [places1], username2:[places2] }
    favoritePlaces: {},
    userEmail: '',
    userName: '',
    searchBtn: '',
    inputCity: '',
    addToFavoriteShow: false
  },
  getters: {
    getEmail: (state) => {
      return state.userEmail
    }
  },
  mutations: {
    setInitialFavoritePlaces (state, userName) {
      Vue.set(state.favoritePlaces, userName, [])
    },
    addToFavorite (state, place) {
      let valueArr = state.favoritePlaces[state.userName] || []
      valueArr.push(place.toLowerCase())
      // use vue.set for reactivity favoritePlaces
      Vue.set(state.favoritePlaces, state.userName, valueArr)
      state.addToFavoriteShow = false
    },
    checkShowFavorite (state, inputCity) {
      if (state.userEmail !== '' && !state.favoritePlaces[state.userName].includes(inputCity.toLowerCase())) {
        state.addToFavoriteShow = true
      }
    }
  },
  actions: {},
  plugins: [createPersistedState()]
})
export default store
