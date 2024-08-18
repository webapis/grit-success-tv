import { PlaywrightCrawler } from "crawlee";
import { router } from "./routes.js";
import preNavigationHooks from "./crawler-helper/preNavigationHooks.js";
import testRouter, { testUrl } from "./crawler-helper/testRouter.js";
const gitFolder = process.env.gitFolder;
const site = process.env.site;
const local = process.env.local;
const test = process.env.test;
const HEADLESS = process.env.HEADLESS;
const URL_CATEGORIES = process.env.URL_CATEGORIES
const siteVar = await import(`./sites/${gitFolder}/${site}.js`);

const urls1 = URL_CATEGORIES && (await import(`./url-categories/${URL_CATEGORIES}.js`)).default

debugger;
const urls = test === "true" ? testUrl : (urls1 ? urls1 : siteVar.urls);
debugger
const crawler = new PlaywrightCrawler({

  requestHandler: test === "true" ? testRouter : router,
  maxConcurrency: 1,
  preNavigationHooks,
  navigationTimeoutSecs: 120,
  headless: HEADLESS === "false" ? false : true,
  requestHandlerTimeoutSecs: 600000,
});

crawler.run(urls);
