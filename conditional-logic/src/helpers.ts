/**
 *
 * @param {string} selector - Selector that was not found
 * @param {string} error - Error type
 */
export const throwError = (
  selector: string,
  error: 'wrong-selector' | 'no-parent' | 'wrong-action' | 'wrong-operator'
): never => {
  switch (error) {
    case 'wrong-selector':
      throw new Error(
        `The element with a selector ${selector} has not been found. Please, check if you've set it correctly.`
      );

    case 'no-parent':
      throw new Error(
        `The element with a selector ${selector} hasn't got any parent with the [data-logic="parent"] attibute.`
      );

    case 'wrong-action':
      throw new Error(
        `No action (or wrong action name) has been provided for the ${selector} selector.`
      );

    case 'wrong-operator':
      throw new Error(`The operator of the selector ${selector} is not valid.`);
  }
};

/**
 * Checks if an element is visible
 * @param {HTMLElement} element
 */
export const isVisible = (element: HTMLElement) =>
  !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );

/**
 * Returns a string 'true' or 'false'
 * @param {value} boolean
 */
export const convertToString = (value: string | number | boolean) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  else return value ? 'true' : 'false';
};
