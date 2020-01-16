import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'


describe('Search.vue Implementation Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(Search)
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct elements', () => {
    // check the name of the component
    expect(wrapper.name()).toMatch('Search')

    // check that the heading text is rendered
    expect(wrapper.findAll('h2').length).toEqual(1)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')

    // check that 1 label is created
    expect(wrapper.findAll('label').length).toEqual(1)
    expect(wrapper.findAll('label').at(0).text()).toMatch('City:')

    // check that 2 buttons are created and are disabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear Results')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()
  })

  it('emits a custom event when searchCity() is called', () => {
    // set the input data for the user
    wrapper.setData({ inputCity: 'Denver'})

    wrapper.vm.searchCity()

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('search-city')).toBeTruthy()
    expect(wrapper.emitted('search-city').length).toBe(1)
    expect(wrapper.emitted('search-city')[0][0]).toMatch('Denver')

    // check that the input data is not cleared after emitting the event
    expect(wrapper.vm.inputCity).toMatch('Denver')
  })

  it('emits a custom event when resetCity() is called', () => {
    // set the input data for the user
    wrapper.setData({ inputCity: 'San Francisco'})

    wrapper.vm.resetCity()

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('reset-city')).toBeTruthy()
    expect(wrapper.emitted('reset-city').length).toBe(1)

    // check that the input data is cleared after emitting the event
    expect(wrapper.vm.inputCity).toMatch(/^$/)
  })
})

describe('Search.vue Behavioral Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(Search)
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with the two buttons disabled', () => {
    // check that 2 buttons are created and are disabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear Results')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()
  })

  it('enables the two buttons when a city is entered', () => {
    // set the input data for the user
    wrapper.setData({ inputCity: 'San Francisco'})

    // check that 2 buttons are enabled
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear Results')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
  })
})
