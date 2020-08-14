export default (data) => {
  const parsed = data.map((item) => {
    const newItem = {};
    Object.keys(item).forEach((attribute) => {
      const attributeObj = item[attribute];
      const attributeValue = Object.values(attributeObj)[0];
      newItem[attribute] = attributeValue;
    });
    return newItem;
  });
  return parsed;
};
