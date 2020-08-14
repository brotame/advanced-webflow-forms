import { select, getDistanceFromTop, convertToString } from './helpers';
import { MSFParams, FormElement, NextText } from './types';

export default class View {
  form: HTMLFormElement;
  next: HTMLElement;
  back?: HTMLElement;
  alert?: HTMLElement;
  submitButton: HTMLInputElement;
  slider: HTMLElement;
  mask: HTMLElement;
  steps: NodeListOf<HTMLElement>;
  rightArrow: HTMLElement;
  leftArrow: HTMLElement;
  sliderDots: NodeListOf<HTMLElement>;
  navLinks: NodeListOf<HTMLElement>;
  nextText: string | NextText[];
  submitText: string;
  warningClass?: string;
  alertText?: string;
  scrollTopOnStepChange?: boolean;
  hiddeButtonsOnSubmit?: boolean;
  sendHiddenForm?: boolean;
  hiddenFormStep?: number;
  hiddenForm!: HTMLFormElement;
  hiddenSubmitButton!: HTMLInputElement;
  inputs: FormElement[];

  /**
   * MSF View Constructor
   * @param MSFParams
   */
  constructor({
    formSelector,
    nextSelector,
    backSelector,
    alertSelector,
    nextButtonText,
    submitButtonText,
    warningClass,
    alertText,
    scrollTopOnStepChange,
    hiddeButtonsOnSubmit = true,
    sendHiddenForm = false,
    hiddenFormStep = 1,
  }: MSFParams) {
    this.form = select({
      required: true,
      selector: formSelector,
      errorMessage: `No form was found with the selector ${formSelector}`,
    }) as HTMLFormElement;
    this.next = select({
      required: true,
      selector: nextSelector,
      errorMessage: `No next button was found with the selector ${nextSelector}`,
    }) as HTMLElement;
    this.back = select({
      selector: backSelector,
      errorMessage: `No back button was found with the selector ${backSelector}`,
    }) as HTMLElement | undefined;
    this.alert = select({
      selector: alertSelector,
      errorMessage: `No alert element was found with the selector ${alertSelector}`,
    }) as HTMLElement | undefined;
    this.submitButton = select({
      selector: 'input[type="submit"]',
      errorMessage: 'No submit button was found in the form, please add one.',
      scope: this.form,
    }) as HTMLInputElement;
    this.slider = select({
      selector: '.w-slider',
      errorMessage: 'No slider found inside the form, please add one.',
      scope: this.form,
    }) as HTMLElement;
    this.mask = this.form.querySelector('.w-slider-mask') as HTMLElement;
    this.steps = this.form.querySelectorAll('.w-slide') as NodeListOf<
      HTMLElement
    >;
    this.rightArrow = this.form.querySelector(
      '.w-slider-arrow-right'
    ) as HTMLElement;
    this.leftArrow = this.form.querySelector(
      '.w-slider-arrow-left'
    ) as HTMLElement;
    this.sliderDots = this.form.querySelectorAll('.w-slider-dot') as NodeListOf<
      HTMLElement
    >;
    this.navLinks = document.querySelectorAll('[data-msf-nav]') as NodeListOf<
      HTMLElement
    >;
    this.nextText = nextButtonText || this.next.textContent || 'Next';
    this.submitText = submitButtonText || this.submitButton.value;
    this.warningClass = warningClass;
    this.alertText = alertText;
    this.scrollTopOnStepChange = scrollTopOnStepChange;
    this.hiddeButtonsOnSubmit = hiddeButtonsOnSubmit;
    this.sendHiddenForm = sendHiddenForm;
    this.hiddenFormStep = hiddenFormStep >= 1 ? hiddenFormStep : 1;
    this.inputs = this.getInputs();
  }

  /**
   * Set the height of the slider mask to fit the current step
   * @param currentStep - Current step of the form
   */
  setMaskHeight(currentStep: number) {
    this.mask.style.height = '';
    this.mask.style.height = `${this.steps[currentStep].offsetHeight}px`;
  }

  /**
   * Get all the inputs inside the form or a single slide
   * @param index - Index of the requested step
   */
  getInputs(index?: number) {
    const inputs = index
      ? this.steps[index].querySelectorAll<FormElement>(
          'input, select, textarea'
        )
      : this.form.querySelectorAll<FormElement>('input, select, textarea');

    return Array.from(inputs);
  }

  /**
   * Sets the text of the next button
   * @param currentStep - Current step of the form
   */
  setButtonText(currentStep: number) {
    // If current step is the last one, set submit text
    if (currentStep === this.steps.length - 1) {
      this.next.textContent = this.submitText;
      return;
    }

    // If nextText is a string, set the text only if current step is second-to-last
    if (
      typeof this.nextText === 'string' &&
      currentStep === this.steps.length - 2
    ) {
      this.next.textContent = this.nextText;
      return;
    }

    // If nextText is an array, set the text to the correspondent step or fall back to the last one
    if (Array.isArray(this.nextText)) {
      for (let i = 0; i++; i = currentStep) {
        const index = this.nextText.findIndex(
          (object) => object.step - 1 === currentStep - i
        );

        if (index > 1) {
          this.next.textContent = this.nextText[index].text;
          break;
        }
      }
    }
  }

