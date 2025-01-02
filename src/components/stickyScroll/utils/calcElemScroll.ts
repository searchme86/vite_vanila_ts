import { getElemOffsetTopValue } from './calcElemOffsetTop.js';
import { queryElement } from './variable.js';
type classNameType = `.${string}`;

const getScrollY = () => {
  return window.scrollY;
};

// targetElem: '.box_menu'
// associatedElem: '.header'
const calcTriggerPoint = (
  targetElem: classNameType,
  associatedElem: classNameType
) => {
  const queriedTargetElem = queryElement(targetElem);
  const queriedAssociatedElem = queryElement(associatedElem);

  if (queriedTargetElem && queriedAssociatedElem) {
    const targetElemOffsetTop = getElemOffsetTopValue(targetElem);
    if (targetElemOffsetTop) {
      const associatedElemOffsetHeight = queriedAssociatedElem.offsetHeight;
      let triggerPoint = targetElemOffsetTop - associatedElemOffsetHeight;
      return triggerPoint;
    }
  }
};

const isPastTriggerPoint = (scrollY: number, triggerPoint: number): boolean => {
  return scrollY >= triggerPoint;
};

const getScrollInfo = () => {
  let prevScrollY = 0;

  return (start: number, end: number) => {
    const scrollY = window.scrollY;
    const isInRange = scrollY >= start && scrollY <= end;
    const scrollDirection = scrollY > prevScrollY ? 'down' : 'up';
    prevScrollY = scrollY;

    return { isInRange, scrollDirection };
  };
};

export { getScrollY, calcTriggerPoint, isPastTriggerPoint, getScrollInfo };
