import { delay } from "./helpers.js";
import * as path from "path";
import ora from "ora";

import Logger from "./logger.js";
const { Builder, By, until } = require("selenium-webdriver");
const downloadPath = "/Users/Onur/Desktop";

const DEFAULT_TIMEOUT = 5000;

class Selenium {
  constructor() {
    // Browser capabilities
    this.capabilities = {
      browserName: "chrome",
      chromeOptions: {
        prefs: {
          download: { default_directory: downloadPath, directory_upgrade: true, extensions_to_open: "" }
        }
        // args: ["--test-type", "--incognito"]     // Arguments to send chrome.app
        // args: ["--no-startup-window"]     // Arguments to send chrome.app
      }
    };
    // Selenium Driver
    this.driver = new Builder()
      .usingServer()
      .withCapabilities(this.capabilities)
      .build();

    this.spinner = ora("");
  }

  // Functions
  async findElement(_by) {
    return await this.driver.findElement(_by);
  }

  async waitForElement(_by, ms = DEFAULT_TIMEOUT) {
    return await this.driver.wait(until.elementLocated(_by), ms);
  }

  async waitForElementAndGet(_by, ms = DEFAULT_TIMEOUT) {
    await this.waitForElement(_by, ms);
    return await this.findElement(_by);
  }

  async waitForElementAndClick(_by, clickType = "native", ms = DEFAULT_TIMEOUT) {
    const element = await this.waitForElementAndGet(_by, ms);
    return clickType === "native" ? element.click() : this.clickWithScript(element);
  }

  async findElementAndClick(_by, clickType = "native") {
    const element = await this.driver.findElement(_by);
    return clickType === "native" ? element.click() : this.clickWithScript(element);
  }

  clickWithScript(element) {
    return this.driver.executeScript("arguments[0].click();", element);
  }

  quit() {
    // this.spinner.start("");
    // this.spinner.color = "green";
    // this.spinner.succeed(Logger.color("[ADForms]: Upload completed", "green"));
    this.driver.quit();
  }

  getFilePath(file) {
    return path.join(process.cwd(), file);
  }
}

export class AdForms extends Selenium {
  constructor() {
    super();
    this.url = "http://studio.adform.com/browse-templates/";
  }

  async execute(_file) {
    this.spinner.start(
      Logger.color(`[ADForms]: Uploading file: ${_file.substring(_file.lastIndexOf("/") + 1)}`, "cyan")
    );
    try {
      // Browser logic
      this.driver.get(this.url);
      const fileInput = await this.waitForElementAndGet(By.css("input[type=file]"));
      fileInput.sendKeys(this.getFilePath(_file));
      await delay(1000);

      //  Click Category selectbox > Click Display
      this.findElementAndClick(By.xpath("//*[@ng-model='tempAsset.category']"));
      await delay(250);
      this.findElementAndClick(By.xpath("//*[@data-title='Display' and @data-value='format.category']"));
      await delay(200);

      // Click Format selectbox > Click Standard
      this.findElementAndClick(By.xpath("//*[@ng-model='tempAsset.format']"));
      await delay(250);
      this.findElementAndClick(By.xpath("//*[@data-title='Standard' and @data-value='format']"));
      await delay(200);

      // Click Upload
      this.findElementAndClick(
        By.xpath("//*[@ng-controller='BannerFormatSelectController as vm']//button[contains(text(), 'Upload')]")
      );
      // this.findElementAndClick(By.xpath("//*[@ng-controller='BannerFormatSelectController as vm' and .//div[@class='adf-Modal-bottom']]"));
      await delay(1250);

      // Wait until Add clicktag shows up & click
      await this.waitForElementAndClick(By.xpath("//*[@ng-click='addClicktag()']"), "script");
      await delay(200);

      // Get Add clicktag input field
      const clicktagInput = await this.findElement(By.xpath("//*[@ng-model='clickTag.url']"));
      await clicktagInput.sendKeys("https://www.google.se");

      // // Click Save button
      this.findElementAndClick(By.xpath("//*[@ng-click='saveComponentSettings()']"));
      await delay(1750);

      this.findElementAndClick(By.xpath("//*[@ng-click='downloadBanner()' and contains(text(), 'Export')]"), "script");

      this.spinner.succeed(Logger.color(`[ADForms]: Done: ${_file.substring(_file.lastIndexOf("/") + 1)}`, "cyan"));

      await delay(1250);
      /* END */
    } catch (error) {
      Logger.log(`[ADForms]: Error: ${_file.substring(_file.lastIndexOf("/") + 1)}`, "red");
    }
  }
}
