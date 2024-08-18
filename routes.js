import dotenv from 'dotenv';
import { createPlaywrightRouter, Dataset } from 'crawlee';
import findFile from './src/findFile.js';
import getBaseDomain from './src/getBaseDomain.js';
const local = process.env.local
dotenv.config({ silent: true });

const site = process.env.site
const gitFolder = process.env.gitFolder
const URL_CATEGORIES = process.env.URL_CATEGORIES
const productsDataset = await Dataset.open(gitFolder);
debugger
export const router = createPlaywrightRouter();

router.addDefaultHandler(async (props) => {
  await resultHandler(props)

});

router.addHandler('second', async (props) => {
  await resultHandler(props)

});
router.addHandler('third', async (props) => {
  await resultHandler(props)

});
router.addHandler('fourth', async (props) => {
  await resultHandler(props)

});



async function resultHandler({ request, page, log, pushData, enqueueLinks, addRequests }) {
  const url = await page.url()
  debugger
  console.log(`enqueueing new URLs: fourth`, url);
  if (URL_CATEGORIES) {
    debugger
    const fileName = getBaseDomain(url)
    const handlerUrl = await findFile('site', fileName)
    const siteVar = await import(handlerUrl)
    debugger
    const handler = siteVar.fourth
    const data = await handler({ page, enqueueLinks, request, log, addRequests })
    if (data) {
      await productsDataset.pushData(data);
    }
  }

  else {
    debugger
    const siteVar = await import(`./sites/${gitFolder}/${site}.js`)
    debugger
    const handler = siteVar.fourth
    const data = await handler({ page, enqueueLinks, request, log, addRequests })
    if (data) {
      await productsDataset.pushData(data);
    }
  }


}