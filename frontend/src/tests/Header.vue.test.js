import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';

import Header from '../components/Header.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Home suit', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({
      state: {
        users: [
          {
            _id: '601f3794e3c17b3814c8f28b',
            email: 'antonio.pina@tvglobo.com.br',
            name: 'ANPINA',
            inclusionDate: '28/05/2019',
            alterationDate: '30/05/2019',
            rules: '01',
            status: 'ATIVO',
            show: false,
            __v: 0
          }
        ]
      }
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

  it('toggle nav drawer', () => {
    const button = wrapper.find('.filter');
    const drawer = wrapper.find('.v-navigation-drawer');

    expect(button.exists()).toBe(true);
    expect(drawer.classes()).toContain('v-navigation-drawer--close');

    button.trigger('click');
    expect(drawer.classes()).toContain('v-navigation-drawer--fixed');
  });
});
