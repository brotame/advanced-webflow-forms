import MSF from './msf/MSF';

// Global declarations
declare global {
  interface Window {
    Webflow: any;
    formLogic: FormLogic;
  }
}
