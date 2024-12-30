import {
  isObjIterable,
  transformNormalObjToIterable,
} from './createIterableObj.js';

const originalHeaderStyle = {
  position: 'static',
};

const stickyHeaderStyle = {
  position: 'fixed',
};

const stickyMenuStyle = {
  position: 'fixed',
  top: 0,
  transform: 'translate3d(0px, 60px, 0px)',
  width: '100%',
};

// 일반 객체(스타일 객체)를 이터러블 객체로 변환
const createStyleObj = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  let styleObj;
  const isIterable = isObjIterable(obj);

  if (!isIterable) {
    styleObj = transformNormalObjToIterable(obj);
    return styleObj;
  }
};

const activeStyle = (element, styleObj, trigger = true) => {
  if (element && styleObj) {
    const iterableStyledObj = createStyleObj(styleObj);
    if (trigger) {
      for (const [key, value] of iterableStyledObj) {
        element.style[key] = value;
      }
    } else {
      for (const [key, value] of iterableStyledObj) {
        element.style[key] = '';
      }
    }
  }
};

export { activeStyle, originalHeaderStyle, stickyHeaderStyle, stickyMenuStyle };
