const crypto = require("crypto");

module.exports = (data) =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(data || null))
    .digest("hex");
