"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Logger {
  constructor() {
    this.colorList = ["bold", "dim", "italic", "underline", "inverse", "strikethrough", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "bgBlack", "bgRed", "bgGreen", "bgYellow", "bgBlue", "bgMagenta", "bgCyan", "bgWhite"];
  }

  // Logger class
  log(msg = "", color = "") {
    if (color.length > 0 && !this.colorList.includes(color)) {
      throw new Error("Logger doesn't has this color!");
    }
    if (color.length > 0) {
      console.log(_chalk2.default[color](msg));
      return;
    }
    console.log(_chalk2.default.white(msg));
  }

  color(msg = "", color = "") {
    if (color.length > 0 && !this.colorList.includes(color)) {
      throw new Error("Logger doesn't has this color!");
    }
    return _chalk2.default[color](msg);
  }
}

exports.default = new Logger();