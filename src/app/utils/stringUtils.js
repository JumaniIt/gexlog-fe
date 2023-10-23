export const containsLiteralPart = (candidate, input) => {
  candidate = candidate.toLowerCase();
  input = input.toLowerCase();

  let candidateIndex = 0;

  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === input[candidateIndex]) {
      candidateIndex++;
    }

    // If we have matched all characters in the candidate, return true
    if (candidateIndex === input.length) {
      return true;
    }
  }

  // If we haven't found a match, return false
  return false;
};

export const trimStringWithDot = (str, num) => {
  // Check if the string length is greater than the specified number
  if (str.length > num) {
    // Trim the string to the specified number of characters and add a dot
    return str.substring(0, num);
  }

  // If the string length is less than or equal to the specified number, return the original string
  return str;
};
