// 클래스명으로 검색한 엘리먼트가 offsetTop을 가지고 있는지를 체크하는 함수입니다.
const checkOffsetTopOrNot = (element: string) => {
  const foundDom = document.querySelector(element) as HTMLElement | null;
  if (foundDom) {
    if (foundDom.offsetTop === 0) {
      return;
    }
    return foundDom;
  }
};

const calcElemOffsetTopValue = (element: string, value = 0) => {
  if (element) {
    const offsetAvailElem = checkOffsetTopOrNot(element);
    if (offsetAvailElem) {
      return offsetAvailElem.offsetTop - value;
    }
  }
};

// 특정 어디 지점에서 offsetTop을 구할 수 있는지 없는지를 체크하는 함수 입니다

export { calcElemOffsetTopValue };
