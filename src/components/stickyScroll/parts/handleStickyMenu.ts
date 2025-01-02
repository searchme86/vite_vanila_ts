import {
  applyStyleElem,
  stickyHeaderStyle,
  stickyMenuStyle,
} from '../utils/createStyleObj.js';
import { boxInner, boxMenu, header } from '../utils/variable.js';

import {
  resetBoxInner,
  calcStickyMenuHeight,
} from '../utils/stickyMenu/calcElemStickyMenu.js';
import { calcTriggerPoint } from '../utils/calcElemScroll.js';

import { getScrollY, isPastTriggerPoint } from '../utils/calcElemScroll.js';

const stickyMenu = () => {
  const scrollY = getScrollY();
  const stickyActionStartPoint = calcTriggerPoint('.box_menu', '.header');
  const initialStickyMenuHeight = calcStickyMenuHeight();

  scrollY >= 0 && applyStyleElem(header, stickyHeaderStyle);

  if (stickyActionStartPoint) {
    if (isPastTriggerPoint(scrollY, stickyActionStartPoint)) {
      applyStyleElem(boxInner, stickyMenuStyle);
      if (boxMenu) {
        boxMenu.style.height = `${initialStickyMenuHeight}px`;
      }
    } else {
      applyStyleElem(boxInner, stickyMenuStyle, false);
      resetBoxInner();
    }
  }
};

export { stickyMenu };
