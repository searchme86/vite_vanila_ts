const queryElement = <T extends HTMLElement>(
  selector: singleClassType
): T | null => {
  return document.querySelector(selector);
};

const queryElementWithDoubleClass = <T extends HTMLElement>(
  selector: doubleClassType
): T | null => {
  return document.querySelector(selector);
};

const queryElements = <T extends HTMLElement>(
  selector: singleClassType
): NodeListOf<T> | null => {
  return document.querySelectorAll(selector);
};
const queryElementsWithDoubleClass = <T extends HTMLElement>(
  selector: doubleClassType
): NodeListOf<T> | null => {
  return document.querySelectorAll(selector);
};

const boxMenu = queryElement<HTMLDivElement>('.box_menu');
const listItems = queryElementsWithDoubleClass<HTMLDivElement>(
  '.list-item_menu .text_menu'
);
const menuContents = queryElements<HTMLDivElement>('.menu_content');
const header = queryElement<HTMLDivElement>('.header');
const boxInner = queryElement<HTMLDivElement>('.box_inner_menu');

export {
  queryElement,
  queryElementWithDoubleClass,
  queryElements,
  queryElementsWithDoubleClass,
  boxMenu,
  listItems,
  menuContents,
  header,
  boxInner,
};
