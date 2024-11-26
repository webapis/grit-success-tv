import { PuppeteerCrawler } from "crawlee";
import { router } from "./prodRoutesPuppeteer.js";
import preNavigationHooks from "./crawler-helper/preNavigationHooksProd2.js";


import urls from './sites/products/urls.json' assert { type: 'json' };
const gitFolder = process.env.gitFolder;
const site = process.env.site;
const local = process.env.local;
const test = process.env.test;
const HEADLESS = process.env.HEADLESS;

const brandUrls = urls.find(f => f.brand === site)
debugger


const crawler = new PuppeteerCrawler({
  launchContext: { useChrome: local === 'true' ? true : false },
  requestHandler: router,
  maxConcurrency: 1,
  preNavigationHooks,
  navigationTimeoutSecs: 120,
  headless: HEADLESS === "false" ? false : true,
  requestHandlerTimeoutSecs: 600000,
});

crawler.run(brandUrls.urls);

