//import { debounce, gt, gte, lt, lte } from 'lodash-es';
import debounce from 'lodash-es/debounce';
import gt from 'lodash-es/gt';
import gte from 'lodash-es/gte';
import lt from 'lodash-es/lt';
import lte from 'lodash-es/lte';
import { throwError, isVisible } from './helpers';
import {
  Logic,
  Action,
  LogicConstructor,
  StoreData,
  FormElement,
} from './types';

/**
 * ConditionalLogic for Webflow forms
 * By: Alex Iglesias - https://brota.me
 */
module.exports = class {
  /**
   * @param {Array} [logicList = []] - Array of conditions and actions to perform
   * @param {boolean} [submitHiddenInputs = false] - Determines if hidden inputs must be submitted
   * @param {boolean} [checkConditionsOnLoad = true] - Determines if the conditions of the logicList must be checked when the page loads
   */
  logicList: Logic[];
  submitHiddenInputs: boolean;
  checkConditionsOnLoad: boolean;
  store: StoreData[];
  constructor({
    logicList,
    submitHiddenInputs = false,
    checkConditionsOnLoad = true,
  }: LogicConstructor) {
    this.logicList = logicList;
    this.submitHiddenInputs = submitHiddenInputs;
    this.checkConditionsOnLoad = checkConditionsOnLoad;
    this.store = [];
    this.init();
  }

  /**
   * Init functionalities
   */
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

  /**
   * Listen for inputs on each condition origin element
   * @param {Object} logic - Object that contains conditions, operator and actions
   */
  addEvents(logic: Logic) {
    logic.conditions.forEach((condition) => {
      const element = document.querySelector<FormElement>(condition.selector);
      if (!element) {
        throwError(condition.selector, 'wrong-selector');
        return;
      }

      // Check conditions on load
      if (this.checkConditionsOnLoad) this.checkConditions(logic);

      // Debounce Check Conditions Function
      const debouncedCheck = debounce(this.checkConditions.bind(this), 200);

      // Add event listener
      element.addEventListener('input', () => {
        debouncedCheck(logic);
      });
    });
  }

  /**
   * Stores input data to keep track of each elements status (visible, required, enabled)
   * @param {string} selector - Query selector of the element (group or single)
   */
  storeInputData(selector: string) {
    // If it's a custom Ix2 interaction, don't store it.
    if (selector === 'custom') return;

    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      throwError(selector, 'wrong-selector');
      return;
    }

    const targets = this.getTargets(element);

    targets.forEach((target) => {
      // Get element data
      const parent = target.closest<HTMLElement>('[data-logic="parent"]');
      if (!parent) {
        throwError(selector, 'no-parent');
        return;
      }

      const data: StoreData = {
        element: target,
        visible: isVisible(target),
        required: target.required,
        disabled: target.disabled,
        parent: parent,
      };

      // Find element index in store
      const index = this.store.findIndex((data) => data.element === target);

      // If element is not stored, push it
      if (index === -1) this.store.push(data);
    });
  }

  /**
   * Check if conditions are met
   * @param {Array} conditions - List of conditions that have to be met
   * @param {string} [operator = 'and'] - Operator for the conditions | and: all conditions have to be met | or: only one condition has to be met
   * @param {Array} actions - List of actions to trigger
   */
  checkConditions({ conditions, operator = 'and', actions }: Logic) {
    let pass = false;

    for (let condition of conditions) {
      const element = document.querySelector<FormElement>(condition.selector);
      if (!element) {
        throwError(condition.selector, 'wrong-selector');
        return;
      }

      // Get value of the origin
      const elementValue =
        element.type === 'checkbox'
          ? (<HTMLInputElement>element).checked
          : element.value;
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
          if (
            typeof elementValue === 'string' &&
            typeof targetValue === 'string'
          )
            pass = elementValue.includes(targetValue) ? true : false;
          break;
        case 'not-contain':
          if (
            typeof elementValue === 'string' &&
            typeof targetValue === 'string'
          )
            pass = !elementValue.includes(targetValue) ? true : false;
          break;
        case 'greater':
          pass = gt(elementValue, targetValue);
          break;
        case 'greater-equal':
          pass = gte(elementValue, targetValue);
          break;
        case 'less':
          pass = lt(elementValue, targetValue);
          break;
        case 'less-equal':
          pass = lte(elementValue, targetValue);
          break;
        case 'empty':
          if (typeof elementValue === 'string')
            pass = elementValue.length === 0;
          break;
        case 'filled':
          if (typeof elementValue === 'string') pass = elementValue.length > 0;
          break;
        default:
          throwError(condition.selector, 'wrong-operator');
      }

      // Operator determines if the loop must continue checking conditions
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
   * @param {Action} object - Selector of the target element
   * @param {string} action - Action to be triggered (show, hide, enable, disable, require, unrequire)
   * @param {boolean} [clear=false] - Determines if the input value has to be cleared when the action is triggered
   */
  triggerAction({ selector, action, clear = false }: Action) {
    // If it's a custom Ix2 interaction, trigger it and return.
    if (selector === 'custom') {
      this.triggerInteraction({ action, custom: true });
      return;
    }

    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      throwError(selector, 'wrong-selector');
      return;
    }

    // Get element targets
    const targets = this.getTargets(element);

    // Triggered parents will be stored in the array to avoid multiple triggers on the same element
    const triggeredParents: HTMLElement[] = [];

    targets.forEach((target) => {
      // Get stored data
      const storedData = this.getStoredData(target)!;
      const { visible, required, disabled, parent } = storedData;

      // If element already meets the condition, abort
      if (action === 'show' && visible) return;
      if (action === 'hide' && !visible) return;
      if (action === 'enable' && !disabled) return;
      if (action === 'disable' && disabled) return;
      if (action === 'require' && required) return;
      if (action === 'unrequire' && !required) return;

      // Check for Webflow Ix2 Interaction
      const notTriggered = !triggeredParents.includes(parent);
      let interactionExists = false;

      if (notTriggered) {
        interactionExists = this.triggerInteraction({ parent, action });
        triggeredParents.push(parent);
      }

      // Perform the action
      switch (action) {
        case 'show':
          this.showInput(
            target,
            parent,
            interactionExists,
            notTriggered,
            required,
            disabled
          );
          break;

        case 'hide':
          this.hideInput(target, parent, interactionExists, notTriggered);
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
          throwError(selector, 'wrong-action');
      }

      // Clear the input
      if (clear) this.clearInput(target);
    });
  }

  /**
   * Show an input
   * @param {FormElement} target - Target to be shown
   * @param {HTMLElement} parent - DOM Node of the parent
   * @param {boolean} interactionExists - Determines if Webflow Ix2 was found
   * @param {boolean} notTriggered - Determines if Webflow Ix2 was already triggered
   * @param {boolean} required - Determines if the input is required
   * @param {boolean} disabled - Determines if the input is disabled
   */
  showInput(
    target: FormElement,
    parent: HTMLElement,
    interactionExists: boolean,
    notTriggered: boolean,
    required: boolean,
    disabled: boolean
  ) {
    // If parent has no Webflow Ix2 trigger, set to display block
    if (!interactionExists && notTriggered) parent.style.display = 'block';

    // Restore to stored values
    target.required = required;
    target.disabled = disabled;

    // Update stored data
    this.updateStoredData(target, 'visible', true);
  }

  /**
   * Hide an input
   * @param {FormElement} target - Target to be hidden
   * @param {HTMLElement} parent - DOM Node of the parent
   * @param {boolean} interactionExists - Determines if Webflow Ix2 was found
   * @param {boolean} notTriggered - Determines if Webflow Ix2 was already triggered
   */
  hideInput(
    target: FormElement,
    parent: HTMLElement,
    interactionExists: boolean,
    notTriggered: boolean
  ) {
    // If parent has no Webflow Ix2 trigger, set to display none
    if (!interactionExists && notTriggered) parent.style.display = 'none';

    // If hidden inputs must not be submitted, disable them.
    if (!this.submitHiddenInputs) target.disabled = true;

    // Unrequire hidden inputs to avoid form submit bugs
    target.required = false;

    // Update stored data
    this.updateStoredData(target, 'visible', false);
  }

  /**
   * Enable an input
   * @param {FormElement} target - Target to be enabled
   * @param {boolean} visible - Determines if the target is visible
   */
  enableInput(target: FormElement, visible: boolean) {
    // If target is visible, enable
    if (visible) target.disabled = false;

    // Update stored data
    this.updateStoredData(target, 'disabled', false);
  }

  /**
   * Disable an input
   * @param {FormElement} target - Target to be disabled
   * @param {boolean} visible - Determines if the target is visible
   */
  disableInput(target: FormElement, visible: boolean) {
    // If target is visible, disable
    if (visible) target.disabled = true;

    // Update stored data
    this.updateStoredData(target, 'disabled', true);
  }

  /**
   * Require an input
   * @param {FormElement} target - Target to be required
   * @param {boolean} visible - Determines if the target is visible
   */
  requireInput(target: FormElement, visible: boolean) {
    // If target is visible, require
    if (visible) target.required = true;

    // Update stored data
    this.updateStoredData(target, 'required', true);
  }

  /**
   * Unrequire an input
   * @param {FormElement} target - Target to be unrequired
   * @param {boolean} visible - Determines if the target is visible
   */
  unrequireInput(target: FormElement, visible: boolean) {
    // If target is visible, unrequire
    if (visible) target.required = false;

    // Update stored data
    this.updateStoredData(target, 'required', false);
  }

  /**
   * Get targets inside a parent wrapper
   * @param {HTMLElement} element - DOM Node of the element
   */
  getTargets(element: HTMLElement) {
    // If element is not a form element, then is a group of elements
    const isGroup = !['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);

    return isGroup
      ? Array.from(
          element.querySelectorAll('input, select, textarea') as NodeListOf<
            FormElement
          >
        )
      : [element as FormElement];
  }

  /**
   * Trigger custom Webflow Interaction
   * @param {HTMLElement} parent - DOM Node that contains the Ix2 Triggers
   * @param {string} action - Action to be performed
   * @param {boolean} [custom=false] - If the interaction is a custom one
   */
  triggerInteraction({
    parent,
    action,
    custom,
  }: {
    parent: HTMLElement;
    action: string;
    custom?: false;
  }): boolean;
  triggerInteraction({
    parent,
    action,
    custom,
  }: {
    parent?: HTMLElement;
    action: string;
    custom: true;
  }): boolean;
  triggerInteraction({
    parent,
    action,
    custom = false,
  }: {
    parent?: HTMLElement;
    action: string;
    custom?: boolean;
  }): boolean {
    // Search for Webflow Ix2 trigger and click it if found
    const trigger = custom
      ? document.querySelector<HTMLElement>(`[data-logic="${action}"]`)
      : parent
      ? parent.querySelector<HTMLElement>(`[data-logic="${action}"]`)
      : null;

    if (trigger) {
      trigger.click();
      return true;
    } else return false;
  }

  /**
   * Clear the value of an input
   * @param {HTMLElement} target - Element that has to be cleared
   */
  clearInput(target: FormElement) {
    if (target.type === 'checkbox' || target.type === 'radio')
      (<HTMLInputElement>target).checked = false;
    else target.value = '';
  }

  /**
   * Updates element values in store
   * @param {HTMLElement} target - DOM Node of the target
   * @param {string} key - Key to update (visible, required, enabled)
   * @param {boolean} value - Boolean value to assign
   */
  updateStoredData(
    target: FormElement,
    key: 'visible' | 'required' | 'disabled',
    value: boolean
  ) {
    // Find index of element
    const index = this.store.findIndex((data) => data.element === target);

    // Update store
    if (index > -1) this.store[index][key] = value;
  }

  /**
   * @param {FormElement} target - DOM Node of the target
   */
  getStoredData(target: FormElement) {
    // Check store values
    const storedData = this.store.find((data) => data.element === target);

    return storedData;
  }
};
