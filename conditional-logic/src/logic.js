module.exports = class {
  constructor({ logicList, submitHidden = false }) {
    this.logicList = logicList;
    this.submitHidden = submitHidden;
    // this.store = [];
    // TEST DATA --- DELETE!!!
    this.store = [
      {
        element: '<div...>',
        visible: true,
        required: false,
        enabled: true,
      },
    ];
  }

  /**
   * Listen for inputs on each condition origin element
   *
   * @param {Object} logic - Object that contains conditions, operator and actions
   */
  addEvents(logic) {
    logic.conditions.forEach((condition) => {
      const element = document.querySelector(condition.selector);

      // Add event listener
      element.addEventListener('input', () => {
        this.checkConditions(logic);
      });
    });
  }

  /**
   * Check if conditions are met
   *
   * @param {Array} conditions - List of conditions that have to be met
   * @param {string} [operator = and] - Operator for the conditions | and: all conditions have to be met | or: only one condition has to be met
   * @param {Array} actions - List of actions to trigger
   */
  checkConditions({ conditions, operator = 'and', actions }) {
    let pass = false;

    for (let condition of conditions) {
      // Get value of the origin
      const element = document.querySelector(condition.selector);
      const elementValue =
        element.type === 'checkbox' ? element.checked : element.value;
      const targetValue = condition.value;

      // Check condition PENDENT DE POSAR LES QUE FALTEN
      switch (condition.operator) {
        case 'equal':
          pass = elementValue === targetValue ? true : false;
          break;
        case 'not-equal':
          pass = elementValue !== targetValue ? true : false;
          break;
      }

      // Operator determines if the loop continues checking conditions
      if (operator === 'and' && !pass) break;
      if (operator === 'or' && pass) break;
    }

    // Trigger action if condition is met
    if (pass)
      actions.forEach((action) => {
        this.triggerAction(action);
      });
  }

  /**
   * Triggers an action
   *
   * @param {string} selector - Selector of the target element
   * @param {string} action - Action to be triggered (show, hide, enable, disable, require, unrequire)
   * @param {boolean} [clear=false] - Determines if the input value has to be cleared when the action is triggered
   */
  triggerAction({ selector, action, clear = false }) {
    const element = document.querySelector(selector);

    // If element is not a form element, then is a group of elements
    const isGroup = ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
      ? false
      : true;

    // Store targets in array
    const targets = [];

    if (isGroup)
      targets.push(...element.querySelectorAll('input', 'select', 'textarea'));
    else targets.push(element);

    // Perform action
    switch (action) {
      // Pendent de saber si cal enable o disable segons el valor guardat al store
      case 'show':
        this.showInputs(targets);
        break;
      case 'hide':
        this.hideInputs(targets);
        break;
      case 'enable':
        this.enableInputs(targets);
        break;
      case 'disable':
        this.disableInputs(targets);
        break;
      case 'require':
        this.requireInputs(targets);
        break;
      case 'unrequire':
        this.unrequireInputs(targets);
        break;
    }

    // Clear the input
    if (clear) this.clearInputs(targets);

    // Search for Webflow Ix2 trigger and click it
    const parent = target.closest('[data-logic="group"]');
    const trigger = parent.querySelector(`[data-logic="${action}"]`);

    if (!trigger) return;

    trigger.click();
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be shown
   */
  showInputs(targets) {
    targets.forEach((target) => {
      // Check store values
      const storedData = this.getStoredData(target);

      // PENDENT SABER SI CAL I POSAR QUÈ FER EN CAS DE QUE NO HI HAGI IX2 TRIGGER
      if (!storedData) return;

      // Require or enable input if
      if (storedData.required && !target.required) this.requireInputs([target]);
      if (storedData.enabled && !target.enabled) this.enableInputs([target]);
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be hidden
   */
  hideInputs(targets) {
    targets.forEach((target) => {
      this.storeInputData(target);
    });

    if (!this.submitHidden) this.disableInputs(targets);
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be enabled
   */
  enableInputs(targets) {
    targets.forEach((target) => {
      target.disabled = false;
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be disabled
   */
  disableInputs(targets) {
    targets.forEach((target) => {
      target.disabled = true;
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be required
   */
  requireInputs(targets) {
    targets.forEach((target) => {
      target.required = true;
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be unrequired
   */
  unrequireInputs(targets) {
    targets.forEach((target) => {
      target.required = false;
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be cleared
   */
  clearInputs(targets) {}

  /**
   * Stores if the input is enabled and required
   *
   * @param {HTMLElement} target - DOM Node of the target
   */
  storeInputData(target) {
    // Get target data
    const data = {
      element: target,
      visible: !!(
        target.offsetWidth ||
        target.offsetHeight ||
        target.getClientRects().length
      ),
      required: target.required,
      disabled: target.disabled,
    };

    // Find if element is already stored
    const index = this.store.findIndex((data) => data.element === target);

    // Update store
    if (index > -1) this.store[index] = data;
    else this.store.push(data);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target
   * @param {string} [single] - Optional string for single data return (visible, required, disabled)
   */
  getStoredData(target, single) {
    // Check store values
    const storedData = this.store.find((data) => data.element === target);

    if (!storedData) return;
    if (single === 'visible') return storedData.visible;
    if (single === 'required') return storedData.required;
    if (single === 'disabled') return storedData.disabled;

    return storedData;
  }

  init() {
    // Add event listeners to all conditions origin element
    this.logicList.forEach((logic) => {
      this.addEvents(logic);
    });
  }
};
