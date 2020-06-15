/**
 *
 * @param {string} selector - Selector that was not found
 * @param {string} error - Error type
 */
export function throwAlert(selector, error) {
  switch (error) {
    case 'wrong-selector':
      alert(
        `The element with a selector ${selector} has not been found. Please, check if you've set it correctly.`
      );
      break;

    case 'no-parent':
      alert(
        `The element with a selector ${selector} hasn't got any parent with the [data-logic="group"] attibute.`
      );
      break;
  }
}
