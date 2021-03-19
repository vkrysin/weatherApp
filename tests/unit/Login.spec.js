import { createLocalVue, mount } from '@vue/test-utils'
import routes from '@/router/index.js'
import Login from '@/components/Login.vue'
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
    users: [{
      userEmail: 'some@mail.ru',
      userName: 'Vlad'
    }],
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
    wrapper = mount(Login, { store, localVue, router })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('Render with empty initialize value', () => {
    expect(wrapper.findAll('.header').at(0).text()).toMatch('Sign In')
    expect(wrapper.findAll('input').length).toEqual(3)

    expect(wrapper.findAll('#submit').length).toEqual(1)
    // check initialize value
    expect(wrapper.findAll('#email').at(0).text()).toMatch('')
    expect(wrapper.findAll('#username').at(0).text()).toMatch('')
  })
  it('Render warning message, if errorSignIn=true', () => {
    wrapper.setData({
      errorSignIn: true
    })
    expect(wrapper.findAll('.wrong-data').at(0).text()).toMatch('Falied to sign-In. Invalid email or user name')
  })
})
describe('Implementation tests of methods', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(Login, {
      store,
      localVue,
      router
    })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  // getLogInData
  it('getLogInData_[]_[]', () => {
    wrapper.findAll('#email').at(0).setValue('')
    wrapper.findAll('#username').at(0).setValue('')

    expect(wrapper.vm.getLogInData()).toStrictEqual(['', ''])
  })
  it('getLogInData_[some@mail.ru, Vlad]_[some@mail.ru, Vlad]', () => {
    wrapper.findAll('#email').at(0).setValue('some@mail.ru')
    wrapper.findAll('#username').at(0).setValue('Vlad')

    expect(wrapper.vm.getLogInData()).toStrictEqual(['some@mail.ru', 'Vlad'])
  })
  // isLogInDataContainsInBase
  // current users: [{
  //    userEmail: 'some@mail.ru',
  //    userName: 'Vlad'
  //  }],
  it('isLogInDataContainsInBase_[Vlad, some@mail.ru]_true', () => {
    expect(wrapper.vm.isLogInDataContainsInBase('Vlad', 'some@mail.ru')).toBe(true)
  })
  it('isLogInDataContainsInBase_[vvv, some@mail.ru]_true', () => {
    expect(wrapper.vm.isLogInDataContainsInBase('vvv', 'some@mail.ru')).toBe(false)
  })
  // LogIn
  it('LogIn_[Vlad, some@mail.ru]_errorSignIn=false', () => {
    // set mock function used then call logIn()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.isLogInDataContainsInBase = jest.fn()
    wrapper.vm.getLogInData = jest.fn()

    wrapper.vm.isLogInDataContainsInBase.mockReturnValueOnce(true)
    wrapper.vm.getLogInData.mockReturnValueOnce(['some@mail.ru', 'Vlad'])

    wrapper.vm.logIn()
    // check user data initialization
    expect(wrapper.vm.$store.state.userEmail).toMatch('some@mail.ru')
    expect(wrapper.vm.$store.state.userName).toMatch('Vlad')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: '/' })
    expect(wrapper.vm.errorSignIn).toBe(false)
  })
  it('LogIn_[vvv, some@mail.ru]_errorSignIn=true', () => {
    // set mock function used then call logIn()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.isLogInDataContainsInBase = jest.fn()
    wrapper.vm.getLogInData = jest.fn()

    wrapper.vm.isLogInDataContainsInBase.mockReturnValueOnce(false)
    wrapper.vm.getLogInData.mockReturnValueOnce(['some@mail.ru', 'vvv'])

    wrapper.vm.logIn()

    expect(wrapper.vm.errorSignIn).toBe(true)
  })
})
