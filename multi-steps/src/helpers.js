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

/**
 * Gets distance of an element to the top of the window
 * @param {HTMLElement} element
 */
export const getDistanceFromTop = (element) => {
  let location = 0;

  if (element.offsetParent) {
    do {
      location += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }

  return location >= 0 ? location : 0;
};
