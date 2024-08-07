import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.js';
import testRouter, { testUrl } from './crawler-helper/testRouter.js';
const gitFolder = process.env.gitFolder
const site = process.env.site
const local = process.env.local
const test = process.env.test
const HEADLESS = process.env.HEADLESS
const windowsPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const linuxPath = "/usr/bin/google-chrome"
const siteVar = await import(`./sites/${gitFolder}/${site}.js`)
debugger
const urls = test === 'true' ? testUrl : siteVar.urls
const crawler = new PuppeteerCrawler({
  launchContext: { launchOptions: { executablePath: local ? windowsPath : linuxPath } },
  requestHandler: test === 'true' ? testRouter : router,
  maxConcurrency: 1,
  preNavigationHooks,
  navigationTimeoutSecs: 120, headless: HEADLESS === 'false' ? false : true, requestHandlerTimeoutSecs: 600000

});

crawler.run(urls);