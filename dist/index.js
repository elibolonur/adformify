#!/usr/bin/env node
"use strict";

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

var _logger = require("./lib/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _helpers = require("./lib/helpers");

var _selenium = require("./lib/selenium");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = (0, _express2.default)().use(_bodyParser2.default.json()).use((0, _morgan2.default)("dev")).set("json spaces", 2);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

// AppStart
const server = app.listen(3000, _asyncToGenerator(function* () {
  _logger2.default.log(`[app] Running at port: ${server.address().port}`, "green");

  const args = (0, _minimist2.default)(process.argv.slice(2));
  const options = {
    fileList: (0, _helpers.getFilesSync)(args.target || "./"),
    parallelTasks: args.tasks || 2,
    CTA: args.cta || "https://www.google.se",
    delay: args.delay || 0
  };

  if (options.fileList.length === 0) {
    _logger2.default.log(`[File system]: ${_logger2.default.color("No files found!", "red")} Maybe you are not in the right directory?`, "yellow");
    process.exit();
  }

  const seleniumRunner = new _selenium.SeleniumRunner(options);
  yield seleniumRunner.execute();
  process.exit();
}));

// CTRL + C hook
process.on("SIGINT", () => {
  _logger2.default.log("\n[PROCESS ENDED]", "red");
  process.exit();
});