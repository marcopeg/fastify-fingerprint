const cookie = require("cookie");

const ACCEPT_HEADERS = [
  "connection",
  "host",
  "user-agent",
  "accept",
  "accept-encoding",
  "accept-language",
];

module.exports = (
  requestHeaders = {},
  { acceptHeaders = null, extendHeaders = null, acceptCookies = null } = {}
) => {
  const headers = Object.keys(requestHeaders)
    .filter(
      (header) =>
        (acceptHeaders || ACCEPT_HEADERS).includes(header) ||
        (extendHeaders || []).includes(header)
    )
    .reduce(
      (acc, header) => ({ ...acc, [header]: requestHeaders[header] }),
      {}
    );

  const requestCookies = requestHeaders["Cookie"]
    ? cookie.parse(requestHeaders["Cookie"])
    : {};

  const cookies = Object.keys(requestCookies)
    .filter((cookie) => (acceptCookies || []).includes(cookie))
    .reduce(
      (acc, cookie) => ({ ...acc, [cookie]: requestCookies[cookie] }),
      {}
    );

  return {
    headers,
    cookies,
  };
};