  /**
   * Clicks the right arrow of the slider
   */
  goNext() {
    this.rightArrow.click();
  }

  /**
   * Clicks the left arrow of the slider
   */
  goBack() {
    if (this.back) this.leftArrow.click();
  }

  /**
   * Clicks the submit button of the form
   */
  submitForm() {
    this.submitButton.click();
  }

  /**
   * Submits the hidden form
   */
  submitHiddenForm() {
    if (this.sendHiddenForm) this.hiddenSubmitButton.click();
  }

  /**
   * Add the waning class to an element
   * @param element - Element to be affected
   */
  addWarningClass(element: Element) {
    if (!this.warningClass) return;

    element.classList.add(this.warningClass);
  }

  /**
   * Remove the waning class from an element
   * @param element - Element to be affected
   */
  removeWarningClass(element: Element) {
    if (!this.warningClass) return;

    element.classList.remove(this.warningClass);
  }

  /**
   * Hide an element
   * @param element - Element to be hidden
   * @param hiddenClass - Determines if the class .msf-hidden must be added
   */
  hideElement(element?: HTMLElement, hiddenClass = false) {
    if (!element) return;

    const afterTransition = () => {
      element.classList.add('msf-hidden');
      element.removeEventListener('transitionend', afterTransition);
    };

    if (hiddenClass) element.addEventListener('transitionend', afterTransition);

    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
  }

  /**
   * Show an element
   * @param element - Element to be shown
   * @param hiddenClass - Determines if the class .msf-hidden must be removed
   */
  showElement(element?: HTMLElement, hiddenClass = false) {
    if (!element) return;

    if (hiddenClass) element.classList.remove('msf-hidden');

    requestAnimationFrame(() => {
      element.style.opacity = '';
      element.style.pointerEvents = '';
    });
  }

  /**
   * Hide the navigation buttons
   */
  hideButtons() {
    if (!this.hiddeButtonsOnSubmit) return;

    this.hideElement(this.next);
    if (this.back) this.hideElement(this.back);
  }

  /**
   * Show the alerts
   */
  showAlert() {
    if (this.alertText) alert(this.alertText);
    if (this.alert) this.showElement(this.alert, true);
  }

  /**
   * Hide the alerts
   */
  hideAlert() {
    if (this.alert) this.hideElement(this.alert, true);
  }

  /**
   * Scroll to the top of the form
   */
  scrollTop() {
    if (!this.scrollTopOnStepChange) return;

    window.scrollTo({
      top: getDistanceFromTop(this.form),
      behavior: 'smooth',
    });
  }

  /**
   * Set the values on the confirm elements or hidden inputs
   * @param input - Input origin
   * @param value - Input value
   */
  setValues(input: FormElement, value: string | boolean) {
    // Make sure the value is a string
    value = convertToString(value);

    // Get the display element
    const displayElement =
      document.querySelector(`[data-msf-value="${input.id}"]`) ||
      document.querySelector(`[data-msf-value="${input.name}"]`);

    // If a display element is found, set the input value
    if (displayElement) displayElement.textContent = value;

    // If the input has the msf-data-hidden attribute, set its value to the correspondent hidden form input
    if (input.hasAttribute('msf-data-hidden')) {
      const target = this.hiddenForm.querySelector(
        `input[name="${input.name}"]`
      );

      if (target instanceof HTMLInputElement) target.value = value;
    }
  }

  createHiddenForm() {
    if (!this.sendHiddenForm) return;

    // Create Hidden Form
    const template = `
    <div class="w-form" style="display: none;">
        <form id="msf-hidden-form" name="MSF Hidden Form" data-name="MSF Hidden Form">
            <input type="submit" value="Submit" data-wait="Please wait..." />
        </form>
    </div>
    `;
    const formParent = this.form.parentElement;

    if (!formParent) return;
    formParent.insertAdjacentHTML('afterend', template);

    // Store elements
    this.hiddenForm = formParent.parentElement
      ? (formParent.parentElement.querySelector(
          '#msf-hidden-form'
        ) as HTMLFormElement)
      : (document.querySelector('#msf-hidden-form') as HTMLFormElement);
    this.hiddenSubmitButton = this.hiddenForm.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;

    // Get inputs that must be sent
    const inputs = this.form.querySelectorAll<HTMLElement>('[data-msf-hidden]');

    // Create hidden inputs
    inputs.forEach((input) => {
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(input.tagName);
      const target = isInput
        ? (input as HTMLInputElement)
        : input.querySelector<HTMLInputElement>('input, select, textarea');

      if (target) {
        const notCreated = !this.hiddenForm.querySelector(
          `input[name="${target.name}"]`
        );

        if (notCreated) {
          const template = `<input type="hidden" name=${target.name} data-name=${target.name} />`;
          this.hiddenForm.insertAdjacentHTML('beforeend', template);
        }
      }
    });

    // Reset Webflow Validation
    (<any>window).Webflow && (<any>window).Webflow.ready();
    (<any>window).Webflow && (<any>window).Webflow.destroy();
    (<any>window).Webflow && (<any>window).Webflow.require('ix2').init();
  }
}
