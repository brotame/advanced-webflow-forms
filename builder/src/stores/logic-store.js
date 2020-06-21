import { writable } from 'svelte/store';

const defaults = [
  {
    id: 'f0df0eeb-e65a-45c4-8d08-fdebcf6ad2d1',
    conditions: [
      {
        selector: '#options',
        selectorString: 'options',
        type: 'text',
        operator: 'not-equal',
        value: 'Contact Info',
      },
      {
        selector: '#demo',
        selectorString: 'demo',
        type: 'select',
        operator: 'greater-equal',
        value: '10',
      },
    ],
    operator: 'or',
    actions: [
      {
        selector: '#contact-info',
        selectorString: 'contact-info',
        action: 'hide',
        clear: false,
      },
      {
        selector: '#test',
        selectorString: 'test',
        action: 'disable',
        clear: true,
      },
    ],
  },
];

const store = writable(defaults);

const customStore = {
  subscribe: store.subscribe,
  add: (newLogic) => {
    store.update((items) => [...items, newLogic]);
  },
  modify: (data) => {
    store.update((items) =>
      items.map((item) => (item.id === data.id ? { ...item, ...data } : item))
    );
  },
  remove: (id) => {
    store.update((items) => items.filter((item) => item.id !== id));
  },
};

export default customStore;
