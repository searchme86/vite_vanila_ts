// 보통의 일반객체를 정의
type OrdinaryObjectType = {
  [key: string | number]: unknown;
} & object;

// 객체가 이터레이블한 속성이 있는지 없는지를 체크
const isObjIterable = (obj: unknown) => {
  try {
    return obj != null && typeof (obj as any)[Symbol.iterator] === 'function';
  } catch (e) {
    return false;
  }
};

// 객체의 이터레이블 하지 않는 일반객체를 순회 가능한 이터레이블 객체로 변환
const transformNormalStyleObjToIterable = (
  obj: OrdinaryObjectType
): OrdinaryObjectType & Iterable<[string | number, unknown]> => ({
  [Symbol.iterator]() {
    let startIndex = 0;
    const objKeyArray = Object.keys(obj) as (string | number)[];
    return {
      next() {
        if (startIndex < objKeyArray.length) {
          const transformedObjKey = objKeyArray[startIndex];
          const transformedObjValue = obj[transformedObjKey];
          startIndex++;
          return {
            value: [transformedObjKey, transformedObjValue] as [
              string | number,
              unknown
            ],
            done: false,
          };
        } else {
          return {
            done: true,
            value: undefined,
          };
        }
      },
    };
  },
});

// const iterateIterableObj = <T>(
//   iterableObj: Record<string, unknown> & Iterable<[string, unknown]>,
//   callback: (key: string, value: unknown) => T | void
// ): T | void => {
//   if (!iterableObj || typeof iterableObj !== 'object')
//     throw new Error('Invalid object');
//   if (Object.keys(iterableObj).length === 0) throw new Error('Empty object');

//   if (typeof callback !== 'function')
//     throw new Error('Invalid callback function');

//   try {
//     let result: T | void;
//     if (isObjIterable(iterableObj)) {
//       for (const [key, value] of iterableObj) {
//         result = callback(key, value);
//       }
//     } else {
//       iterableObj = transformNormalStyleObjToIterable(iterableObj) as Record<
//         string,
//         unknown
//       > &
//         Iterable<[string, unknown]>;
//       result = iterableObj;
//     }
//     return;
//   } catch (e) {
//     throw new Error('Invalid object');
//   }
// };

export {
  isObjIterable,
  transformNormalStyleObjToIterable,
  // iterateIterableObj
};
