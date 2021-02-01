import Store from '../Store';
import { MSFParams } from './types';
import View from './View';

export default class Controller {
  constructor(
    private store: Store,
    private view: View,
    {
      hiddeButtonsOnSubmit = true,
      hiddenFormStep = 1,
      scrollTopOnStepChange = false,
      sendHiddenForm = false,
    }: MSFParams
  ) {}
}
