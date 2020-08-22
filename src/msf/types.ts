export interface MSFParams {
  alertInteraction?: string;
  alertSelector?: string;
  alertText?: string;
  backSelector?: string;
  backText?: ButtonText[];
  completedPercentageSelector?: string;
  currentStepSelector?: string;
  formSelector: string;
  hiddeButtonsOnSubmit?: boolean;
  hiddenFormStep?: number;
  nextSelector: string;
  nextText?: ButtonText[];
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
