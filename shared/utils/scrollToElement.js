import { TweenLite } from 'gsap';

export default (element, { speed = 1, offset } = {}) => {
  const scrollTop = window.pageYOffset || window.scrollY;
  const obj = { num: scrollTop };

  const domElement = typeof element === 'string' ? document.querySelector(element) : element;

  if (!domElement) {
    return;
  }

  let num = domElement.getBoundingClientRect().top + scrollTop;

  if (offset) {
    const { innerHeight } = window;
    const percentage = (parseInt(offset, 10) * innerHeight) / 100;

    num += percentage;
  }

  if (speed === Infinity) {
    return window.scrollTo(0, num);
  }

  TweenLite.to(
    obj,
    1,
    {
      num,
      ease: 'Power4.easeInOut',
      onUpdate: () => {
        window.scrollTo(0, obj.num);
      },
    },
  );
};
