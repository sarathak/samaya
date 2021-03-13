import { shallowMount } from '@vue/test-utils'
import Folder from '@/views/Folder.vue'

describe('Folder.vue', () => {
  it('renders folder view', () => {
    const mockRoute = {
      params: {
        id: 'Outbox'
      }
    }
    const wrapper = shallowMount(Folder, {
      global: {
        mocks: {
          $route: mockRoute
        }
      }
    })
    expect(wrapper.text()).toMatch('')
  })
})
