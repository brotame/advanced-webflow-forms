import { writable, derived } from 'svelte/store';

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

const logicStore = writable(defaults);

const customLogicStore = {
  subscribe: logicStore.subscribe,
  add: (newLogic) => {
    logicStore.update((items) => [...items, newLogic]);
  },
  modify: (data) => {
    logicStore.update((items) =>
      items.map((item) => (item.id === data.id ? { ...item, ...data } : item))
    );
  },
  remove: (id) => {
    logicStore.update((items) => items.filter((item) => item.id !== id));
  },
};

export default customLogicStore;

export const logicParams = writable({
  submitHiddenInputs: false,
  checkConditionsOnLoad: true,
});

export const logicExport = derived(
  [logicStore, logicParams],
  ([$logicStore, $logicParams]) => {
    const newStore = [...$logicStore];

    newStore.forEach((logic) => {
      delete logic.id;

      logic.conditions.forEach((condition) => {
        delete condition.selectorString;
        delete condition.type;
      });

      logic.actions.forEach((action) => {
        delete action.selectorString;
      });
    });

    return {
      logicList: newStore,
      submitHiddenInputs: $logicParams.submitHiddenInputs,
      checkConditionsOnLoad: $logicParams.checkConditionsOnLoad,
    };
  }
);
