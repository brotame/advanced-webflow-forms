import Logic from './logic/Logic';
import MSF from './msf/MSF';
import Store from './Store';
import { MSFParams } from './msf/types';

window.formLogic = class FormLogic {
  store;
  msf;
  logic;

  constructor({ msf: msfParams, logic: logicParams }: { msf: MSFParams; logic: any }) {
    this.store = new Store();
    if (msfParams) this.msf = new MSF(this.store, msfParams);
    if (logicParams) this.logic = new Logic(this.store, logicParams);
  }
};
