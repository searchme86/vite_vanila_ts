import {
  isObjIterable,
  transformNormalStyleObjToIterable,
} from './createIterableObj.js';

type styleObjType = {
  [key in keyof CSSStyleDeclaration]?: string | number;
};

const originalHeaderStyle: styleObjType = {
  position: 'static',
};

const stickyHeaderStyle: styleObjType = {
  position: 'fixed',
};

const stickyMenuStyle: styleObjType = {
  position: 'fixed',
  top: 0,
  transform: 'translate3d(0px, 60px, 0px)',
  width: '100%',
};

// 일반 객체(스타일 객체)를 이터러블 객체로 변환
const createStyleObj = (obj: styleObjType) => {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  const isIterable = isObjIterable(obj);

  if (!isIterable) {
    let styleObj = transformNormalStyleObjToIterable(obj);
    return styleObj;
  }
};

const activeStyle = (
  element: HTMLElement | null,
  styleObj: styleObjType,
  trigger = true
) => {
  if (element && styleObj) {
    const iterableStyledObj = createStyleObj(styleObj);
    if (trigger && iterableStyledObj) {
      for (const [key, value] of iterableStyledObj) {
        if (typeof key === 'number' && typeof value === 'string') {
          element.style[key] = value;
        }
      }
    } else if (iterableStyledObj) {
      for (const [key, value] of iterableStyledObj) {
        if (iterableStyledObj) {
          if (typeof key === 'number' && typeof value === 'string') {
            element.style[key] = '';
          }
        }
      }
    }
  }
};

export { activeStyle, originalHeaderStyle, stickyHeaderStyle, stickyMenuStyle };
