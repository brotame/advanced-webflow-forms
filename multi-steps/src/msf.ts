import Controller from './controller';
import View from './view';
import { MSFParams } from './types';

module.exports = class {
  view: View;
  controller: Controller;
  constructor(params: MSFParams) {
    this.view = new View(params);
    this.controller = new Controller(this.view);
  }
};
