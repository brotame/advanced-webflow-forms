import Controller from './controller';
import View from './view';

module.exports = class {
  constructor(params) {
    this.view = new View(params);
    this.controller = new Controller(this.view);
  }
};
