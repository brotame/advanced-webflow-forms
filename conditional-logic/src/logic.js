import { throwAlert } from './helpers';

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
        disabled: true,
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
      if (!element) throwAlert(condition.selector, 'wrong-selector');

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
      const element = document.querySelector(condition.selector);
      if (!element) throwAlert(condition.selector, 'wrong-selector');

      // Get value of the origin
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
    if (!element) throwAlert(selector, 'wrong-selector');

    // If element is not a form element, then is a group of elements
    const isGroup = ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
      ? false
      : true;

    // Store targets in array
    const targets = [];

    if (isGroup)
      targets.push(...element.querySelectorAll('input', 'select', 'textarea'));
    else targets.push(element);

    // Search for Webflow Ix2 trigger and click it
    const parent = element.closest('[data-logic="group"]');

    if (!parent) throwAlert(selector, 'no-parent');

    const trigger = parent.querySelector(`[data-logic="${action}"]`);
    const hasTrigger = !!trigger;

    if (hasTrigger) trigger.click();

    // Perform action
    switch (action) {
      // Pendent de saber si cal enable o disable segons el valor guardat al store
      case 'show':
        this.showInputs(targets, parent, hasTrigger);
        break;
      case 'hide':
        this.hideInputs(targets, parent, hasTrigger);
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
      default:
        console.log(
          `No action has been provided for the ${selector} selector.`
        );
    }

    // Clear the input
    if (clear) this.clearInputs(targets);
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be shown
   * @param {HTMLElement} parent - Parent container DOM Element of the target inputs.
   * @param {boolean} hasTrigger - Declares if custom Webflow Ix2 has been found. If not, perform default show.
   */
  showInputs(targets, parent, hasTrigger) {
    targets.forEach((target) => {
      // Check store values
      const storedData = this.getStoredData(target);

      // PENDENT SABER SI CAL I POSAR QUÈ FER EN CAS DE QUE NO HI HAGI IX2 TRIGGER
      if (!storedData) return;

      // Require or enable input if
      /* if (storedData.required && !target.required) this.requireInputs([target]);
      if (storedData.enabled && !target.disabled) this.enableInputs([target]); */
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be hidden
   * @param {HTMLElement} parent - Parent container DOM Element of the target inputs.
   * @param {boolean} hasTrigger - Declares if custom Webflow Ix2 has been found. If not, perform default hide.
   */
  hideInputs(targets, parent, hasTrigger) {
    // Make sure that the parent is set to display:none in order to avoid crashes
    if (hasTrigger) {
      parent.style.display = 'none';
    }

    // If parent has no Webflow Ix2 trigger, perform default hide action
    else {
      parent.style.transition = 'opacity 0.5s ease';

      parent.addEventListener(
        'transitionend',
        (e) => {
          parent.style.display = 'none';
          parent.style.transition = '';
        },
        { once: true }
      );

      parent.style.opacity = '0';
    }

    // Update stored data
    targets.forEach((target) => {
      this.updateStoredData(target, 'visible', false);
    });

    // If hidden inputs must not be submitted, disable them.
    if (!this.submitHidden) this.disableInputs(targets);

    // Unrequire hidden inputs to avoid form submit bugs
    this.unrequireInputs(targets, false);
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be enabled
   */
  enableInputs(targets) {
    targets.forEach((target) => {
      const storedData = this.getStoredData(target);

      if (!storedData) console.log(`Target ${target} not found in stored data`);

      if (storedData.visible && storedData.disabled) target.disabled = false;

      this.updateStoredData(target, 'disabled', false);
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
      const storedData = this.getStoredData(target);

      if (!storedData) console.log(`Target ${target} not found in stored data`);

      if (storedData.visible && !storedData.required) target.required = true;

      this.updateStoredData(target, 'required', true);
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be unrequired
   * @param {boolean} [updateStore=true] - Determines if the stored value has to be updated.
   */
  unrequireInputs(targets, updateStore = true) {
    targets.forEach((target) => {
      const storedData = this.getStoredData(target);

      if (!storedData) console.log(`Target ${target} not found in stored data`);

      if (storedData.visible && storedData.required) target.required = false;

      if (updateStore) this.updateStoredData(target, 'required', false);
    });
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be cleared
   */
  clearInputs(targets) {}

  /**
   * Stores input data
   *
   * @param {string} selector - Query selector of the target
   */
  storeInputData(selector) {
    const element = document.querySelector(selector);
    if (!element) throwAlert(selector, 'wrong-selector');

    // Get element data
    const data = {
      element: element,
      visible: !!(
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
      ),
      required: element.required,
      disabled: element.disabled,
    };

    // Find element index in store
    const index = this.store.findIndex((data) => data.element === element);

    // If element is not stored, push it
    if (index === -1) this.store.push(data);
  }

  /**
   * Updates element values in store
   *
   * @param {HTMLElement} target - DOM Node of the target
   * @param {string} key - Key to update (visible, required, enabled)
   * @param {boolean} value - Boolean value to assign
   */
  updateStoredData(target, key, value) {
    // Find index of element
    const index = this.store.findIndex((data) => data.element === target);

    // Update store
    if (index > -1) this.store[index][key] = value;
    else console.log('Input not found in logic store');
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
    this.logicList.forEach((logic) => {
      // Add event listeners to all conditions origin
      this.addEvents(logic);

      // Store data of all targets of the actions
      logic.actions.forEach((action) => {
        this.storeInputData(action.selector);
      });
    });
  }
};
