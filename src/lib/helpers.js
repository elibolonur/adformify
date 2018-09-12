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

export function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}

export function getFilesSync(targetFolder = "./") {
  Logger.log(`[File system]: Looking ${Logger.color(`"${targetFolder}"`, "white")} folder synchronously to find Adform zip files`, "yellow");

  if (!dirExists(targetFolder)) {
    Logger.log(`[File system]: Directory ${Logger.color(`"${targetFolder}"`, "white")} does not exist!`, "red");
    return [];
  }

  return fs
    .readdirSync(targetFolder)
    .filter((file) => file.indexOf(".") !== 0 && !file.includes("fullformat") && file.includes("zip"))
    .map((file) => `${targetFolder}/${file}`);
}

export function chunkArray(array, chunkSize) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
}

export const uid = (times = 3, prefix = "") => {
  let uid = prefix;
  for (let i = 0; i < times; i++) {
    uid += s4();
  }
  return uid;
};

// Generator function
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
