export function makeRatio(ratio) {
  return ratio
    .split(':')
    .map((el) => +el)
    .reduce((prev, curr) => curr / prev);
}
