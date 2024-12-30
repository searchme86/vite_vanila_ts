//offsetTop을 구할 수 있는지 없는지를 체크하는 함수 입니다
// 클래스명을 입력합니다
//element가 없거나 offsetTop이 0이면 return 합니다
//element는 클래스명을 입력합니다
const checkOffsetTopOrNot = (element) => {
  const foundDom = document.querySelector(element);
  if (foundDom === null || foundDom.offsetTop === 0) {
    return;
  }
  return foundDom;
};

const calcElemOffsetTopValue = (element, value = 0) => {
  if (element) {
    const something = checkOffsetTopOrNot(element);
    return something.offsetTop - value;
  }
};

// 특정 어디 지점에서 offsetTop을 구할 수 있는지 없는지를 체크하는 함수 입니다

export { calcElemOffsetTopValue };
