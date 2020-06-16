import { throwAlert } from './helpers';

module.exports = class {
  constructor({ logicList, submitHidden = false }) {
    this.logicList = logicList;
    this.submitHidden = submitHidden;
    // this.store = [];
    // TEST DATA --- DELETE!!!
    this.store = [];
  }

  /**
   * Listen for inputs on each condition origin element
   *
   * @param {Object} logic - Object that contains conditions, operator and actions
   */
  addEvents(logic) {
    logic.conditions.forEach((condition) => {
      console.log(`Adding event for ${condition.selector}`);

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
   * @param {string} [operator = 'and'] - Operator for the conditions | and: all conditions have to be met | or: only one condition has to be met
   * @param {Array} actions - List of actions to trigger
   */
  checkConditions({ conditions, operator = 'and', actions }) {
    let pass = false;

    for (let condition of conditions) {
      console.log(
        `Checking if ${condition.selector} ${condition.operator} ${condition.value}`
      );

      // PENDENT DE FER QUE SI EL SELECTOR ÉS UN GRUP DE RADIOS, QUE SIGUI 'input[name"RADIO_GROUP"]:checked'
      const element = document.querySelector(condition.selector);
      if (!element) throwAlert(condition.selector, 'wrong-selector');

      // Get value of the origin
      const elementValue =
        element.type === 'checkbox' ? element.checked : element.value;
      const targetValue = condition.value;

      // Check condition
      switch (condition.operator) {
        case 'equal':
          pass = elementValue === targetValue ? true : false;
          break;
        case 'not-equal':
          pass = elementValue !== targetValue ? true : false;
          break;
        case 'contain':
          pass = elementValue.includes(targetValue) ? true : false;
          break;
        case 'not-contain':
          pass = !elementValue.includes(targetValue) ? true : false;
          break;
        case 'greater':
          pass = parseInt(elementValue) > parseInt(targetValue);
          break;
        case 'greater-equal':
          pass = parseInt(elementValue) >= parseInt(targetValue);
          break;
        case 'less':
          pass = parseInt(elementValue) < parseInt(targetValue);
          break;
        case 'less-equal':
          pass = parseInt(elementValue) <= parseInt(targetValue);
          break;
        case 'empty':
          pass = elementValue.length === 0;
          break;
        case 'filled':
          pass = elementValue.length > 0;
          break;
        default:
          console.log(`The operator ${condition.operator} is not valid.`);
      }

      // Operator determines if the loop must continue checking conditions
      if (operator === 'and' && !pass) break;
      if (operator === 'or' && pass) break;
    }

    console.log(`Conditions passed: ${pass}`);

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
    console.log(`Triggering ${action} for ${selector} and clearing: ${clear}`);

    const element = document.querySelector(selector);
    if (!element) throwAlert(selector, 'wrong-selector');

    // Get element targets
    const targets = this.getTargets(element);

    // Triggered parents will be stored in the array to avoid multiple triggers on the same element
    const triggered = [];

    targets.forEach((target) => {
      // Get stored data
      const { visible, required, disabled, parent } = this.getStoredData(
        target
      );

      // If element already meets the condition, abort
      if (action === 'show' && visible) return;
      if (action === 'hide' && !visible) return;
      if (action === 'enable' && !disabled) return;
      if (action === 'disable' && disabled) return;
      if (action === 'require' && required) return;
      if (action === 'unrequire' && !required) return;

      // Check for Webflow Ix2 Interaction
      let interaction = false;
      if (!triggered.includes(parent)) {
        interaction = this.triggerInteraction(parent, action);
        triggered.push(parent);
        console.log(`The triggered array is `);
        console.log(triggered);
      }

      // Perform the action
      switch (action) {
        case 'show':
          this.showInput(target, parent, interaction, required, disabled);
          break;

        case 'hide':
          this.hideInput(target, parent, interaction);
          break;

        case 'enable':
          this.enableInput(target, visible);
          break;

        case 'disable':
          this.disableInput(target, visible);
          break;

        case 'require':
          this.requireInput(target, visible);
          break;

        case 'unrequire':
          this.unrequireInput(target, visible);
          break;

        default:
          console.log(
            `No action (or wrong action name) has been provided for the ${selector} selector.`
          );
      }

      console.log('The triggered array is:');
      console.log(triggered);
    });

    // Clear the input
    if (clear) this.clearInputs(targets);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be shown
   * @param {HTMLElement} parent - DOM Node of the parent
   * @param {boolean} interaction - Determines if Webflow Ix2 was found
   */
  showInput(target, parent, interaction, required, disabled) {
    console.log(`Showing Input:`);
    console.log(target);

    // If parent has no Webflow Ix2 trigger, set to display block
    if (!interaction) parent.style.display = 'block';

    // Restore to stored values
    target.required = required;
    target.disabled = disabled;

    // Update stored data
    this.updateStoredData(target, 'visible', true);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be hidden
   * @param {HTMLElement} parent - DOM Node of the parent
   * @param {boolean} interaction - Determines if Webflow Ix2 was found
   */
  hideInput(target, parent, interaction) {
    console.log(`Hiding Input:`);
    console.log(target);

    // If parent has no Webflow Ix2 trigger, set to display none
    if (!interaction) parent.style.display = 'none';

    // If hidden inputs must not be submitted, disable them.
    if (!this.submitHidden) target.disabled = true;

    // Unrequire hidden inputs to avoid form submit bugs
    target.required = false;

    // Update stored data
    this.updateStoredData(target, 'visible', false);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be enabled
   * @param {boolean} visible - Determines if the target is visible
   */
  enableInput(target, visible) {
    console.log(`Enabling Input:`);
    console.log(target);

    // If target is visible, enable
    if (visible) target.disabled = false;

    // Update stored data
    this.updateStoredData(target, 'disabled', false);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be disabled
   * @param {boolean} visible - Determines if the target is visible
   */
  disableInput(target, visible) {
    console.log(`Disabling Input:`);
    console.log(target);

    // If target is visible, disable
    if (visible) target.disabled = true;

    // Update stored data
    this.updateStoredData(target, 'disabled', true);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be required
   * @param {boolean} visible - Determines if the target is visible
   */
  requireInput(target, visible) {
    console.log(`Requiring Input:`);
    console.log(target);

    // If target is visible, require
    if (visible) target.required = true;

    // Update stored data
    this.updateStoredData(target, 'required', true);
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target to be unrequired
   * @param {boolean} visible - Determines if the target is visible
   */
  unrequireInput(target, visible) {
    console.log(`Unrequiring Input:`);
    console.log(target);

    // If target is visible, unrequire
    if (visible) target.required = false;

    // Update stored data
    this.updateStoredData(target, 'required', false);
  }

  /**
   *
   * @param {HTMLElement} element - DOM Node of the element
   */
  getTargets(element) {
    // If element is not a form element, then is a group of elements
    const isGroup = ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
      ? false
      : true;

    console.log(`Getting targets from:`);
    console.log(element);
    console.log(`Which is a group: ${isGroup}`);

    return isGroup
      ? Array.from(element.querySelectorAll('input', 'select', 'textarea'))
      : [element];
  }

  /**
   *
   * @param {HTMLElement} parent - DOM Node that contains the Ix2 Triggers
   * @param {string} action - Action to be performed
   */
  triggerInteraction(parent, action) {
    console.log(`Triggering Interaction ${action} from parent:`);
    console.log(parent);

    // Search for Webflow Ix2 trigger and click it if found
    const trigger = parent.querySelector(`[data-logic="${action}"]`);

    console.log(`The trigger is:`);
    console.log(trigger);

    if (trigger) {
      trigger.click();
      return true;
    } else return false;
  }

  /**
   *
   * @param {Array} targets - Array of elements that have to be cleared
   */
  clearInputs(targets) {
    console.log('Clearing Inputs');

    targets.forEach((target) => {
      if (target.type === 'checkbox' || target.type === 'radio')
        target.checked = false;
      else target.value = '';
    });
  }

  /**
   * Stores input data
   *
   * @param {string} selector - Query selector of the element (group or single)
   */
  storeInputData(selector) {
    console.log(`Storing Input Data from selector ${selector}`);

    const element = document.querySelector(selector);
    if (!element) throwAlert(selector, 'wrong-selector');

    const targets = this.getTargets(element);

    targets.forEach((target) => {
      console.log(`Target being stored is:`);
      console.log(target);

      // Get element data
      const parent = target.closest('[data-logic="group"]');
      if (!parent) throwAlert(selector, 'no-parent');

      const data = {
        element: target,
        visible: !!(
          target.offsetWidth ||
          target.offsetHeight ||
          target.getClientRects().length
        ),
        required: target.required,
        disabled: target.disabled,
        parent: parent,
      };

      // Find element index in store
      const index = this.store.findIndex((data) => data.element === target);

      // If element is not stored, push it
      if (index === -1) this.store.push(data);

      console.log(`The data being stored is:`);
      console.log(data);
      console.log(`The index found in current stored data is: ${index}`);
    });
  }

  /**
   * Updates element values in store
   *
   * @param {HTMLElement} target - DOM Node of the target
   * @param {string} key - Key to update (visible, required, enabled)
   * @param {boolean} value - Boolean value to assign
   */
  updateStoredData(target, key, value) {
    console.log(`Updating Stored Data from:`);
    console.log(target);
    console.log(`Key: ${key}, Value: ${value}`);

    // Find index of element
    const index = this.store.findIndex((data) => data.element === target);

    // Update store
    if (index > -1) this.store[index][key] = value;
    else console.log('Input not found in logic store');
  }

  /**
   *
   * @param {HTMLElement} target - DOM Node of the target
   */
  getStoredData(target) {
    console.log(`Getting Stored Data from:`);
    console.log(target);

    // Check store values
    const storedData = this.store.find((data) => data.element === target);

    if (!storedData) return;

    return storedData;
  }

  init() {
    console.log('Initializing');

    this.logicList.forEach((logic) => {
      // Add event listeners to all conditions origin
      this.addEvents(logic);

      // Store data of all targets of the actions
      logic.actions.forEach((action) => {
        this.storeInputData(action.selector);
      });
    });
  }

  logStore() {
    console.log(this.store);
  }
};
