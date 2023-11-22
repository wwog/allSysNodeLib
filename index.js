const nodeApi = require("./build/Release/kiwi-game-shield.node");

/**
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
 * @typedef serverToLocalResult
 * @property {string} ip
 * @property {string} port
 * @property {string} code  , If code is 0, it is successful
 */
/**
 * @param {ServerToLocalOption} option
 * @returns {serverToLocalResult}
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
