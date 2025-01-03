const getElemPositionType = (element: Element | null) => {
  if (element) {
    const elemPositionType = window.getComputedStyle(element).position;
    return elemPositionType;
  }
};

// 클래스명으로 검색한 엘리먼트로 offsetTop을 구할 수 있는지 없는지를 체크하는 함수
const checkIfElemHasOffsetTopOrNot = (element: singleClassType) => {
  const searchedDom = document.querySelector(element) as HTMLElement | null;

  try {
    if (searchedDom) {
      const domOffsetParent = searchedDom?.offsetParent;

      if (!domOffsetParent || searchedDom.style.position === 'fixed') {
        throw new Error(
          '함수 checkIfElemHasOffsetTopOrNot : searchedDom의 position이 fixed 속성이거나 domOffsetParent이 존재하지 않습니다'
        );
      }

      const domInfo: {
        searchedDom: {
          searchedDomTagName: string | undefined;
          searchedDomOffsetParent: Element | null;
          searchedDomPosition: string | number | undefined;
        };
        offsetParent: {
          offsetParentClassName: string | undefined;
          offsetParentPosition: string | number | undefined;
        };
      } = {
        searchedDom: {
          searchedDomTagName: searchedDom?.tagName.toLowerCase(),
          searchedDomOffsetParent: searchedDom?.offsetParent,
          searchedDomPosition: getElemPositionType(searchedDom),
        },
        offsetParent: {
          offsetParentClassName: domOffsetParent?.className,
          offsetParentPosition: getElemPositionType(domOffsetParent),
        },
      };

      const {
        searchedDom: {
          searchedDomTagName,
          searchedDomOffsetParent,
          searchedDomPosition,
        },
        offsetParent: { offsetParentClassName, offsetParentPosition },
      } = domInfo;

      if (domOffsetParent) {
        return {
          type: 'true',
          offsetValue: searchedDom,
          message: `[정상] : 함수인자로 전달한 엘리먼트, 클래스 ${searchedDomTagName} ${searchedDom}의 position은 ${searchedDomPosition}이며, offsetParent는 ${searchedDomOffsetParent}입니다. offsetParent은 클래스 ${offsetParentClassName}이며, position은 ${offsetParentPosition}입니다`,
        };
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return {
        type: 'false',
        offsetValue: 0,
        message:
          '[에러]: 인자로 전달한 DOMElem의 position이 fixed 속성인지 확인해주세요',
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
