import dotenv from 'dotenv';
import { createPuppeteerRouter, Dataset } from 'crawlee';

dotenv.config({ silent: true });

const site = process.env.site

const productsDataset = await Dataset.open('tvseries');
export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, page, request, addRequests }) => {
  const url = await page.url()
  const title = await page.title();
  console.log(`enqueueing new URLs`, url);

  await enqueueLinks({
    selector: '.pagination a',
    label: 'list',
  });
  const siteVar = await import(`./sites/${site}.js`)

  const handler = siteVar.default

  const data = await handler({ page, enqueueLinks, request, log, addRequests })


  await productsDataset.pushData(data);


});


router.addHandler('detail', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
  const title = await page.title();
  const siteVar = await import(`./sites/${site}.js`)
  debugger
  const handler = siteVar.detail
  const data = await handler({ page, enqueueLinks, request, log, addRequests })
  debugger
});

