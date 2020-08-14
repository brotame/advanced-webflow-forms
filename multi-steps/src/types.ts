export interface MSFParams {
  formSelector: string;
  nextSelector: string;
  backSelector?: string;
  alertSelector?: string;
  nextButtonText?: string | NextText[];
  submitButtonText?: string;
  warningClass?: string;
  alertText?: string;
  scrollTopOnStepChange?: boolean;
  hiddeButtonsOnSubmit?: boolean;
  sendHiddenForm?: boolean;
  hiddenFormStep?: number;
}

export type FormElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export interface NextText {
  step: number;
  text: string;
}
