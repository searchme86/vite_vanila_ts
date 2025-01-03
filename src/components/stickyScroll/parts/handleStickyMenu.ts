import {
  applyStyleElem,
  stickyAsideMenuStyle,
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
  calcInitialMenuHeight,
  calcHeaderHeight,
  getViewPortWidth,
  resetAsideBanner,
} from '../utils/calcElemValue.js';
import { calcTriggerPoint } from '../utils/calcElemScroll.js';
import { getScrollY, isPastTriggerPoint } from '../utils/calcElemScroll.js';

const stickyMenu = () => {
  const browserScrollYValue = getScrollY();
  const valueWhenToMenuBeginSticky = calcTriggerPoint('.box_menu', '.header');
  const valueWhenToAsideMenuBeginSticky = calcTriggerPoint(
    '.sidebar',
    '.header'
  );
  const initialStickyMenuHeight = calcInitialMenuHeight();
  const stickyHeaderHeight = calcHeaderHeight();
  const browserWidth = getViewPortWidth();

  // 헤더 인터렉션
  if (stickyHeaderHeight) {
    browserScrollYValue >= stickyHeaderHeight
      ? applyStyleElem(header, stickyElemStyle)
      : applyStyleElem(header, stickyElemStyle, false);
  }

  // menu sticky
  if (valueWhenToMenuBeginSticky) {
    if (isPastTriggerPoint(browserScrollYValue, valueWhenToMenuBeginSticky)) {
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

  // aside menu sticky
  if (valueWhenToAsideMenuBeginSticky) {
    if (
      isPastTriggerPoint(browserScrollYValue, valueWhenToAsideMenuBeginSticky)
    ) {
      if (sideBar) {
        const initialAsideInnerWidth = sideBar?.offsetWidth;
        const initialAsideInnerHeight = sideBar?.offsetHeight;

        if (sideInner) {
          applyStyleElem(sideInner, stickyAsideMenuStyle);
          sideInner.style.width = `${initialAsideInnerWidth}px`;
          sideInner.style.height = `${initialAsideInnerHeight}px`;
        }
      }
    } else {
      if (sideInner && browserWidth >= 360) {
        resetAsideBanner();
      }
    }
  }
};

export { stickyMenu };
