import { getElemOffsetTopValue } from '../utils/calcElemOffsetTop.js';
import {
  applyStyleElem,
  stickyHeaderStyle,
  stickyMenuStyle,
} from '../utils/createStyleObj.js';
import { boxInner, boxMenu, header } from '../utils/variable.js';

const stickyMenu = () => {
  const resetBoxInner = () => {
    if (boxInner) {
      boxInner.style.transform = 'translate3d(0px, 0px, 0px)';
      boxInner.style.position = 'relative';
    }
  };

  const calcThresholdTrigger = () => {
    if (header) {
      const boxMenuOffsetTop = getElemOffsetTopValue('.box_menu');
      if (boxMenuOffsetTop) {
        const headerOffsetHeight = header?.offsetHeight;
        let thresholdDistance = boxMenuOffsetTop - headerOffsetHeight;
        return thresholdDistance;
      }
    }
  };

  const calcStickyMenuHeight = () => {
    if (boxInner) {
      let boxInnerOffsetHeight = boxInner.offsetHeight;
      return boxInnerOffsetHeight;
    }
  };

  const scrollY = window.scrollY;
  const triggerPoint = calcThresholdTrigger();

  const initialCalcForStickyScrollHeight = calcStickyMenuHeight();

  if (scrollY >= 0) {
    applyStyleElem(header, stickyHeaderStyle);
  }

  if (triggerPoint) {
    if (scrollY >= triggerPoint) {
      applyStyleElem(boxInner, stickyMenuStyle);
      if (boxMenu) {
        boxMenu.style.height = `${initialCalcForStickyScrollHeight}px`;
      }
    } else {
      applyStyleElem(boxInner, stickyMenuStyle, false);
      resetBoxInner();
    }
  }
};

export { stickyMenu };
