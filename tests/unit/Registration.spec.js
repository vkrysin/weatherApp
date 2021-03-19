import { createLocalVue, mount } from '@vue/test-utils'
import routes from '@/router/index.js'
import Registration from '@/components/Registration.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

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
    setEmail: jest.fn(),
    setInitialFavoritePlaces: jest.fn(),
    addToFavorite: jest.fn(),
    checkShowFavorite: jest.fn()
  }
})
describe('Render elements when component is created', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(Registration, { store, localVue, router })
    wrapper.setData({
      email: '',
      userName: '',
      isUserEmailIncorrect: false
    })
  })
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('Render with empty initialize value', () => {
    expect(wrapper.findAll('input').length).toEqual(2)
    // signUp button hide
    expect(wrapper.findAll('#submit').length).toEqual(0)
    // check initialize value
    expect(wrapper.findAll('#email').at(0).text()).toMatch('')
    expect(wrapper.findAll('#username').at(0).text()).toMatch('')
  })
})
describe('Implementation tests of methods', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(Registration, { store, localVue, router })
    wrapper.setData({
      email: '',
      userName: '',
      isUserEmailIncorrect: false
    })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  it('checkEmailCorrectness_some@mail.ru_isUserEmailIncorrect=false', () => {
    // input correct email
    wrapper.vm.checkEmailCorrectness('some@mail.ru')
    expect(wrapper.vm.isUserEmailIncorrect).toBe(false)
  })

  describe('checkEmailCorrectness', () => {
    it('checkEmailCorrectness_some@mail.ru_isUserEmailIncorrect=false', () => {
      // input correct email
      wrapper.vm.checkEmailCorrectness('some@mail.ru')
      expect(wrapper.vm.isUserEmailIncorrect).toBe(false)
    })
    it('checkEmailCorrectness_OOooOO.ru_isUserEmailIncorrect=true', () => {
      // input incorrect email
      wrapper.vm.checkEmailCorrectness('OOooOO.ru')
      expect(wrapper.vm.isUserEmailIncorrect).toBe(true)
    })
  })
  // isEmailInBase
  describe('isEmailInBase', () => {
    it('isEmailInBase_some@mail.ru_true', () => {
      store.state.users = [{
        userEmail: 'some@mail.ru',
        userName: 'Vlad'
      }]
      wrapper.setData({
        email: 'some@mail.ru'
      })

      expect(wrapper.vm.isEmailInBase).toBe(true)
    })
    it('isEmailInBase_other@mail.ru_true', () => {
      store.state.users = [{
        userEmail: 'some@mail.ru',
        userName: 'Vlad'
      }]
      wrapper.setData({
        email: 'other@mail.ru'
      })

      expect(wrapper.vm.isEmailInBase).toBe(false)
    })
  })
  describe('isUserDataCorrect', () => {
    it('isUserDataCorrect_{other@mail.ru, Vlad}_true', () => {
      wrapper.setData({
        email: 'other@mail.ru',
        userName: 'Vlad'
      })
      expect(wrapper.vm.isUserDataCorrect).toBe(true)
    })
    it('isUserDataCorrect_{other@mail.ru, ""}_false', () => {
      wrapper.setData({
        email: 'other@mail.ru',
        userName: ''
      })
      expect(wrapper.vm.isUserDataCorrect).toBe(false)
    })
  })
  describe('signUp', () => {
    beforeEach(() => {
    // render the component
      wrapper = mount(Registration, { store, localVue, router })
      wrapper.setData({
        email: '',
        userName: '',
        isUserEmailIncorrect: false
      })
    })

    afterEach(() => {
      jest.resetModules()
      jest.clearAllMocks()
    })
    it('signUp_{other@mail.ru, Vlad}_', () => {
      wrapper.setData({
        email: 'other@mail.ru',
        userName: 'Vlad'
      })

      wrapper.vm.$store.mutations = {
        setEmail: jest.fn(),
        setInitialFavoritePlaces: jest.fn()
      }
      wrapper.vm.signUp()
      // check that new user has added in users{}
      expect(wrapper.vm.$store.state.users.filter(element => {
        return element.userEmail === wrapper.vm.email &&
               element.userName === wrapper.vm.userName
      }).length > 0).toBe(true)

      // check initialize value
      expect(wrapper.vm.$store.state.userName).toEqual(wrapper.vm.userName)
      expect(wrapper.vm.$store.state.userEmail).toEqual(wrapper.vm.email)
      expect(wrapper.vm.$store.state.favoritePlaces).toEqual({})
    })
  })
})
