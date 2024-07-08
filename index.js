import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.js';
import testRouter, { testUrl } from './crawler-helper/testRouter.js';

const site = process.env.site
const local = process.env.local
const test = process.env.test
const windowsPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const linuxPath = "/usr/bin/google-chrome"
const siteVar = await import(`./sites/${site}.js`)

const urls = test==='true' ? testUrl: siteVar.urls
const crawler = new PuppeteerCrawler({
  launchContext: { launchOptions: { executablePath: local ? windowsPath : linuxPath } },
  requestHandler: test==='true'? testRouter: router,
  maxConcurrency: 1,
//  preNavigationHooks,
  navigationTimeoutSecs:120, headless:true,requestHandlerTimeoutSecs:600000

});

crawler.run(urls);