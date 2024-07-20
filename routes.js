import dotenv from 'dotenv';
import { createPuppeteerRouter, Dataset } from 'crawlee';

const local = process.env.local
dotenv.config({ silent: true });

const site = process.env.site
const gitFolder = process.env.gitFolder
const productsDataset = await Dataset.open(gitFolder);
export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, page, request, addRequests }) => {
  const url = await page.url()
  const title = await page.title();
  console.log(`enqueueing new URLs`, url);

  await enqueueLinks({
    selector: '.pagination a',
    label: 'list',
    // limit:local? 1 :0
  });
  const siteVar = await import(`./sites/${site}.js`)

  const handler = siteVar.default

  const data = await handler({ page, enqueueLinks, request, log, addRequests })

  if (data) {
    await productsDataset.pushData(data);
  }

});

router.addHandler('hikaye_ve_kunye', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const title = await page.title();
  const siteVar = await import(`./sites/${site}.js`)

  const handler = siteVar.hikaye_ve_kunye
  await handler({ page, enqueueLinks, request, log, addRequests })




});
router.addHandler('oyuncular', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const title = await page.title();
  const siteVar = await import(`./sites/${site}.js`)
  debugger
  const handler = siteVar.oyuncular
  const data = await handler({ page, enqueueLinks, request, log, addRequests })

  await productsDataset.pushData(data);
  debugger

});


router.addHandler('second', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const title = await page.title();
  const siteVar = await import(`./sites/${site}.js`)
  debugger
  const handler = siteVar.second
  const data = await handler({ page, enqueueLinks, request, log, addRequests })

  await productsDataset.pushData(data);
  debugger

});
