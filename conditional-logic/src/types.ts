interface Condition {
  selector: string;
  operator:
    | 'equal'
    | 'not-equal'
    | 'contain'
    | 'not-contain'
    | 'greater'
    | 'greater-equal'
    | 'less'
    | 'less-equal'
    | 'empty'
    | 'filled';
  value: string | boolean | number;
}

export interface Action {
  selector: string;
  action: string;
  clear: boolean;
}

export interface Logic {
  conditions: Condition[];
  operator: 'and' | 'or';
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
