const { copyFile } = require("fs");
const { join } = require("path");

const releaseNodeFile = join(__dirname, "../build/Release/kiwi.node");
const distDir = join(__dirname, "../kiwi.node");

console.log("ready copy", releaseNodeFile, "to", distDir);

copyFile(releaseNodeFile, distDir, (err) => {
  if (err) {
    console.error("copyFile error", err);
    return;
  }
  console.log("copyFile success");
});
