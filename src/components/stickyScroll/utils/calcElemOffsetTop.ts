// 클래스명으로 검색한 엘리먼트로 offsetTop을 구할 수 있는지 없는지를 체크하는 함수
const checkIfElemHasOffsetTopOrNot = (element: singleClassType) => {
  const searchedDom = document.querySelector(element) as HTMLElement | null;

  if (searchedDom) {
    const domOffsetParent = searchedDom.offsetParent;

    const domInfo = {
      tagName: searchedDom?.tagName.toLowerCase(),
      className: searchedDom?.className,
      parentClassName: domOffsetParent?.className,
    };

    if (domOffsetParent) {
      const domPositionStyle =
        window.getComputedStyle(domOffsetParent).position;

      if (
        domOffsetParent === document.body ||
        searchedDom.offsetTop === 0 ||
        domPositionStyle === 'static'
      ) {
        return {
          type: 'false',
          offsetValue: 0,
          message: `[에러] : offsetTop 계산 : 클래스 ${domInfo['className']}, ${domInfo['tagName']} 엘리먼트의 offsetParent의 css position 속성을 체크해보세요`,
        };
      }
      return {
        type: 'true',
        offsetValue: searchedDom,
        message: `[정상] : offsetTop 계산 : 클래스 ${domInfo['className']}, ${domInfo['tagName']} 엘리먼트의 offsetParent는 클래스 .${domInfo['parentClassName']}로, 계산값으로 사용 가능합니다`,
      };
    }
  }
};

// 엘리먼트의 클래스명을 입력하여 해당 돔의 offsetTop을 구하는 함수

const getElemOffsetTopValue = (element: singleClassType) => {
  const domWithOffsetParent = checkIfElemHasOffsetTopOrNot(element);

  if (domWithOffsetParent) {
    const { type, offsetValue, message } = domWithOffsetParent;

    if (type === 'true' && offsetValue instanceof HTMLElement) {
      console.warn(message);
      return offsetValue.offsetTop;
    } else {
      console.warn(message);
      return 0;
    }
  }
};

export { getElemOffsetTopValue };
