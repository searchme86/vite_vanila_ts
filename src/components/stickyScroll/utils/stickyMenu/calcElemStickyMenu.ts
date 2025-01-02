import { boxInner } from '../variable.js';

const resetBoxInner = () => {
  if (boxInner) {
    boxInner.style.transform = 'translate3d(0px, 0px, 0px)';
    boxInner.style.position = 'relative';
  }
};

const calcStickyMenuHeight = () => {
  if (boxInner) {
    let boxInnerOffsetHeight = boxInner.offsetHeight;
    return boxInnerOffsetHeight;
  }
};

export { resetBoxInner, calcStickyMenuHeight };
