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
  const what = () => {
    if (boxInner) {
      let boxInnerOffsetHeight = boxInner.offsetHeight;
      boxInner.style.transform = 'translate3d(0px, 0px, 0px)';
      return boxInnerOffsetHeight;
    }
  };

  const calcTresholdTrigger = () => {
    if (header) {
      const boxMenuOffsetTop = calcElemOffsetTopValue('.box_menu');
      if (boxMenuOffsetTop) {
        const headerOffsetHeight = header?.offsetHeight;
        let tresholdDistance = boxMenuOffsetTop - headerOffsetHeight;
        return tresholdDistance;
      }
    }
  };

  const triggerPoint = calcTresholdTrigger();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const whatHeight = what();

    if (scrollY >= 0) {
      applyStyleElem(header, stickyHeaderStyle);
    }

    if (triggerPoint) {
      if (scrollY >= triggerPoint) {
        applyStyleElem(boxInner, stickyMenuStyle);
        if (boxMenu) {
          boxMenu.style.height = `${whatHeight}px`;
        }
      } else {
        applyStyleElem(boxInner, stickyMenuStyle, false);
        if (boxInner) {
          boxInner.style.transform = 'translate3d(0px, 0px, 0px)';
          boxInner.style.position = 'relative';
        }
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

  // 이벤트 등록
  window.addEventListener('scroll', handleScroll);
});
