const nodeApi = require("./build/Release/kiwi.node");

/**
 *
 * @param {string} apiKey
 */
function initial(apiKey) {
  if (typeof apiKey !== "string") {
    throw new Error("invaild apiKey", apiKey);
  }
  return nodeApi.initial(apiKey);
}

/**
 * @typedef ServerToLocalOption
 * @property {string} name
 * @property {string} ip
 * @property {string} port
 */

/**
 * @param {ServerToLocalOption} option
 * @returns
 */
function serverToLocal(option) {
  const { ip, name, port } = option;
  if (
    typeof ip !== "string" ||
    typeof name !== "string" ||
    typeof port !== "string"
  ) {
    throw new Error("invaild option", option);
  }
  return nodeApi.serverToLocal(name, ip, port);
}

module.exports = {
  initial,
  serverToLocal,
};
