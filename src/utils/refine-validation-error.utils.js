function formatErrorMessage(msg) {
  // Regex to locate the appropriate space for inserting commas in numbers.
  const regex = /(?<!.*ISO \d)\B(?=(\d{3})+(?!\d))/g;

  // Remove quotation marks and insert comma to number if found.
  return `${msg.replaceAll('"', '').replace(regex, ',')}.`;
}

export function refineError(error) {
  const reducer = (acc, value) => {
    if (acc === '') return acc + value;
    return `${acc}.${value}`;
  };

  const err = {};

  for (let i = 0; i < error.details.length; i += 1) {
    const path = error.details[i].path.reduce(reducer, '');

    err[path] = formatErrorMessage(error.details[i].message);
  }

  return err;
}
