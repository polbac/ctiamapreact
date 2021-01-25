import { observable } from 'mobx';

export default class UIStore {

  @observable
  isNavOpen = false;

  @observable
  shouldOpenOverlay = false;

  @observable
  isScrollDisabled = false;

  @observable
  lastScrollPosition = 0;

  @observable
  isSignupVisible = false;

  calculateScrollBarWidth() {
    const measure = document.createElement('div');

    measure.style.position = 'absolute';
    measure.style.top = '-30px';
    measure.style.overflow = 'scroll';
    measure.style.width = '30px';
    measure.style.height = '30px';
    document.body.appendChild(measure);

    const width = measure.offsetWidth - measure.clientWidth;

    document.body.removeChild(measure);

    return width;
  }

  get scrollBarWidth() {
    if (!__CLIENT__) {
      return 0;
    }

    if (!this.calculatedScrollBarWidth) {
      this.calculatedScrollBarWidth = this.calculateScrollBarWidth();
    }

    return this.calculatedScrollBarWidth;
  }
}
