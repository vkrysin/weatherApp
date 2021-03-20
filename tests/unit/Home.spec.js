import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import routes from '@/router/index.js'
import Home from '@/components/Home.vue'
import axios from 'axios'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'

// Mock the axios library
jest.mock('axios')

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
    checkShowFavorite (state, inputCity) {
      if (!state.favoritePlaces[state.userName].includes(inputCity.toLowerCase())) {
        state.addToFavoriteShow = true
      }
    }
  },
  actions: {}
})

// Spy the console log
global.console.log = jest.fn()

describe('Implementation Test for Home.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = {
      data:
        {
          name: 'Chicago',
          weather: [
            {
              main: 'Cloudy',
              description: 'Cloudy with a chance of rain'
            }
          ],
          main: {
            temp: 56.3,
            temp_min: 53.8,
            temp_max: 58.6
          }
        }
    }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)

    // render the component
    wrapper = mount(Home, { store, localVue, router })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders sub-components when the component is created', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('Home')
    // check that 4 of the 5 child components are rendered
    expect(wrapper.findAll('.header').exists()).toBeTruthy()
    expect(wrapper.findAll('.footer').exists()).toBeTruthy()
    expect(wrapper.findAll('.banner').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-search').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-results').exists()).toBeFalsy()

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('does load the weather data when a successful HTTP GET occurs', async () => {
    await wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch('Chicago')
    expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
    expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(56.3)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(53.8)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(58.6)
    expect(wrapper.vm.validWeatherData).toBe(true)
  })

  it('resets the weather data when resetData() is called', () => {
    // set the input data for the user
    wrapper.setData({ weatherData: {
      city: 'Boise',
      weatherSummary: 'Sunny',
      weatherDescription: 'No clouds in the sky',
      currentTemperature: 75.5,
      highTemperature: 78.6,
      lowTemperature: 48.9
    },
    validWeatherData: false
    })

    wrapper.vm.resetData()

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('resets the banner data when clearMessage() is called', () => {
    // set the input data for the user
    wrapper.setData(
      {
        messageToDisplay: 'Great search results!',
        messageType: 'Success!!!'
      }
    )

    wrapper.vm.clearMessage()

    // check that the banner message is reset
    expect(wrapper.vm.messageToDisplay).toMatch(/^$/)
    expect(wrapper.vm.messageType).toMatch('Info')
  })
})

describe('Implementation Test for Home.vue with Failed HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a failed GET request
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))
    // Render the component
    wrapper = shallowMount(Home, { store, localVue, router })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('does not load the weather data when a failed HTTP GET occurs', async () => {
    await wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    // Check that there is no user data loaded when the GET request fails
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')

    expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST')
  })
})

describe('Behavioral Test for Home.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = { data:
      {
        name: 'Chicago',
        weather: [
          {
            main: 'Cloudy',
            description: 'Cloudy with a chance of rain'
          }
        ],
        main: {
          temp: 56.3,
          temp_min: 53.8,
          temp_max: 58.6
        }
      }
    }
    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)
    // render the component (including all sub-components)
    wrapper = mount(Home, { store, router, localVue })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('initializes with the two buttons disabled and no weather data displayed', () => {
    // check that 2 buttons are created and are disabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()

    // check that there is only 1 h2 element
    expect(wrapper.findAll('h2').length).toEqual(1)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')

    // check that 0 fields of weather data are displayed
    expect(wrapper.findAll('p').length).toEqual(1) // 1st element is the Banner Message
  })

  it('displays the weather data for a valid search', async () => {
    // Set the input data
    wrapper.findAll('input').at(0).setValue('Chicago')

    // check that the 2 buttons are enabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()

    // trigger an event when the 'Search' button is clicked
    await wrapper.findAll('button').at(0).trigger('click')

    // check that the heading text is rendered
    expect(wrapper.findAll('h2').length).toEqual(3)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')
    expect(wrapper.findAll('h2').at(1).text()).toMatch('Weather Summary')
    expect(wrapper.findAll('h2').at(2).text()).toMatch('Temperatures')

    // check that 6 fields of weather data are displayed
    expect(wrapper.findAll('p').length).toEqual(7) // 1st element is the Banner Message
    expect(wrapper.findAll('p').at(1).text()).toMatch('City: Chicago')
    expect(wrapper.findAll('p').at(2).text()).toMatch('Summary: Cloudy')
    expect(wrapper.findAll('p').at(3).text()).toMatch('Details: Cloudy with a chance of rain')
    expect(wrapper.findAll('p').at(4).text()).toMatch('Current: 56.3° C')
    expect(wrapper.findAll('p').at(5).text()).toMatch('High (Today): 58.6° C')
    expect(wrapper.findAll('p').at(6).text()).toMatch('Low (Today): 53.8° C')
    // check that the 3 buttons are enabled
    expect(wrapper.findAll('button').length).toEqual(3)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(2).text()).toMatch('Clear Weather Data')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
  })
})
describe('Test vue hooks', () => {
  let wrapper = null

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  // created
  it('created_api=ds12fesre_messageType=info', () => {
    wrapper = mount(Home, { store,
      localVue,
      router,
      data () {
        return {
          openweathermapApiKey: 'ds12fesre'
        }
      }
    })
    // check that the banner message is reset
    expect(wrapper.vm.messageToDisplay).toMatch('')
    expect(wrapper.vm.messageType).toMatch('Info')
  })
  it('created_api=""_messageType=error', () => {
    wrapper = mount(Home, { store,
      localVue,
      router,
      data () {
        return {
          openweathermapApiKey: ''
        }
      }
    })
    // check that the banner message is error
    expect(wrapper.vm.messageToDisplay).toMatch('Error! API Key needs to be loaded to use openweathermap.org!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('Test vue methods', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component
    wrapper = mount(Home, { store, localVue, router })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
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
