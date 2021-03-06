#!/usr/bin/env node
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import minimist from "minimist";
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

  const args = minimist(process.argv.slice(2));
  const options = {
    fileList: getFilesSync(args.target || "./"),
    parallelTasks: args.tasks || 2,
    CTA: args.cta || "https://www.google.se",
    delay: args.delay || 0
  };

  if (options.fileList.length === 0) {
    Logger.log(`[File system]: ${Logger.color("No files found!", "red")} Maybe you are not in the right directory?`, "yellow");
    process.exit();
  }

  const seleniumRunner = new SeleniumRunner(options);
  await seleniumRunner.execute();
  process.exit();
});

// CTRL + C hook
process.on("SIGINT", () => {
  Logger.log("\n[PROCESS ENDED]", "red");
  process.exit();
});
