import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue Test', () => {
  it('renders sub-components when the component is created', () => {
    // render the component
    const wrapper = shallowMount(App)

    // check the name of the component
    expect(wrapper.name()).toMatch('app')

    // check that 4 of the 5 child components are rendered
    expect(wrapper.findAll('.header').exists()).toBeTruthy()
    expect(wrapper.findAll('.footer').exists()).toBeTruthy()
    expect(wrapper.findAll('.banner').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-search').exists()).toBeTruthy()
    expect(wrapper.findAll('.weather-results').exists()).toBeFalsy()
  })
})
