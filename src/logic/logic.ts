import debounce from 'lodash-es/debounce';
import {
  throwError,
  isVisible,
  convertToString,
  isFormElement,
} from './helpers';
import {
  Logic,
  Actions,
  Action,
  LogicConstructor,
  StoreData,
  FormElement,
} from './types';

/**
 * Conditional Logic for Webflow forms.
 * By: Alex Iglesias - https://brota.me
 */
export default class {
  logicList: Logic[] = [];
  submitHiddenInputs: boolean = false;
  checkConditionsOnLoad: boolean = true;
  store: StoreData[];

  constructor(params: LogicConstructor) {
    Object.assign(this, params);
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
        this.storeInputData(action.selector, action.action);
      });
    });
  }

  /**
   * Listen for inputs on each condition origin element
   * @param logic - Object that contains conditions, operator and actions
   */
  addEvents(logic: Logic) {
    logic.conditions.forEach((condition) => {
      // Select condition origin
      const element = document.querySelector(condition.selector);
      if (!isFormElement(element)) {
        throwError(condition.selector, 'wrong-selector');
        return;
      }

      // Check conditions
      if (this.checkConditionsOnLoad) this.checkConditions(logic);

      // Debounce Check Conditions Function
      const debouncedCheck = debounce(this.checkConditions.bind(this), 200);
      const debounceTypes = [
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'textarea',
        'url',
      ];

      // Add event listener
      element.addEventListener('input', () => {
        if (debounceTypes.includes(element.type)) debouncedCheck(logic);
        else this.checkConditions(logic);
      });
    });
  }

  /**
   * Stores input data to keep track of each elements status (visible, required, enabled)
   * @param selector - Query selector of the element (group or single)
   */
  storeInputData(selector: string, action: Actions) {
    // If it's a custom Ix2 interaction, don't store it.
    if (action === 'custom') return;

    const parent = document.querySelector(selector);
    if (!(parent instanceof HTMLElement)) {
      throwError(selector, 'wrong-selector');
      return;
    }

    const targets = this.getTargets(parent);

    targets.forEach((target) => {
      const data: StoreData = {
        element: target,
        visible: isVisible(target),
        required: target.required,
        disabled: target.disabled,
      };

      // Find element index in store
      const index = this.store.findIndex((data) => data.element === target);

      // If element is not stored, push it
      if (index === -1) this.store.push(data);
    });
  }

  /**
   * Check if conditions are met
   * @param params - Logic object
   */
  checkConditions({ conditions, operator = 'and', actions }: Logic) {
    let pass = false;

    for (let condition of conditions) {
      const element = document.querySelector(condition.selector);
      if (!isFormElement(element)) {
        throwError(condition.selector, 'wrong-selector');
        return;
      }

      // Get value of the origin
      const elementValue = convertToString(
        element.type === 'checkbox'
          ? (<HTMLInputElement>element).checked
          : element.value
      );

      const targetValue = convertToString(condition.value);

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
          pass = +elementValue > +targetValue;
          break;
        case 'greater-equal':
          pass = +elementValue >= +targetValue;
          break;
        case 'less':
          pass = +elementValue < +targetValue;
          break;
        case 'less-equal':
          pass = +elementValue <= +targetValue;
          break;
        case 'empty':
          pass = elementValue.length === 0;
          break;
        case 'filled':
          pass = elementValue.length > 0;
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
   * @param params - Action object
   */
  triggerAction({ selector, action, clear = false }: Action) {
    // If it's a custom Ix2 interaction, trigger it and return.
    const parent = document.querySelector(selector);
    if (!(parent instanceof HTMLElement)) {
      throwError(selector, 'wrong-selector');
      return;
    }

    if (action === 'custom') {
      this.triggerInteraction(parent, action);
      return;
    }

    // Get element targets
    const targets = this.getTargets(parent);

    targets.forEach((target) => {
      // Get stored data
      const storedData = this.getStoredData(target);
      const { visible, required, disabled } = storedData;

      // If element already meets the condition, abort
      if (action === 'show' && visible) return;
      if (action === 'hide' && !visible) return;
      if (action === 'enable' && !disabled) return;
      if (action === 'disable' && disabled) return;
      if (action === 'require' && required) return;
      if (action === 'unrequire' && !required) return;

      // Check for Webflow Ix2 Interaction
      const interactionExists = this.triggerInteraction(parent, action);

      // Perform the action
      switch (action) {
        case 'show':
          this.showInput(target, parent, interactionExists, required, disabled);
          break;

        case 'hide':
          this.hideInput(target, parent, interactionExists);
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
   * @param target - Target to be shown
   * @param parent - DOM Node of the parent
   * @param interactionExists - Determines if Webflow Ix2 was found
   * @param required - Determines if the input is required
   * @param disabled - Determines if the input is disabled
   */
  showInput(
    target: FormElement,
    parent: HTMLElement,
    interactionExists: boolean,
    required: boolean,
    disabled: boolean
  ) {
    // If parent has no Webflow Ix2 trigger, set to display block
    if (!interactionExists) parent.style.display = 'block';

    // Restore to stored values
    target.required = required;
    target.disabled = disabled;

    // Update stored data
    this.updateStoredData(target, 'visible', true);
  }

  /**
   * Hide an input
   * @param target - Target to be hidden
   * @param parent - DOM Node of the parent
   * @param interactionExists - Determines if Webflow Ix2 was found
   */
  hideInput(
    target: FormElement,
    parent: HTMLElement,
    interactionExists: boolean
  ) {
    // If parent has no Webflow Ix2 trigger, set to display none
    if (!interactionExists) parent.style.display = 'none';

    // If hidden inputs must not be submitted, disable them.
    if (!this.submitHiddenInputs) target.disabled = true;

    // Unrequire hidden inputs to avoid form submit bugs
    target.required = false;

    // Update stored data
    this.updateStoredData(target, 'visible', false);
  }

  /**
   * Enable an input
   * @param target - Target to be enabled
   * @param visible - Determines if the target is visible
   */
  enableInput(target: FormElement, visible: boolean) {
    // If target is visible, enable
    if (visible) target.disabled = false;

    // Update stored data
    this.updateStoredData(target, 'disabled', false);
  }

  /**
   * Disable an input
   * @param target - Target to be disabled
   * @param visible - Determines if the target is visible
   */
  disableInput(target: FormElement, visible: boolean) {
    // If target is visible, disable
    if (visible) target.disabled = true;

    // Update stored data
    this.updateStoredData(target, 'disabled', true);
  }

  /**
   * Require an input
   * @param target - Target to be required
   * @param visible - Determines if the target is visible
   */
  requireInput(target: FormElement, visible: boolean) {
    // If target is visible, require
    if (visible) target.required = true;

    // Update stored data
    this.updateStoredData(target, 'required', true);
  }

  /**
   * Unrequire an input
   * @param target - Target to be unrequired
   * @param visible - Determines if the target is visible
   */
  unrequireInput(target: FormElement, visible: boolean) {
    // If target is visible, unrequire
    if (visible) target.required = false;

    // Update stored data
    this.updateStoredData(target, 'required', false);
  }

  /**
   * Get targets inside a parent wrapper
   * @param element - DOM Node of the element
   */
  getTargets(element: Element) {
    // If element is not a form element, then is a group of elements
    return isFormElement(element)
      ? [element]
      : Array.from(
          element.querySelectorAll('input, select, textarea') as NodeListOf<
            FormElement
          >
        );
  }

  /**
   * Trigger custom Webflow Interaction
   * @param parent - Triggered parent
   * @param action - Action to perform
   */
  triggerInteraction(parent: HTMLElement, action: Actions) {
    // Search for Webflow Ix2 trigger
    const trigger =
      action === 'custom'
        ? parent
        : parent.querySelector(`[data-logic="${action}"]`);

    // Click it if found
    if (trigger instanceof HTMLElement) {
      trigger.click();
      return true;
    } else return false;
  }

  /**
   * Clear the value of an input
   * @param target - Element that has to be cleared
   */
  clearInput(target: FormElement) {
    if (target.type === 'checkbox' || target.type === 'radio')
      (<HTMLInputElement>target).checked = false;
    else target.value = '';
  }

  /**
   * Updates element values in store
   * @param target - DOM Node of the target
   * @param key - Key to update (visible, required, enabled)
   * @param value - Boolean value to assign
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
   * Get the stored data of a form element
   * @param target - DOM Node of the target
   */
  getStoredData(target: FormElement) {
    // Check store values
    return this.store.find((data) => data.element === target)!;
  }
}
