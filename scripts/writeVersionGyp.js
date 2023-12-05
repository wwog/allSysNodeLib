const fs = require("fs");
const packageJson = require("../package.json");
const { resolve } = require("path");

const writePath = resolve(__dirname, "../version.gyp");

const version = packageJson.version.replace(/\./g, "_");

const content = `{
  "variables": {
    "version": "${version}"
  }
}`;

fs.writeFileSync(writePath, content);
