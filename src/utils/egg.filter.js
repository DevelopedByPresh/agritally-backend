export function eggQuery(filter) {
  const { breed, year, month, date } = filter;

  const query = {};

  if (date && month && year) {
    const startDate = new Date(year, month - 1, date);
    const endDate = new Date(year, month - 1, date + 1);
    query.date = { $gte: startDate, $lt: endDate };
  } else if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    query.date = { $gte: startDate, $lte: endDate };
  } else if (year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    query.date = { $gte: startDate, $lte: endDate };
  }

  if (breed) {
    query.breed = breed;
  }

  return query;
}
