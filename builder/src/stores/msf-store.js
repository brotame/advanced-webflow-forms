import { writable } from 'svelte/store';

const store = writable({
  formID: 'msf',
  nextButtonID: 'msf-next',
  backButtonID: 'msf-back',
  nextButtonText: 'Next',
  submitButtonText: 'Submit',
  warningClass: 'warning',
  alertText: 'Please, fill all the required fields.',
  alertElementID: 'msf-alert',
  hiddenFormID: 'hidden-form',
});

const customStore = {
  subscribe: store.subscribe,
};

export default customStore;
