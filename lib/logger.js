import chalk from "chalk";

class Logger {
  log(msg = "", color = "") {
    if (color.length > 0 && !colorList.includes(color)) {
      throw new Error("Logger doesn't has this color!");
    }
    if (color.length > 0) {
      console.log(chalk[color](msg));
      return;
    }
    console.log(chalk.white(msg));
  }
}

const colorList = [
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

export default new Logger();
