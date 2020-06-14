module.exports = class {
  constructor(logic) {}

  addEvents(condition) {
    const origin = document.querySelector(condition.origin);
    origin.addEventListener('input', () => {
      this.checkCondition({ ...condition, origin });
    });
  }

  checkConditions({ conditions, operator = 'and', actions } = {}) {
    let pass = false;

    for (let condition of conditions) {
      const value = condition.value;
      const originValue =
        condition.origin.type === 'checkbox'
          ? condition.origin.checked
          : condition.origin.value;

      switch (condition.operator) {
        case 'equal':
          pass = originValue === value ? true : false;
          break;
        case 'not-equal':
          pass = originValue !== value ? true : false;
          break;
      }

      if (operator === 'and' && !pass) break;
      if (operator === 'or' && pass) break;
    }

    if (pass)
      actions.forEach((action) => {
        this.triggerAction(action);
      });
  }

  triggerAction({ selector, type = 'single', action } = {}) {
    const target = document.querySelector(selector);

    const parent = target.parentNode;

    switch (action) {
      case 'show':
        break;
    }

    const trigger = parent.querySelector(`[data-action=${action}]`);
    if (!trigger) return;
    trigger.click();
  }
};

const logic = [
  {
    conditions: [
      { origin: '#email', operator: 'equal', value: 'test@test.com' },
      { origin: '#name', operator: 'not-equal', value: 'Alex' },
    ],
    operator: 'and',
    actions: [
      {
        selector: '#phone',
        type: 'single',
        action: 'show',
      },
    ],
  },
];
