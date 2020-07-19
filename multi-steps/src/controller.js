import { isVisible } from './helpers';

export default class Controller {
  constructor(view) {
    this.view = view;
    this.currentStep = 0;
    this.init();
  }

  /**
   * Init Functionalities
   */
  init() {
    this.view.setMaskHeight(this.currentStep);
    this.view.hideElement(this.view.back);
    this.view.hideAlert();
    this.view.createHiddenForm();
    this.setEvents();
  }

  /**
   * Add event listeners
   */
  setEvents() {
    // Set functions
    const nextClick = () => {
      this.nextClick();
    };
    const backClick = () => {
      this.backClick();
    };
    const navClick = (e) => {
      this.navClick(e);
    };
    const handleInput = (e) => {
      this.handleInput(e);
    };
    const submitHiddenForm = (e) => {
      if (this.currentStep === this.view.hiddenFormStep) {
        this.view.submitHiddenForm();
        e.currentTarget.removeEventListener('click', submitHiddenForm);
      }
    };

    // Add event listeners
    this.view.next.addEventListener('click', nextClick);

    this.view.back.addEventListener('click', backClick);

    this.view.navLinks.forEach((link) => {
      link.addEventListener('click', navClick);
    });

    this.view.inputs.forEach((input) => {
      input.addEventListener('input', handleInput);
    });

    if (this.view.sendHiddenForm)
      this.view.rightArrow.addEventListener('click', submitHiddenForm);
  }

  /**
   * Perform actions when the next button is clicked
   */
  nextClick() {
    const filledFields = this.checkRequiredInputs();

    // If required fields are missing, show alert and return
    if (!filledFields) {
      this.view.showAlert();
      return;
    }

    // Increase step count
    this.currentStep++;

    // If current step is 1, show back button
    if (this.currentStep === 1) this.view.showElement(this.view.back);

    // Perform actions depending on current step
    if (this.currentStep === this.view.steps.length) {
      this.view.submitForm();
      this.view.hideButtons();
    } else {
      this.view.goNext();
      this.view.setMaskHeight(this.currentStep);
      this.view.setButtonText(this.currentStep);
    }

    // Hide Alert
    this.view.hideAlert();

    // Scroll to the top of the form
    this.view.scrollTop();
  }

  /**
   * Perform actions when the next button is clicked
   */
  backClick() {
    const previousStep = this.currentStep - 1;

    // If user is on the first step, return
    if (previousStep < 0) return;

    // Go to the previous step
    this.view.goBack();

    // Set mask height
    this.view.setMaskHeight(previousStep);

    // Set next button text
    this.view.setButtonText(previousStep);

    // Hide alert
    this.view.hideAlert();

    // Scroll to the top of the form
    this.view.scrollTop();

    // If current step is 0, hide back button
    if (previousStep === 0) this.view.hideElement(this.view.back);

    // Set new current step
    this.currentStep = previousStep;
  }

  /**
   * Handle click event on custom navigation elements
   * @param {Object} e - Event object
   */
  navClick(e) {
    const step = e.currentTarget.dataset.msfNav - 1;

    // Go to requested step only if its lower than the current step
    if (step < this.currentStep) {
      this.view.sliderDots[step].click();
      this.currentStep = step;
      this.view.setMaskHeight();
      this.view.setButtonText(this.currentStep);
    }
  }

  /**
   * Handle input event: if input is filed, remove warning class and set correspondent values
   * @param {Object} e - Event object
   */
  handleInput(e) {
    const input = e.currentTarget;
    let value = null;

    // Perform actions depending on input type
    switch (input.type) {
      case 'checkbox':
        const checkbox = input.parentElement.querySelector('.w-checkbox-input');

        value = input.value;
        if (input.checked && !!checkbox) this.view.removeWarningClass(checkbox);
        break;

      case 'radio':
        const radio = input.parentElement.querySelector('.w-radio-input');
        const checkedOption = this.view.form.querySelector(
          `input[name="${input.name}"]:checked`
        );

        value = checkedOption.value;
        if (!!checkedOption && !!radio) this.view.removeWarningClass(radio);
        break;

      default:
        if (!input.value) break;
        if (input.type === 'email' && !this.validateEmail(input.value)) break;

        value = input.value;
        this.view.removeWarningClass(input);
    }

    // Set values of display and hidden form elements
    this.view.setValues(input, value);
  }

  /**
   * Check if all the required inputs in the current steps are filled and add a warning to those who are not
   * Returns true or false
   */
  checkRequiredInputs() {
    const inputs = this.view.getInputs(this.currentStep);
    const requiredInputs = inputs.filter(
      (input) => input.required && isVisible(input)
    );
    let filledInputs = 0;

    requiredInputs.forEach((input) => {
      switch (input.type) {
        case 'checkbox':
          const checkbox = input.parentElement.querySelector(
            '.w-checkbox-input'
          );

          if (!input.checkValidity() && !!checkbox)
            this.view.addWarningClass(checkbox);
          else filledInputs++;
          break;

        case 'radio':
          const radio = input.parentElement.querySelector('.w-radio-input');

          if (!input.checkValidity() && !!radio)
            this.view.addWarningClass(radio);
          else filledInputs++;
          break;

        default:
          if (!input.checkValidity()) {
            this.view.addWarningClass(input);
            break;
          } else if (
            input.type === 'email' &&
            !this.validateEmail(input.value)
          ) {
            this.view.addWarningClass(input);
            break;
          } else filledInputs++;
      }
    });

    return filledInputs === requiredInputs.length ? true : false;
  }

  /**
   * Checks if an email is valid
   * @param {string} email - Email to be checked
   */
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
