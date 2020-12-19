import {
  select,
  getDistanceFromTop,
  convertToString,
  isFormElement,
} from './helpers';
import { MSFParams, FormElement, ButtonText } from './types';

export default class View {
  alert?: HTMLElement;
  alertInteraction?: HTMLElement | null;
  alertText?: string;
  back?: HTMLElement;
  backText?: ButtonText[];
  completedPercentageDisplay?: HTMLElement;
  currentStepDisplay?: HTMLElement;
  form: HTMLFormElement;
  hiddeButtonsOnSubmit: boolean;
  hiddenForm!: HTMLFormElement;
  hiddenFormStep: number;
  hiddenSubmitButton!: HTMLInputElement;
  inputs: FormElement[];
  leftArrow: HTMLElement;
  mask: HTMLElement;
  navLinks: NodeListOf<HTMLElement>;
  next: HTMLElement;
  nextText: string | ButtonText[];
  rightArrow: HTMLElement;
  scrollTopOnStepChange: boolean;
  sendHiddenForm: boolean;
  slider: HTMLElement;
  sliderDots: NodeListOf<HTMLElement>;
  steps: NodeListOf<HTMLElement>;
  submitButton: HTMLInputElement;
  submitText: string;
  warningClass?: string;

  /**
   * MSF View Constructor
   * @param MSFParams
   */
  constructor({
    alertSelector,
    alertText,
    backSelector,
    backText,
    completedPercentageSelector,
    currentStepSelector,
    formSelector,
    hiddeButtonsOnSubmit = true,
    hiddenFormStep = 1,
    nextSelector,
    nextText,
    scrollTopOnStepChange = false,
    sendHiddenForm = false,
    warningClass,
  }: MSFParams) {
    // Form Element
    this.form = select({
      required: true,
      selector: formSelector,
      errorMessage: `No form was found with the selector ${formSelector}`,
      instance: 'HTMLFormElement',
    }) as HTMLFormElement;

    // Next Button
    this.next = select({
      required: true,
      selector: nextSelector,
      errorMessage: `No next button was found with the selector ${nextSelector}`,
    }) as HTMLElement;

    // Back Button
    this.back = select({
      selector: backSelector,
      errorMessage: `No back button was found with the selector ${backSelector}`,
    }) as HTMLElement | undefined;

    // Alert Element
    this.alert = select({
      selector: alertSelector,
      errorMessage: `No alert element was found with the selector ${alertSelector}`,
    }) as HTMLElement | undefined;

    // Submit Button
    this.submitButton = select({
      required: true,
      selector: 'input[type="submit"]',
      errorMessage: 'No submit button was found in the form, please add one.',
      scope: this.form,
      instance: 'HTMLInputElement',
    }) as HTMLInputElement;

    // Current Step Display
    this.currentStepDisplay = select({
      selector: currentStepSelector,
      errorMessage: `No alert element was found with the selector ${currentStepSelector}`,
    }) as HTMLElement | undefined;

    // Completed Percentage Display
    this.completedPercentageDisplay = select({
      selector: completedPercentageSelector,
      errorMessage: `No alert element was found with the selector ${completedPercentageSelector}`,
    }) as HTMLElement | undefined;

    // Slider
    this.slider = select({
      required: true,
      selector: '.w-slider',
      errorMessage: 'No slider found inside the form, please add one.',
      scope: this.form,
    }) as HTMLElement;

    // Slider Mask
    this.mask = this.form.querySelector('.w-slider-mask') as HTMLElement;

    // Slider Slides (Steps)
    this.steps = this.form.querySelectorAll<HTMLElement>('.w-slide');

    // Slider Right Arrow
    this.rightArrow = this.form.querySelector(
      '.w-slider-arrow-right'
    ) as HTMLElement;

    // Slider Left Arrow
    this.leftArrow = this.form.querySelector(
      '.w-slider-arrow-left'
    ) as HTMLElement;

    // Slider Dots
    this.sliderDots = this.form.querySelectorAll<HTMLElement>('.w-slider-dot');

    // Custom Nav Links
    this.navLinks = document.querySelectorAll<HTMLElement>('[data-msf-nav]');

    // Next Button Text
    this.nextText = nextText || this.next.textContent || 'Next';

    // Back Button Text
    this.backText = backText;

    // Submit Button Text
    this.submitText = this.submitButton.value;

    // Warning CSS Class
    this.warningClass = warningClass;

    // Alert Text
    this.alertText = alertText;

    // Alert Webflow Interaction
    this.alertInteraction = this.alert?.querySelector<HTMLElement>(
      '[data-msf="alert"]'
    );

    // Scroll On Step Change
    this.scrollTopOnStepChange = scrollTopOnStepChange;

    // Hide Next and Back Buttons on Submit
    this.hiddeButtonsOnSubmit = hiddeButtonsOnSubmit;

    // Send Hidden Form
    this.sendHiddenForm = sendHiddenForm;

    // Hidden Form Step
    this.hiddenFormStep = hiddenFormStep >= 1 ? hiddenFormStep : 1;

    // Form Inputs
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
    const inputs =
      typeof index === 'number'
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
    // If text is an array sets the text to the correspondent step or falls back to the last one
    const setText = (target: 'back' | 'next') => {
      const button = target === 'back' ? this.back : this.next;
      const buttonText = target === 'back' ? this.backText : this.nextText;

      if (button && Array.isArray(buttonText) && buttonText.length > 0) {
        for (let i = 0; i <= currentStep; i++) {
          const index = buttonText.findIndex(
            (object) => +object.step - 1 === currentStep - i
          );

          if (index >= 0) {
            button.textContent = buttonText[index].text;
            break;
          }
        }
      }
    };

    // Set back text
    setText('back');

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
    setText('next');
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
    this.leftArrow.click();
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
   * @param display - Sets if the element must be set to display:none
   */
  hideElement(element?: HTMLElement, display: boolean = false) {
    if (!element) return;

    // Check if the element has opacity transition
    const styles = getComputedStyle(element);
    if (styles.transition === 'all 0s ease 0s')
      element.style.transition = 'opacity 0.2s ease';

    if (display && styles.display !== 'none') {
      // Set to display:none after the opacity is set to 0
      const afterTransition = () => {
        element.style.display = 'none';
        element.removeEventListener('transitionend', afterTransition);
      };
      element.addEventListener('transitionend', afterTransition);
    }

    // Set opacity to 0;
    element.style.opacity = '0';
    this.disableElement(element);
  }

  /**
   * Show an element
   * @param element - Element to be shown
   * @param display - Sets if the element must be set to display:block
   */
  showElement(element?: HTMLElement, display: boolean = false) {
    if (!element) return;

    // Set display:block
    if (display) element.style.display = 'block';

    // Reset opacity and pointer events
    requestAnimationFrame(() => {
      element.style.opacity = '';
      this.enableElement(element);
    });
  }

  /**
   * Set an element style to pointer-events: none;
   * @param element - Element to be disabled
   */
  disableElement(element?: HTMLElement) {
    if (!element) return;
    element.style.pointerEvents = 'none';
  }

  /**
   * Remove pointer-events: none; style
   * @param element - Element to be disabled
   */
  enableElement(element?: HTMLElement) {
    if (!element) return;
    element.style.pointerEvents = '';
  }

  /**
   * Disable the navigation buttons
   */
  disableButtons() {
    this.disableElement(this.next);
    this.disableElement(this.back);
    this.navLinks.forEach((link) => this.disableElement(link));
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
    // If text is provided, show text alert
    if (this.alertText) alert(this.alertText);

    // If alert element is provided, show it
    if (!this.alert) return;

    // If Webflow Ix2 trigger is provided, click it
    if (this.alertInteraction) {
      this.alertInteraction.click();
      return;
    }

    // If not, set display:block
    this.showElement(this.alert, true);
  }

  /**
   * Hide the alert element
   */
  hideAlert() {
    // If alert element is provided, hide it
    if (!this.alert) return;

    // If Webflow Ix2 trigger is provided, click it
    if (this.alertInteraction) {
      this.alertInteraction.click();
      return;
    }

    // If not, set display:block
    this.hideElement(this.alert, true);
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

    // If the input has the [data-msf="hidden"] attribute, set its value to the correspondent hidden form input
    if (input.matches('[data-msf="hidden"]')) {
      const target = this.hiddenForm.querySelector(`#hidden-${input.id}`);

      if (target instanceof HTMLInputElement) target.value = value;
    }
  }

  /**
   * Set the value of the current step and the completed percentage
   * @param currentStep - Current step of the form
   */
  setStepsDisplay(currentStep: number) {
    if (this.currentStepDisplay)
      this.currentStepDisplay.textContent = (currentStep + 1).toString();

    if (this.completedPercentageDisplay)
      this.completedPercentageDisplay.textContent = `${Math.round(
        (currentStep / (this.steps.length - 1)) * 100
      )}%`;
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
    const inputs = this.form.querySelectorAll<HTMLElement>(
      '[data-msf="hidden"]'
    );

    // Create hidden inputs
    inputs.forEach((input) => {
      const target = isFormElement(input)
        ? input
        : input.querySelector<FormElement>('input, select, textarea');

      if (target) {
        const notCreated = !this.hiddenForm.querySelector(
          `#hidden-${input.id}`
        );

        if (notCreated) {
          const template = `<input type="hidden" id="hidden-${target.id}" name="${target.name}" data-name="${target.name}" />`;
          this.hiddenForm.insertAdjacentHTML('beforeend', template);
        }
      }
    });

    // Reset Webflow Validation
    (<any>window).Webflow && (<any>window).Webflow.destroy();
    (<any>window).Webflow && (<any>window).Webflow.ready();
    (<any>window).Webflow && (<any>window).Webflow.require('ix2')?.init();
  }
}
