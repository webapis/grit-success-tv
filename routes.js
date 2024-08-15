import dotenv from 'dotenv';
import { createPlaywrightRouter, Dataset } from 'crawlee';

const local = process.env.local
dotenv.config({ silent: true });

const site = process.env.site
const gitFolder = process.env.gitFolder
const productsDataset = await Dataset.open(gitFolder);
debugger
export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, page, request, addRequests }) => {
  const url = await page.url()
  console.log(`enqueueing new URLs: first`, url);

  // await enqueueLinks({
  //   selector: '.pagination a',
  //   label: 'list',
  //   // limit:local? 1 :0
  // });
  const siteVar = await import(`./sites/${gitFolder}/${site}.js`)

  const handler = siteVar.default
debugger
  const data = await handler({ page, enqueueLinks, request, log, addRequests })

  if (data) {
    await productsDataset.pushData(data);
  }

});




router.addHandler('second', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const url = await page.url()
  console.log(`enqueueing new URLs: second`, url);
  const siteVar = await import(`./sites/${gitFolder}/${site}.js`)
  debugger
  const handler = siteVar.second
  const data = await handler({ page, enqueueLinks, request, log, addRequests })
  if (data) {
    await productsDataset.pushData(data);
  }

  debugger

});
router.addHandler('third', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const url = await page.url()
  console.log(`enqueueing new URLs: third`, url);
  const siteVar = await import(`./sites/${gitFolder}/${site}.js`)

  const handler = siteVar.third
  const data = await handler({ page, enqueueLinks, request, log, addRequests })

  if (data) {
    await productsDataset.pushData(data);
  }



});
router.addHandler('fourth', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const url = await page.url()
  console.log(`enqueueing new URLs: fourth`, url);
  const siteVar = await import(`./sites/${gitFolder}/${site}.js`)
  debugger
  const handler = siteVar.fourth
  const data = await handler({ page, enqueueLinks, request, log, addRequests })


  if (data) {
    await productsDataset.pushData(data);
  }


});