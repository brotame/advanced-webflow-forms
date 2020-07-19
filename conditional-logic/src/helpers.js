/**
 *
 * @param {string} selector - Selector that was not found
 * @param {string} error - Error type
 */
export const throwAlert = (selector, error) => {
  switch (error) {
    case 'wrong-selector':
      alert(
        `The element with a selector ${selector} has not been found. Please, check if you've set it correctly.`
      );
      break;

    case 'no-parent':
      alert(
        `The element with a selector ${selector} hasn't got any parent with the [data-logic="parent"] attibute.`
      );
      break;
    case 'wrong-action':
      alert(
        `No action (or wrong action name) has been provided for the ${selector} selector.`
      );
      break;
    case 'wrong-operator':
      alert(`The operator of the selector ${selector} is not valid.`);
      break;
  }
};

/**
 * Checks if an element is visible
 * @param {HTMLElement} element
 */
export const isVisible = (element) =>
  !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );
