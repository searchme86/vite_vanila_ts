import { boxInner, header, sideInner } from './variable.js';

const calcHeaderHeight = () => {
  if (header) {
    return header.offsetHeight;
  }
};

const resetBoxInner = () => {
  if (boxInner) {
    boxInner.style.transform = 'translate3d(0px, 0px, 0px)';
    boxInner.style.position = 'relative';
  }
};

const resetAsideBanner = () => {
  if (sideInner) {
    sideInner.style.position = 'relative';
    sideInner.style.top = '0px';
  }
};

const calcInitialMenuHeight = () => {
  if (boxInner) {
    let boxInnerOffsetHeight = boxInner.offsetHeight;
    return boxInnerOffsetHeight;
  }
};

const getViewPortWidth = () => {
  return window.innerWidth;
};

export {
  resetBoxInner,
  resetAsideBanner,
  calcInitialMenuHeight,
  getViewPortWidth,
  calcHeaderHeight,
};
