/**
 * Display an alert and throw an exception
 * @param message
 */
export const throwAlert = <T>(message: string): T => {
  alert(message);
  throw new Error(message);
};

/**
 * Restart Webflow JS library
 */
export const restartWebflow = () => {
  window.Webflow.destroy();
  window.Webflow.ready();
};

/**
 * Restar Webflow Ix2
 */
export const restartWebflowIx2 = () => {
  if (!window.Webflow.require('ix2')) return;
  window.Webflow.require('ix2').destroy();
  window.Webflow.require('ix2').init();
};
