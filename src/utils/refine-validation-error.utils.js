function formatErrorMessage(msg) {
  // Regex to locate the appropriate space for inserting commas in numbers.
  const regex = /(?<!.*ISO \d)\B(?=(\d{3})+(?!\d))/g;

  // Remove quotation marks and insert commas into numbers if found.
  return `${msg.replaceAll('"', '').replace(regex, ',')}.`;
}

export function refineError(error) {
  const err = {};

  error.details.forEach((detail) => {
    // Remove the first element ("body") from the path
    const pathWithoutBody = detail.path.slice(1);

    // Join the path elements without the "body." prefix
    const path = pathWithoutBody.join('.');

    err[path] = formatErrorMessage(detail.message);
  });

  return err;
}
