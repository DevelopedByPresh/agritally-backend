export function pigQuery(filter) {
  const {year, month, date,  pen, category } = filter;

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

  if (pen) {
    query.pen = pen;
  }

  if (category) {
    query.category = category;
  }

  return query;
}
