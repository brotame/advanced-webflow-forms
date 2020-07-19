import { getDistanceFromTop } from './helpers';

export default class View {
  /**
   * @param {string} formID - ID of the form
   * @param {string} nextID - ID of the next button
   * @param {string} [backID] - ID of the back button
   * @param {string} [alertID] - ID of the alert element
   * @param {string|Array} [nextButtonText] - Text of the next button, or array of objects with specific step text
   * @param {string} [submitButtonText] - Text of the submit button
   * @param {string} [warningClass] - Class to be applied to unfilled required inputs
   * @param {string} [alertText] - Text to be shown in an alert when required inputs are missing
   * @param {boolean} [scrollTopOnStepChange = false] - Determines if the browser must scroll to the top of the form on step change
   * @param {boolean} [hiddeButtonsOnSubmit = false] - Determines if the back and next buttons must hide when submitting the form
   * @param {boolean} [sendHiddenForm = false] - Determines if an additional hidden form must be sent when a specific step is completed
   * @param {number} [hiddenFormStep = 1] - Determines on which completed step the hidden form must be sent
   */
  constructor({
    formID,
    nextID,
    backID,
    alertID,
    nextButtonText,
    submitButtonText,
    warningClass,
    alertText,
    scrollTopOnStepChange = false,
    hiddeButtonsOnSubmit = true,
    sendHiddenForm = false,
    hiddenFormStep = 1,
  }) {
    this.form = document.getElementById(formID);
    this.next = document.getElementById(nextID);
    this.back = backID ? document.getElementById(backID) : undefined;
    this.alert = alertID ? document.getElementById(alertID) : undefined;
    this.submitButton = this.form.querySelector('input[type="submit"]');
    this.mask = this.form.querySelector('.w-slider-mask');
    this.steps = this.form.querySelectorAll('.w-slide');
    this.inputs = this.getInputs();
    this.rightArrow = this.form.querySelector('.w-slider-arrow-right');
    this.leftArrow = this.form.querySelector('.w-slider-arrow-left');
    this.sliderDots = this.form.querySelectorAll('.w-slider-dot');
    this.navLinks = document.querySelectorAll('[data-msf-nav]');
    this.nextText = nextButtonText || this.next.textContent;
    this.submitText = submitButtonText || this.submitButton.value;
    this.warningClass = warningClass;
    this.alertText = alertText;
    this.scrollTopOnStepChange = scrollTopOnStepChange;
    this.hiddeButtonsOnSubmit = hiddeButtonsOnSubmit;
    this.sendHiddenForm = sendHiddenForm;
    this.hiddenFormStep = hiddenFormStep >= 1 ? hiddenFormStep : 1;
  }

  /**
   * Set the height of the slider mask to fit the current step
   * @param {number} currentStep - Current step of the form
   */
  setMaskHeight(currentStep) {
    this.mask.style.height = null;
    this.mask.style.height = `${this.steps[currentStep].offsetHeight}px`;
  }

  /**
   * Get all the inputs inside the form or a single slide
   * @param {number} [index] - Index of the requested step
   */
  getInputs(index) {
    let inputs = [];

    if (index == null)
      inputs = this.form.querySelectorAll('input, select, textarea');
    else inputs = this.steps[index].querySelectorAll('input, select, textarea');

    return Array.from(inputs);
  }

  /**
   * Sets the text of the next button
   * @param {number} currentStep - Current step of the form
   */
  setButtonText(currentStep) {
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
    if (!!this.back) this.leftArrow.click();
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
    if (!this.sendHiddenForm) return;

    this.hiddenSubmitButton.click();
  }

  /**
   * Add the waning class to an element
   * @param {HTMLElement} element - Element to be affected
   */
  addWarningClass(element) {
    if (!this.warningClass) return;

    element.classList.add(this.warningClass);
  }

  /**
   * Remove the waning class from an element
   * @param {HTMLElement} element - Element to be affected
   */
  removeWarningClass(element) {
    if (!this.warningClass) return;

    element.classList.remove(this.warningClass);
  }

  /**
   * Hide an element
   * @param {HTMLElement} element
   */
  hideElement(element) {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
  }

  /**
   * Show an element
   * @param {HTMLElement} element
   */
  showElement(element) {
    element.style.opacity = null;
    element.style.pointerEvents = null;
  }

  /**
   * Hide the navigation buttons
   */
  hideButtons() {
    if (!this.hiddeButtonsOnSubmit) return;

    this.hideElement(this.next);
    this.hideElement(this.back);
  }

  /**
   * Show the alerts
   */
  showAlert() {
    if (!!this.alertText) alert(this.alertText);
    if (!!this.alert) this.showElement(this.alert);
  }

  /**
   * Hide the alerts
   */
  hideAlert() {
    if (!!this.alert) this.hideElement(this.alert);
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
  setValues(input, value) {
    const displayElement =
      document.querySelector(`[data-msf-value="${input.id}"]`) ||
      document.querySelector(`[data-msf-value="${input.name}"]`);

    // If a display element is found, set the input value
    if (!!displayElement) {
      displayElement.textContent = value || '-';
    }

    // If the input has the msf-data-hidden attribute, set its value to the correspondent hidden form input
    if (input.hasAttribute('msf-data-hidden')) {
      const target = this.hiddenForm.querySelector(
        `input[name="${input.name}"]`
      );

      target.value = value;
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

    this.form.parentElement.insertAdjacentHTML('afterend', template);

    // Store elements
    this.hiddenForm = this.form.parentElement.parentElement.querySelector(
      '#msf-hidden-form'
    );
    this.hiddenSubmitButton = this.hiddenForm.querySelector(
      'input[type="submit"]'
    );

    // Get inputs that must be sent
    const inputs = this.form.querySelectorAll('[data-msf-hidden]');

    // Create hidden inputs
    inputs.forEach((input) => {
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(input.tagName);
      const target = isInput
        ? input
        : input.querySelector('input, select, textarea');

      if (!!target) {
        const notCreated = !this.hiddenForm.querySelector(
          `input[name="${input.name}"]`
        );

        if (notCreated) {
          const template = `<input type="hidden" name=${input.name} data-name=${input.name} />`;
          this.hiddenForm.insertAdjacentHTML('beforeend', template);
        }
      }
    });

    // Reset Webflow Validation
    Webflow.destroy();
    Webflow.ready();
  }
}
