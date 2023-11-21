const {
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} = require("fs");
const { join } = require("path");

/**
 * deprecated file
 */

const releaseDir = join(__dirname, "../build/Release");
const jsFilePath = join(__dirname, "../index.js");

const files = readdirSync(releaseDir);
const releaseNativeFileName = files.find((file) => file.endsWith(".node"));
const releaseNativeFilePath = join(releaseDir, releaseNativeFileName);

function copy2root() {
  return copyFileSync(
    releaseNativeFilePath,
    join(__dirname, "../" + releaseNativeFileName)
  );
}

function fixJsFileNativeModuleName() {
  const content = readFileSync(jsFilePath, "utf8");
  const reg = new RegExp(/require\(.(.*?node).\)/, "g");
  const newContent = content.replace(reg, (match, captured) => {
    return match.replace(captured, "./" + releaseNativeFileName);
  });
  return writeFileSync(jsFilePath, newContent, "utf8");
}

console.log("ready copy product");
copy2root();
console.log("copy product is successful");
console.log("ready fix js file");
fixJsFileNativeModuleName();
console.log("fix native module name is successful");
