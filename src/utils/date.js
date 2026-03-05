const diffInDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffMs = endDate - startDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
};

module.exports = {
  diffInDays
};