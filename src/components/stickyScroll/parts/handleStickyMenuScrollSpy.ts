import { listItems, menuContents } from '../utils/variable.js';

const stickyMenuScrollSpy = () => {
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

export { stickyMenuScrollSpy };
