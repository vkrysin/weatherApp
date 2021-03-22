import { createLocalVue, mount } from '@vue/test-utils'
import routes from '@/router/index.js'
import Home from '@/components/Home.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const router = new VueRouter(
  routes
)
const store = new Vuex.Store({
  state: {
    // Array of user email that have registrated {email, name}
    users: [],
    // object with field {username1: [places1], username2:[places2] }
    favoritePlaces: {
      'Vlad': ['chicago', 'paris']
    },
    userEmail: '',
    userName: 'Vlad',
    searchBtn: '',
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
    setInitialFavoritePlaces (state, userName) {
      Vue.set(state.favoritePlaces, userName, [])
    },
    addToFavorite (state, place) {
      let valueArr = state.favoritePlaces[state.userName] || []
      valueArr.push(place.toLowerCase())
      // use vue.set for reactivity
      Vue.set(state.favoritePlaces, state.userName, valueArr)
      state.addToFavoriteShow = false
    },
    checkShowFavorite: jest.fn()
  }
})
describe('Test home methods', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(Home, { store, localVue, router })
    wrapper.vm.openweathermapApiKey = '4ad5cbc32c39d982d11436dff37d0dd3'
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  // case test
  it('searchCity_mOsCow_success', async () => {
    await wrapper.vm.searchCity('mOsCow')
    expect(wrapper.vm.messageType).toBe('Success')
  })
  it('searchCity_[./63.]_error', async () => {
    await wrapper.vm.searchCity('[./63.]')
    expect(wrapper.vm.messageType).toBe('Error')
  })
  it('searchCity_[Moscow]_error', async () => {
    await wrapper.vm.searchCity('[Moscow]')
    expect(wrapper.vm.messageType).toBe('Error')
  })
  it('searchCity_emptyString_error', async () => {
    await wrapper.vm.searchCity('')
    expect(wrapper.vm.messageType).toBe('Error')
  })

  // Exit
  it('Implementation exit test', () => {
    const localStorageMock = {
      userEmail: 'some@mail.ru',
      userName: 'Vlad',
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    }
    JSON.parse = jest.fn().mockImplementation(() => localStorageMock)
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })

    wrapper.vm.exit()

    expect(wrapper.vm.$store.state.userEmail).toBe('')
    expect(wrapper.vm.$store.state.userName).toBe('')
    expect(wrapper.vm.$store.state.addToFavoriteShow).toBe(false)

    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1)
    expect(localStorageMock.userEmail).toBe('')
    expect(localStorageMock.userName).toBe('')
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1)
  })
})
