const queryElement = <T extends HTMLElement>(selector: string): T | null => {
  return document.querySelector(selector);
};

const queryElements = <T extends HTMLElement>(
  selector: string
): NodeListOf<T> | null => {
  return document.querySelectorAll(selector);
};

const listMenu = queryElement<HTMLDivElement>('.list_menu');
const listItems = queryElements<HTMLDivElement>('.list-item_menu .text_menu');
const menuContents = queryElements<HTMLDivElement>('.menu_content');
const header = queryElement<HTMLDivElement>('.header');

export { listMenu, listItems, menuContents, header };
