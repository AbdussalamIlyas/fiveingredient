import { shallowMount } from '@vue/test-utils'
import Recipe from '@/views/Recipe'

describe('Testing Recipe.vue', () => {
  it('should mount Recipe', async () => {
    const wrapper = shallowMount(Recipe, {
      global: {
        mocks: {
          $route: {params: { id: "60"}},
        }
      }
    })
    expect(wrapper.exists()).toBe(true);
  })
})
