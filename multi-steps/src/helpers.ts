import { FormElement, instances } from './types';

/**
 * Checks if an element is a form element
 * @param element
 */
export const isFormElement = (
  element: Element | EventTarget | null
): element is FormElement => {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  );
};

const checkHTMLElement = (element: Element | null): element is HTMLElement => {
  return element instanceof HTMLElement;
};

const checkHTMLInputElement = (
  element: Element | null
): element is HTMLInputElement => {
  return element instanceof HTMLInputElement;
};

const checkHTMLFormElement = (
  element: Element | null
): element is HTMLFormElement => {
  return element instanceof HTMLFormElement;
};

/**
 * Checks if a selector is valid
 */
export const select = ({
  required = false,
  selector,
  errorMessage,
  scope = document,
  instance,
}: {
  required?: boolean;
  selector?: string;
  errorMessage: string;
  scope?: Document | HTMLElement;
  instance?: instances;
}): HTMLElement | HTMLInputElement | HTMLFormElement | undefined => {
  if (!selector) {
    if (!required) return;
    else throw new Error(errorMessage);
  }

  const element = scope.querySelector(selector);

  switch (instance) {
    case 'HTMLInputElement':
      if (checkHTMLInputElement(element)) return element;
      else throw new Error(errorMessage);
    case 'HTMLFormElement':
      if (checkHTMLFormElement(element)) return element;
      else throw new Error(errorMessage);
    default:
      if (checkHTMLElement(element)) return element;
      else throw new Error(errorMessage);
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
 * Gets distance of an element to the top of the window
 * @param {HTMLElement} element
 */
export const getDistanceFromTop = (target: HTMLElement) => {
  let element: HTMLElement | null = target;
  let location = 0;

  if (element.offsetParent) {
    do {
      location += element.offsetTop;
      element =
        element.offsetParent instanceof HTMLElement
          ? element.offsetParent
          : null;
    } while (element);
  }

  return location >= 0 ? location : 0;
};

/**
 * Returns any boolean or number to a string
 * @param {string | number | boolean} value
 */
export const convertToString = (value: string | number | boolean) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  else return value ? 'true' : 'false';
};

/**
 * Checks if an email is valid
 * @param {string} email - Email to be checked
 */
export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
