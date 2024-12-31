// 보통의 일반객체를 정의
type OrdinaryObjType = {
  [key: string | number]: unknown;
} & object;

type IterableObjType = OrdinaryObjType & Iterable<[string | number, unknown]>;

// 객체가 이터레이블한 속성이 있는지 없는지를 체크
const isObjIterable = (obj: unknown) => {
  try {
    return (
      obj != null &&
      typeof (obj as Iterable<unknown>)[Symbol.iterator] === 'function'
    );
  } catch (e) {
    return false;
  }
};

// 객체의 이터레이블 하지 않는 일반객체를 순회 가능한 이터레이블 객체로 변환
const transformNormalObjToIterable = (
  obj: OrdinaryObjType
): IterableObjType => ({
  [Symbol.iterator]() {
    let startIndex = 0;
    const objKeyArray = Object.keys(obj) as (string | number)[];
    return {
      next() {
        if (startIndex < objKeyArray.length) {
          const extractedObjKey = objKeyArray[startIndex];
          const extractedObjValue = obj[extractedObjKey];
          startIndex++;
          return {
            value: [extractedObjKey, extractedObjValue] as [
              string | number,
              unknown
            ],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
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
//       iterableObj = transformNormalObjToIterable(iterableObj) as Record<
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
  transformNormalObjToIterable,
  // iterateIterableObj
};
