export default (num, digits) => {
  const si = [{
    value: 1E18,
    symbol: 'E',
  }, {
    value: 1E15,
    symbol: 'P',
  }, {
    value: 1E12,
    symbol: 'T',
  }, {
    value: 1E9,
    symbol: 'B',
  }, {
    value: 1E6,
    symbol: 'M',
    factor: 1000000,
  }, {
    value: 1E3,
    symbol: 'K',
    factor: 1000,
  }];

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits) + si[i].symbol;
    }
  }

  return num;
};
