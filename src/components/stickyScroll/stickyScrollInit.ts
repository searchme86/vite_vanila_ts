import { listMenu, listItems, menuContents, header } from './utils/variable.js';
import { calcElemOffsetTopValue } from './utils/calcElemOffsetTop.js';
import {
  activeStyle,
  stickyMenuStyle,
  stickyHeaderStyle,
  originalHeaderStyle,
} from './utils/createStyleObj.js';

document.addEventListener('DOMContentLoaded', () => {
  const listMenuOffsetTop = calcElemOffsetTopValue('.list_menu', 60);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 0) {
      activeStyle(header, stickyHeaderStyle);
    }

    scrollY >= listMenuOffsetTop
      ? activeStyle(listMenu, stickyMenuStyle)
      : activeStyle(listMenu, stickyMenuStyle, false);

    // 스크롤 스파이 기능
    menuContents.forEach((content, index) => {
      const contentTop = content.offsetTop;
      const contentHeight = content.offsetHeight;

      if (
        scrollY >= contentTop - 50 &&
        scrollY < contentTop + contentHeight - 50
      ) {
        listItems.forEach((item) => {
          item.style.textDecoration = 'none';
        });
        listItems[index].style.textDecoration = 'underline';
      }
    });
  };

  // 이벤트 등록
  window.addEventListener('scroll', handleScroll);
});
