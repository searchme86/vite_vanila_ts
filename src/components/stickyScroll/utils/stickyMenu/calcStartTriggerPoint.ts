import { getElemOffsetTopValue } from '../calcElemOffsetTop.js';
import { header } from '../variable.js';

const calcThresholdTrigger = () => {
  if (header) {
    const boxMenuOffsetTop = getElemOffsetTopValue('.box_menu');
    if (boxMenuOffsetTop) {
      const headerOffsetHeight = header?.offsetHeight;
      let thresholdDistance = boxMenuOffsetTop - headerOffsetHeight;
      return thresholdDistance;
    }
  }
};

export { calcThresholdTrigger };
