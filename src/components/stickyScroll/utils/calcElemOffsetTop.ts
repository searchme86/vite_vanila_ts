// 클래스명으로 검색한 엘리먼트로 offsetTop을 구할 수 있는지 없는지를 체크하는 함수
const checkIfElemHasOffsetTopOrNot = (element: string) => {
  const searchedDom = document.querySelector(element) as HTMLElement | null;

  if (searchedDom) {
    const domOffsetParent = searchedDom.offsetParent;

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
          message: '해당 돔의 offsetParent의 css position을 체크해보세요',
        };
      }
      return {
        type: 'true',
        offsetValue: searchedDom,
        message: '해당 돔의 offsetParent는 사용 가능합니다',
      };
    }
  }
};

// 엘리먼트의 클래스명을 입력하여 해당 돔의 offsetTop을 구하는 함수

const getElemOffsetTopValue = (element: string) => {
  const something = checkIfElemHasOffsetTopOrNot(element);
  if (something) {
    const { type, offsetValue, message } = something;

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
