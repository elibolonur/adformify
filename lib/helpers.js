import * as fs from "fs";
import Logger from "./logger.js";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* eslint-disable no-empty-function */
export async function delay(ms = 0, fn = () => {}) {
  await timeout(ms);
  return fn();
}

export function getFilesSync(targetFolder = "./") {
  Logger.log(`[File system]: Reading folder ${Logger.color(`"${targetFolder}"`, "white")} synchronously`, "yellow");
  return fs.readdirSync(targetFolder).map(file => targetFolder + "/" + file);
}
