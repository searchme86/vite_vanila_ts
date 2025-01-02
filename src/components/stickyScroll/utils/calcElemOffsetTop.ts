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
        return { type: 'false', offsetValue: 0 };
      }
      return { type: 'true', offsetValue: searchedDom };
    }
  }
};

// 엘리먼트의 클래스명을 입력하여 해당 돔의 offsetTop을 구하는 함수

const calcElemOffsetTopValue = (element: string, value = 0) => {
  const something = checkIfElemHasOffsetTopOrNot(element);
  if (something) {
    const { type, offsetValue } = something;

    if (type === 'true' && offsetValue instanceof HTMLElement) {
      return offsetValue.offsetTop - value;
    } else {
      return 0;
    }
  }
};

// 특정 어디 지점에서 offsetTop을 구할 수 있는지 없는지를 체크하는 함수 입니다

export { calcElemOffsetTopValue };
