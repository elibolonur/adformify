import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import Logger from "./lib/logger.js";
import { getFilesSync } from "./lib/helpers";
import { SeleniumRunner } from "./lib/selenium";

const app = express()
  .use(bodyParser.json())
  .use(morgan("dev"))
  .set("json spaces", 2);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

// AppStart
const server = app.listen(3000, async() => {
  Logger.log(`[app] Running at port: ${server.address().port}`, "green");

  const options = {
    fileList: getFilesSync("./files"),
    parallelTasks: 2,
    CTA: "https://www.google.se"
  };

  const seleniumRunner = new SeleniumRunner(options);
  seleniumRunner.execute();
});

// CTRL + C hook
process.on("SIGINT", () => {
  Logger.log("\n[PROCESS ENDED]", "red");
  process.exit();
});
