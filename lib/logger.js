import chalk from "chalk";

class Logger {
  constructor() {
    this.colorList = [
      "bold",
      "dim",
      "italic",
      "underline",
      "inverse",
      "strikethrough",
      "red",
      "green",
      "yellow",
      "blue",
      "magenta",
      "cyan",
      "white",
      "gray",
      "bgBlack",
      "bgRed",
      "bgGreen",
      "bgYellow",
      "bgBlue",
      "bgMagenta",
      "bgCyan",
      "bgWhite"
    ];
  }

  // Logger class
  log(msg = "", color = "") {
    if (color.length > 0 && !this.colorList.includes(color)) {
      throw new Error("Logger doesn't has this color!");
    }
    if (color.length > 0) {
      console.log(chalk[color](msg));
      return;
    }
    console.log(chalk.white(msg));
  }

  color(msg = "", color = "") {
    if (color.length > 0 && !this.colorList.includes(color)) {
      throw new Error("Logger doesn't has this color!");
    }
    return chalk[color](msg);
  }
}

export default new Logger();
