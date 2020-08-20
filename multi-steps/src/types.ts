export interface MSFParams {
  alertInteraction?: string;
  alertSelector?: string;
  alertText?: string;
  backButtonText?: ButtonText[];
  backSelector?: string;
  completedPercentageSelector?: string;
  currentStepSelector?: string;
  formSelector: string;
  hiddeButtonsOnSubmit?: boolean;
  hiddenFormStep?: number;
  nextButtonText?: string | ButtonText[];
  nextSelector: string;
  scrollTopOnStepChange?: boolean;
  sendHiddenForm?: boolean;
  submitButtonText?: string;
  warningClass?: string;
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
