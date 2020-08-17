export interface MSFParams {
  formSelector: string;
  nextSelector: string;
  backSelector?: string;
  alertSelector?: string;
  alertInteraction?: string;
  nextButtonText?: string | ButtonText[];
  backButtonText?: ButtonText[];
  submitButtonText?: string;
  warningClass?: string;
  alertText?: string;
  scrollTopOnStepChange?: boolean;
  hiddeButtonsOnSubmit?: boolean;
  sendHiddenForm?: boolean;
  hiddenFormStep?: number;
}

export interface ButtonText {
  step: number;
  text: string;
}

export type FormElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type instances = 'HTMLElement' | 'HTMLInputElement' | 'HTMLFormElement';
