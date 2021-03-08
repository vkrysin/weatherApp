import { shallowMount } from '@vue/test-utils'
import Weather from '@/components/Weather.vue'

describe('Weather.vue Implementation Test', () => {
  let wrapper = null

  // SETUP - run before to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(Weather, {
      propsData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0
      }
    })
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct elements', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('Weather')

    // check that the heading text is rendered
    expect(wrapper.findAll('h2').length).toEqual(2)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Summary')
    expect(wrapper.findAll('h2').at(1).text()).toMatch('Temperatures')

    // check that 6 fields of data for the temperature are displayed
    expect(wrapper.findAll('p').length).toEqual(6)
    expect(wrapper.findAll('p').at(0).text()).toMatch('City:')
    expect(wrapper.findAll('p').at(1).text()).toMatch('Summary:')
    expect(wrapper.findAll('p').at(2).text()).toMatch('Details:')
    expect(wrapper.findAll('p').at(3).text()).toMatch('Current: 0° C')
    expect(wrapper.findAll('p').at(4).text()).toMatch('High (Today): 0° C')
    expect(wrapper.findAll('p').at(5).text()).toMatch('Low (Today): 0° C')
  })

  it('processes valid props data', () => {
    // Update the props passed in to the Weather component
    wrapper.setProps({
      city: 'Chicago',
      weatherSummary: 'Cloudy',
      weatherDescription: 'Cloudy with a chance of rain',
      currentTemperature: 45.1,
      lowTemperature: 42.0,
      highTemperature: 47.7
    })

    // check that the prop data is stored as expected within the component
    expect(wrapper.vm.city).toMatch('Chicago')
    expect(wrapper.vm.weatherSummary).toMatch('Cloudy')
    expect(wrapper.vm.weatherDescription).toMatch('Cloudy with a chance of rain')
    expect(wrapper.vm.currentTemperature).toEqual(45.1)
    expect(wrapper.vm.lowTemperature).toBeCloseTo(42.0)
    expect(wrapper.vm.highTemperature).toBe(47.7)

    // check that the heading text is rendered
    expect(wrapper.findAll('h2').length).toEqual(2)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Summary')
    expect(wrapper.findAll('h2').at(1).text()).toMatch('Temperatures')

    // check that 6 fields of data for the temperature are displayed
    expect(wrapper.findAll('p').length).toEqual(6)
    expect(wrapper.findAll('p').at(0).text()).toMatch('City: Chicago')
    expect(wrapper.findAll('p').at(1).text()).toMatch('Summary: Cloudy')
    expect(wrapper.findAll('p').at(2).text()).toMatch('Details: Cloudy with a chance of rain')
    expect(wrapper.findAll('p').at(3).text()).toMatch('Current: 45.1° C')
    expect(wrapper.findAll('p').at(4).text()).toMatch('High (Today): 47.7° C')
    expect(wrapper.findAll('p').at(5).text()).toMatch('Low (Today): 42° C')
  })

  it('emits a custom event when the Clear Weather Data button is clicked', () => {
    // trigger an event when the 'Clear Weather Data' button is clicked
    wrapper.findAll('button').at(0).trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('clear-weather-data')).toBeTruthy()
    expect(wrapper.emitted('clear-weather-data').length).toBe(1)
  })
})
