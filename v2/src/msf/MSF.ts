import Controller from './Controller';
import Store from '../Store';
import { MSFParams } from './types';
import View from './View';

export default class MSF {
  public view;
  public controller;

  constructor(store: Store, params: MSFParams) {
    this.view = new View(store, params);
    this.controller = new Controller(store, this.view, params);
  }
}
