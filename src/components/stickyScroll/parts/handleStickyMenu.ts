import {
  applyStyleElem,
  stickyElemStyle,
  stickyMenuStyle,
} from '../utils/createStyleObj.js';
import {
  boxInner,
  boxMenu,
  header,
  sideBar,
  sideInner,
} from '../utils/variable.js';

import {
  resetBoxInner,
  calcStickyMenuHeight,
} from '../utils/stickyMenu/calcElemStickyMenu.js';
import { calcTriggerPoint } from '../utils/calcElemScroll.js';

import { getScrollY, isPastTriggerPoint } from '../utils/calcElemScroll.js';

const stickyMenu = () => {
  const scrollY = getScrollY();
  const stickyMenuStartPoint = calcTriggerPoint('.box_menu', '.header');
  const stickyAsideMenuStartPoint = calcTriggerPoint('.sidebar', '.header');
  const initialStickyMenuHeight = calcStickyMenuHeight();

  scrollY >= 60
    ? applyStyleElem(header, stickyElemStyle)
    : applyStyleElem(header, stickyElemStyle, false);

  if (stickyMenuStartPoint) {
    if (isPastTriggerPoint(scrollY, stickyMenuStartPoint)) {
      if (boxInner) {
        const initialInnerBoxWidth = boxInner?.offsetWidth;
        applyStyleElem(boxInner, stickyMenuStyle);
        boxInner.style.width = `${initialInnerBoxWidth}px`;
      }

      if (boxMenu) {
        boxMenu.style.height = `${initialStickyMenuHeight}px`;
      }
    } else {
      applyStyleElem(boxInner, stickyMenuStyle, false);
      resetBoxInner();
    }
  }

  if (stickyAsideMenuStartPoint) {
    if (isPastTriggerPoint(scrollY, stickyAsideMenuStartPoint)) {
      if (sideBar) {
        const initialAsideInnerWidth = sideBar?.offsetWidth;
        const initialAsideInnerHeight = sideBar?.offsetHeight;

        if (sideInner) {
          sideInner.style.position = 'fixed';
          sideInner.style.top = '60px';
          sideInner.style.width = `${initialAsideInnerWidth}px`;
          sideInner.style.height = `${initialAsideInnerHeight}px`;
        }
      }
    } else {
      const windowSize = window.innerWidth;
      if (sideInner && windowSize >= 360) {
        sideInner.style.position = 'relative';
        sideInner.style.top = '0px';
      }
    }
  }
};

export { stickyMenu };
