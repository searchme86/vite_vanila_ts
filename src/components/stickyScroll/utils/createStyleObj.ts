import {
  isObjIterable,
  transformNormalObjToIterable,
} from './createIterableObj.js';

type cssStyleObjType = {
  [key in keyof CSSStyleDeclaration]?: string | number;
};

const originalHeaderStyle: cssStyleObjType = {
  position: 'static',
};

const stickyElemStyle: cssStyleObjType = {
  position: 'fixed',
};

const stickyMenuStyle: cssStyleObjType = {
  position: 'fixed',
  top: '0',
  transform: 'translate3d(0px, 60px, 0px)',
};

// 일반 객체(스타일 객체)를 이터러블 객체로 변환
const createIterableObj = (normalObj: cssStyleObjType) => {
  if (!normalObj || typeof normalObj !== 'object') {
    return;
  }
  const isIterable = isObjIterable(normalObj);

  if (!isIterable) {
    let styledIterableObj = transformNormalObjToIterable(normalObj);
    return styledIterableObj;
  }
};

const applyStyleElem = (
  domElem: HTMLElement | null,
  normalStyledObj: cssStyleObjType,
  trigger = true
) => {
  if (domElem && normalStyledObj) {
    const iterableStyledObj = createIterableObj(normalStyledObj);

    if (trigger) {
      if (iterableStyledObj) {
        for (const [key, value] of iterableStyledObj) {
          if (typeof value === 'string') {
            domElem.style[key as number] = value;
          }
        }
      }
    } else {
      if (iterableStyledObj) {
        for (let [key, value] of iterableStyledObj) {
          if (typeof value === 'string') {
            domElem.style[key as number] = '';
          }
        }
      }
    }
  }
};

export {
  applyStyleElem,
  originalHeaderStyle,
  stickyElemStyle,
  stickyMenuStyle,
};
