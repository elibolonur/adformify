import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import Logger from "./lib/logger.js";

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

const server = app.listen(3000, () => {
  Logger.log(`App is running at port: ${server.address().port}`, "green");
});

// CTRL + C hook
process.on("SIGINT", () => {
  Logger.log("\n[PROCESS ENDED]", "red");
  process.exit();
});
