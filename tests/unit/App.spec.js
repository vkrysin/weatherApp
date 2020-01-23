import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import axios from 'axios'

// Mock the axios library
jest.mock('axios')

// Spy the console log
global.console.log = jest.fn();


describe('Implementation Test for App.vue with Successful HTTP GET', () => {
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

    // render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders sub-components when the component is created', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('app')

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

  it('does load the weather data when a successful HTTP GET occurs', () => {
    wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    wrapper.vm.$nextTick().then(function () {
      // check that the user data is properly set
      expect(wrapper.vm.weatherData.city).toMatch('Chicago')
      expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
      expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
      expect(wrapper.vm.weatherData.currentTemperature).toEqual(56.3)
      expect(wrapper.vm.weatherData.lowTemperature).toEqual(53.8)
      expect(wrapper.vm.weatherData.highTemperature).toEqual(58.6)
      expect(wrapper.vm.validWeatherData).toBe(true)
    })
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

describe('Implementation Test for App.vue with Failed HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a failed GET request
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))

    // Render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('does not load the weather data when a failed HTTP GET occurs', () => {
    wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    wrapper.vm.$nextTick().then(function () {
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

      expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST');
    })
  })
})
