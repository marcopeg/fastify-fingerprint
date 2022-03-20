const ACCEPT_HEADERS = [
  "connection",
  "host",
  "user-agent",
  "accept",
  "accept-encoding",
  "accept-language",
];

module.exports = (headers = {}, accept = ACCEPT_HEADERS) =>
  Object.keys(headers)
    .filter((header) => accept.includes(header))
    .map((header) => headers[header]);
