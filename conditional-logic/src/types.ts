interface Condition {
  selector: string;
  operator: string;
  value: string | boolean;
}

export interface Action {
  selector: string;
  action: string;
  clear: boolean;
}

export interface Logic {
  conditions: Condition[];
  operator: string;
  actions: Action[];
}

export interface LogicConstructor {
  logicList: Logic[];
  submitHiddenInputs: boolean;
  checkConditionsOnLoad: boolean;
}

export interface StoreData {
  element: FormElement;
  visible: boolean;
  required: boolean;
  disabled: boolean;
  parent: HTMLElement;
}

export type FormElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
