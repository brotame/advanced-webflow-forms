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

export type Actions = 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'unrequire' | 'custom';

export interface Action {
  selector: string; // Selector of the target element
  action: Actions; // Action to be triggered
  clear: boolean; // Determines if the input value has to be cleared when the action is triggered
}

export interface Logic {
  conditions: Condition[]; // List of conditions that have to be met
  operator: 'and' | 'or'; // Operator for the conditions | and: all conditions have to be met | or: only one condition has to be met
  actions: Action[]; // List of actions to trigger
}

export interface LogicParams {
  logicList: Logic[]; // Array of conditions and actions to perform
  submitHiddenInputs: boolean; // Determines if hidden inputs must be submitted
  checkConditionsOnLoad: boolean; // Determines if the conditions of the logicList must be checked when the page loads
}
