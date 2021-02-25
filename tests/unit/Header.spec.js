import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Header, {
      propsData: {
        title: 'Vue Project'
      }
    })

    // check the name of the component
    expect(wrapper.name()).toMatch('Header')

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Vue Project')
  })
})
