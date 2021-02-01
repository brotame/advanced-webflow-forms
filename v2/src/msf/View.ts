import Form from './components/Form';
import Slider from './components/Slider';
import Store from '../Store';
import { MSFParams } from './types';

export default class View {
  public form;
  public slider;

  constructor(
    private store: Store,
    {
      alertSelector,
      alertText,
      backSelector,
      backText,
      completedPercentageSelector,
      currentStepSelector,
      formSelector,
      nextText,
    }: MSFParams
  ) {
    this.form = new Form(this.store, formSelector);
    this.slider = new Slider(this.store, this.form.element);
  }
}
