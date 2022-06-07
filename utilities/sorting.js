const compare = (key, order = 'asc') => {
  console.log(key, order, a, b)
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = (a,b) => a.createdAt - b.createdAt;

    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

module.exports = { compare };
