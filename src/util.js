//
// Copyright 2020 Wireline, Inc.
//

export const truncateString = (str = '', n = 3) => {
  if (str.length < n * 2 + 3) {
    return str;
  }

  return `${str.substring(0, n)}...${str.substring(str.length - n)}`;
};
