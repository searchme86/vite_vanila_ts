const isObjIterable = (obj) => {
  try {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
  } catch (e) {
    return false;
  }
};

// 객체의 종류가 일반객체 일 경우 순회 가능한 이터러블 객체로 변환
const transformNormalObjToIterable = (obj) => ({
  [Symbol.iterator]() {
    let startIndex = 0;
    const objKeyArray = Object.keys(obj);
    return {
      next() {
        if (startIndex < objKeyArray.length) {
          const transformedObjKey = objKeyArray[startIndex];
          const transformedObjValue = obj[transformedObjKey];
          startIndex++;
          return {
            value: [transformedObjKey, transformedObjValue],
            done: false,
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  },
});

// 이터러블 객체를 순회하는데
// 이터러블 객체의 각 요소를 callback 함수의 인자로 전달
// 객체의 length를 체크
// 객체가 이터러블 객체인지 체크
// callback을 받아 for...of문을 사용하여 객체를 순회
const iterateIterableObj = (iterableObj, callback) => {
  if (!iterableObj || typeof iterableObj !== 'object')
    throw new Error('Invalid object');
  if (iterableObj.length === 0) throw new Error('Empty object');

  try {
    let result;
    if (isObjIterable(iterableObj)) {
      for (const [key, value] of iterableObj) {
        result = callback(key, value);
      }
    } else {
      iterableObj = transformNormalObjToIterable(iterableObj);
    }
  } catch (e) {}
};

export { isObjIterable, transformNormalObjToIterable, iterateIterableObj };
