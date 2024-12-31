const queryElement = <T extends HTMLElement>(selector: string): T | null => {
  return document.querySelector(selector);
};

const queryElements = <T extends HTMLElement>(
  selector: string
): NodeListOf<T> | null => {
  return document.querySelectorAll(selector);
};

const boxMenu = queryElement<HTMLDivElement>('.box_menu');
const listItems = queryElements<HTMLDivElement>('.list-item_menu .text_menu');
const menuContents = queryElements<HTMLDivElement>('.menu_content');
const header = queryElement<HTMLDivElement>('.header');
const boxInner = queryElement<HTMLDivElement>('.box_inner_menu');

export { boxMenu, listItems, menuContents, header, boxInner };
