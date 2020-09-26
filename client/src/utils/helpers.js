export function fieldValidation(errors, errorType) {
  if (errors) {
    for (let error of errors) {
      if (error.toLowerCase().startsWith(errorType.toLowerCase())) {
        return error;
      }
    }
  }
}

export function pluralize(num, word) {
  if (typeof word !== 'string') throw new Error(`${word} should be a string.`);
  if (typeof num !== 'number') throw new Error(`${word} should be a number.`);

  if (num !== 1 && num >= 0) {
    return `${word}s`;
  }
  return word;
}

export function normalizeLink(link) {
  if (typeof link !== 'string') throw new Error(`${link} should be a string.`);

  return link.replace(/^https?:\/\//, '');
}
