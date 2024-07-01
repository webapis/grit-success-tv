import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.js';
const site = process.env.site
const siteVar = await import(`./sites/${site}.js`)
debugger
const urls = siteVar.urls
const crawler = new PuppeteerCrawler({
  launchContext: { launchOptions: { executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" } },
  requestHandler: router,
  maxConcurrency: 1,
  preNavigationHooks

});

crawler.run(urls);