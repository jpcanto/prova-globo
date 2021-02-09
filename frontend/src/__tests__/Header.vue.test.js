import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';

import Header from '@/components/Header.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Suíte Header', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({
      state: {}
    });

    const vuetify = new Vuetify();

    wrapper = mount(Header, {
      localVue,
      vuetify,
      store
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
