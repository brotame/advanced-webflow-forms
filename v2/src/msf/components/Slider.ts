import { ERRORS } from '../../constants';
import { restartWebflow, throwAlert } from '../../helpers';
import Store from '../../Store';
import {
  SlideElement,
  SliderArrow,
  SliderDotElement,
  SliderElement,
  SliderMaskElement,
} from '../types';

export default class Slider {
  private slider: SliderElement;
  private mask: SliderMaskElement;
  private leftArrow: SliderArrow;
  private rightArrow: SliderArrow;
  public slides: NodeListOf<SlideElement>;
  private dots: NodeListOf<SliderDotElement>;

  constructor(private store: Store, form: HTMLFormElement) {
    this.slider = form.querySelector('.w-slider') || throwAlert(ERRORS.NO_SLIDER);
    this.mask = form.querySelector('.w-slider-mask') || throwAlert(ERRORS.NO_MASK);
    this.leftArrow = form.querySelector('.w-slider-arrow-left') || throwAlert(ERRORS.NO_ARROW);
    this.rightArrow = form.querySelector('.w-slider-arrow-right') || throwAlert(ERRORS.NO_ARROW);
    this.slides = form.querySelectorAll('.w-slide');
    if (!this.slides.length) throwAlert(ERRORS.NO_SLIDES);
    this.dots = form.querySelectorAll('.w-slider-dot');
    if (!this.dots.length) throwAlert(ERRORS.NO_SLIDES);

    // Init
    this.checkSliderValidity();
  }

  /**
   * Make sure the slider is properly set.
   */
  private checkSliderValidity() {
    const isValid =
      !this.slider.getAttribute('data-infinite') &&
      !this.slider.getAttribute('data-autoplay') &&
      this.slider.getAttribute('data-disable-swipe');
    if (isValid) return;

    this.slider.removeAttribute('data-infinite');
    this.slider.removeAttribute('data-autoplay');
    this.slider.setAttribute('data-disable-swipe', '1');
    restartWebflow();
  }

  /**
   * Go to the next slide
   */
  public goNext() {
    this.rightArrow.click();
  }

  /**
   * Go to the previous slide
   */
  public goBack() {
    this.leftArrow.click();
  }

  /**
   * Go to a specific step
   * @param step - 0 based index
   */
  public goTo(step: number) {}

  public resetMaskHeight() {
    this.mask.style.height = '';
    this.mask.style.height = `${this.slides[this.store.currentStep].offsetHeight}px`;
  }
}
