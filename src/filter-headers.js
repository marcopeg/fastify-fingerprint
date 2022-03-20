const ACCEPT_HEADERS = [
  "connection",
  "host",
  "user-agent",
  "accept",
  "accept-encoding",
  "accept-language",
];

module.exports = (headers = {}, accept = null, extend = []) =>
  Object.keys(headers)
    .filter(
      (header) =>
        (accept || ACCEPT_HEADERS).includes(header) || extend.includes(header)
    )
    .map((header) => headers[header]);
