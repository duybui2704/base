export const mock = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push({
      id: `${i}`,
      text: 'Bui xuan Duy' + `${i}`,
      value: 'xxxxxxx',
    });
  }
  return arr;
};
