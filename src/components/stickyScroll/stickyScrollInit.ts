import {
  boxMenu,
  listItems,
  menuContents,
  header,
  boxInner,
} from './utils/variable.js';
import { calcElemOffsetTopValue } from './utils/calcElemOffsetTop.js';

import {
  applyStyleElem,
  stickyMenuStyle,
  stickyHeaderStyle,
  originalHeaderStyle,
} from './utils/createStyleObj.js';

document.addEventListener('DOMContentLoaded', () => {
  const initiateStickyMenu = () => {
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

  const calcThresholdTrigger = () => {
    if (header) {
      const boxMenuOffsetTop = calcElemOffsetTopValue('.box_menu');
      if (boxMenuOffsetTop) {
        const headerOffsetHeight = header?.offsetHeight;
        let thresholdDistance = boxMenuOffsetTop - headerOffsetHeight;
        return thresholdDistance;
      }
    }
  };

  const triggerPoint = calcThresholdTrigger();

  const handleScroll = () => {
    const scrollY = window.scrollY;
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
        initiateStickyMenu();
      }
    }

    // 스크롤 스파이 기능
    if (menuContents) {
      menuContents.forEach((content, index) => {
        const contentTop = content.offsetTop;
        const contentHeight = content.offsetHeight;

        if (
          scrollY >= contentTop - 50 &&
          scrollY < contentTop + contentHeight - 50
        ) {
          if (listItems) {
            listItems.forEach((item) => {
              item.style.textDecoration = 'none';
            });
            listItems[index].style.textDecoration = 'underline';
          }
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
});
