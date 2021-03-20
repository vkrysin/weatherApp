import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner.vue Implementation Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // Do Nothing - render the components in each unit test
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes with correct elements', () => {
    // render the component
    wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: ''
      }
    })

    // check the name of the component
    expect(wrapper.name()).toMatch('Banner')

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('')
  })

  it('initializes with message', () => {
    // render the component
    wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 123'
      }
    })

    // check that each element of the user is initialized to empty strings
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 123')
  })

  it('emits an event when the clear button is clicked', () => {
    // render the component
    wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 123'
      }
    })

    // trigger an event when the 'Clear' button is clicked
    wrapper.find('span').trigger('click')

    // check that 1 occurrence of the event has been emitted
    expect(wrapper.emitted('clear-banner')).toBeTruthy()
    expect(wrapper.emitted('clear-banner').length).toBe(1)
  })
})
