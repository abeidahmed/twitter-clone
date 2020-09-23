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
  if (typeof word !== 'string') throw new Error('Word is not a string.');
  if (typeof num !== 'number') throw new Error('Number is not a valid number');

  if (num !== 1 && num >= 0) {
    return `${word}s`;
  }
  return word;
}
