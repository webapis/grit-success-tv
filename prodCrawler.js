import { PlaywrightCrawler } from "crawlee";
import { router } from "./prodRoutes.js";
import preNavigationHooks from "./crawler-helper/preNavigationHooks.js";
import testRouter, { testUrl } from "./crawler-helper/testRouter.js";
import convertUrlsToStrings from "./src/convertUrlsToStrings.js";
const gitFolder = process.env.gitFolder;
const site = process.env.site;
const local = process.env.local;
const test = process.env.test;
const HEADLESS = process.env.HEADLESS;

const urls = convertUrlsToStrings(
        (await import(`./sites/${gitFolder}/${site}.js`)).urls
      );
debugger;
const crawler = new PlaywrightCrawler({
  requestHandler: test === "true" ? testRouter : router,
  maxConcurrency: 1,
  preNavigationHooks,
  navigationTimeoutSecs: 120,
  headless: HEADLESS === "false" ? false : true,
  requestHandlerTimeoutSecs: 600000,
});

crawler.run(urls);

