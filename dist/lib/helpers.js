"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uid = exports.delay = undefined;

/* eslint-disable no-empty-function */
let delay = exports.delay = (() => {
  var _ref = _asyncToGenerator(function* (ms = 0, fn = function () {}) {
    yield timeout(ms);
    return fn();
  });

  return function delay() {
    return _ref.apply(this, arguments);
  };
})();

exports.dirExists = dirExists;
exports.getFilesSync = getFilesSync;
exports.chunkArray = chunkArray;

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _logger = require("./logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}

function getFilesSync(targetFolder = "./") {
  _logger2.default.log(`[File system]: Looking ${_logger2.default.color(`"${targetFolder}"`, "white")} folder synchronously to find Adform zip files`, "yellow");

  if (!dirExists(targetFolder)) {
    _logger2.default.log(`[File system]: Directory ${_logger2.default.color(`"${targetFolder}"`, "white")} does not exist!`, "red");
    return [];
  }

  return fs.readdirSync(targetFolder).filter(file => file.indexOf(".") !== 0 && file.includes("zip")).map(file => `${targetFolder}/${file}`);
}

function chunkArray(array, chunkSize) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
}

const uid = exports.uid = (times = 3, prefix = "") => {
  let uid = prefix;
  for (let i = 0; i < times; i++) {
    uid += s4();
  }
  return uid;
};

// Generator function
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}