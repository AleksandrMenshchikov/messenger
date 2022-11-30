function rangeRight(start, end, step) {
  return range(start, end, step, true);
}

function range(start, end, step, isRight) {
  const args = { start, end, step, isRight };
  const isNumber = (elem) => Number.isFinite(elem);
  const toNegative = (n) => (n === 0 ? 0 : -n);
  const rangeNumbers = (start, end, step = 1) => {
    const result = [];
    if (step === 0) {
      if (end >= start) {
        for (let index = start; index < end; index++) {
          result.push(start);
        }
      } else {
        for (let index = start; index > end; index--) {
          result.push(start);
        }
      }
      return result;
    } else {
      if (end >= start) {
        for (let index = start; index < end; index += Math.abs(step)) {
          result.push(index);
        }
      } else {
        for (let index = start; index > end; index -= Math.abs(step)) {
          result.push(index);
        }
      }
    }
    return result;
  };

  let result;

  if (
    !arguments.length ||
    (args.start && !isNumber(args.start)) ||
    (args.end && !isNumber(args.end)) ||
    (args.step && !isNumber(args.step))
  ) {
    return undefined;
  } else if (
    args.start >= 0 &&
    !args.end &&
    !args.step &&
    args.isRight !== true
  ) {
    result = [...Array(args.start).keys()];
  } else if (
    args.start >= 0 &&
    !args.end &&
    !args.step &&
    args.isRight === true
  ) {
    result = [...Array(args.start).keys()].reverse();
  } else if (
    args.start < 0 &&
    !args.end &&
    !args.step &&
    args.isRight !== true
  ) {
    result = [...Array(Math.abs(args.start)).keys()].map(toNegative);
  } else if (
    args.start < 0 &&
    !args.end &&
    !args.step &&
    args.isRight === true
  ) {
    result = [...Array(Math.abs(args.start)).keys()].map(toNegative).reverse();
  } else if (
    isNumber(args.start) &&
    isNumber(args.end) &&
    args.isRight !== true
  ) {
    result = rangeNumbers(args.start, args.end, args.step);
  } else if (
    isNumber(args.start) &&
    isNumber(args.end) &&
    args.isRight === true
  ) {
    result = rangeNumbers(args.start, args.end, args.step).reverse();
  }
  return result;
}
