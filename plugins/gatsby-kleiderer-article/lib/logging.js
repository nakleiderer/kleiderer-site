const { PLUGIN_NAME } = require("./constants")

function warn(message) {
  console.warn(`${PLUGIN_NAME}: ${message}`);
}

module.exports = {
  warn
};