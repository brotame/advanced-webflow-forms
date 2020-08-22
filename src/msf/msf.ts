import Controller from './controller';
import View from './view';
import { MSFParams } from './types';

/**
 * Multi Steps Functionality for Webflow forms
 * By: Alex Iglesias - https://brota.me
 */
export default class {
  view: View;
  controller: Controller;
  constructor(params: MSFParams) {
    this.view = new View(params);
    this.controller = new Controller(this.view);
  }
}
