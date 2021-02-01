export const ERRORS = {
  NO_FORM: (selector: string) => `No form element with the ${selector} selector was found.`,
  NO_SLIDER: `No slider was found inside the form, please add one.`,
  NO_MASK: `No slider mask was found.`,
  NO_ARROW: `No arrows in the slider were found.`,
  NO_SLIDES: `There are no slides inside the slider.`,
  NO_DOTS: `There are no slides inside the slider.`,
} as const;
