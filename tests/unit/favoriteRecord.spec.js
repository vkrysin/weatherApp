import { shallowMount, createLocalVue } from '@vue/test-utils'
import routes from '@/router/index.js'
import favoriteRecord from '@/components/favoriteRecord.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
jest.useFakeTimers()

const router = new VueRouter(
  routes
)
const store = new Vuex.Store({
  state: {
    // Array of user email that have registrated {emali, name}
    users: [],
    // object with field {username1: [places1], username2:[places2] }
    favoritePlaces: {
      Vlad: ['chicago', 'paris', 'moscow']
    },
    userEmail: 'some@mail.ru',
    userName: 'Vlad',
    searchBtn: {},
    inputCity: {},
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
    checkShowFavorite (state, inputCity) {
      if (!state.favoritePlaces[state.userName].includes(inputCity.toLowerCase())) {
        state.addToFavoriteShow = true
      }
    }
  },
  actions: {}
})

describe('Implementation Test for favoriteRecord', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = shallowMount(favoriteRecord, {
      propsData: {
        cityName: 'Moscow'
      },
      store,
      localVue,
      router })
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('initializes with correct elements', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('favoriteRecord')

    // 2 button: with favorite place name and delete
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Moscow')
  })
  it('clear_MoscowInFavoritePlaces_MoscowExcludeFromFavoritePlace', () => {
    // store contain moscow before the button was pressed
    expect(wrapper.vm.$store.state.favoritePlaces[wrapper.vm.$store.state.userName]).toEqual(
      expect.arrayContaining(['moscow']))

    const localStorageMock = {
      favoritePlaces: {
        Vlad: ['chicago', 'paris', 'moscow']
      },
      userEmail: 'some@mail.ru',
      userName: 'Vlad',
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    }
    JSON.parse = jest.fn().mockImplementation(() => localStorageMock)
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })

    wrapper.vm.clear()

    // store doesn't conatin moscow
    expect(wrapper.vm.$store.state.favoritePlaces[wrapper.vm.$store.state.userName]).toEqual(
      expect.not.arrayContaining(['moscow']))
    // local storage doesn't contain moscow
    expect(localStorageMock.favoritePlaces[localStorageMock.userName]).toEqual(
      expect.not.arrayContaining(['moscow']))

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1)
  })
  // autoSearch
  it('autoSearch_buttonWithTextMoscow_clickOnButtonSearchFromSearchComponent', () => {
    wrapper.vm.$store.state.searchBtn.click = jest.fn()
    wrapper.vm.$store.state.inputCity.dispatchEvent = jest.fn()
    wrapper.vm.autoSearch()

    expect(wrapper.vm.$store.state.inputCity.value).toEqual('moscow')

    expect(wrapper.vm.$store.state.inputCity.dispatchEvent).toHaveBeenCalledWith(new Event('input'))
    // wait while time will pass (1ms)
    jest.advanceTimersByTime(1)
    expect(wrapper.vm.$store.state.searchBtn.click).toHaveBeenCalledTimes(1)
  })
})
