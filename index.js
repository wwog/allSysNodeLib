const os = require("os");

let nodeApi;

switch (os.platform()) {
  case "win32":
    nodeApi = require(`./release/kiwi_win_64.node`);
    break;
  case "darwin":
    switch (os.arch()) {
      case "arm64":
        nodeApi = require(`./release/kiwi_mac_arm64.node`);
        break;
      case "x64":
      default:
        nodeApi = require(`./release/kiwi_mac_x64.node`);
        break;
    }

    break;
  default:
    throw new Error(`not support platform ${os.platform()} ${os.arch()}`);
}

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

/**
 * @returns {string}
 */
function getOriginalKey() {
  return nodeApi.getOriginalKey();
}

/**
 * @typedef getEncrytedKeyResult
 * @property {string} param
 * @property {string} key
 */
/**
 * @returns {getEncrytedKeyResult}
 */
function getEncrytedKey() {
  return nodeApi.getEncrytedKey();
}

module.exports = {
  initial,
  serverToLocal,
  getOriginalKey,
  getEncrytedKey,
};
