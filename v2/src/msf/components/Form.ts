import { ERRORS } from '../../constants';
import { throwAlert } from '../../helpers';
import Store from '../../Store';

export default class Form {
  public element: HTMLFormElement;

  constructor(private store: Store, selector: string) {
    // DOM Elements
    this.element = document.querySelector(selector) || throwAlert(ERRORS.NO_FORM(selector));
  }
}
