import dotenv from "dotenv";
import { createPuppeteerRouter, Dataset } from "crawlee";
import first, { second, urls } from "./sites/products/collector.js";
const local = process.env.local;
dotenv.config({ silent: true });

const site = process.env.site;
const gitFolder = process.env.gitFolder;

const productsDataset = await Dataset.open(site);

const selectors = urls.find(f => f.brand === site)

export const router = createPuppeteerRouter();

router.addDefaultHandler(async (props) => {
  debugger

  const data = await first({ ...props, label: "default", ...selectors })
  debugger
  if (data) {
    await productsDataset.pushData(data);
  }
});

router.addHandler("second", async (props) => {

  const data = await second({ ...props, label: "second", ...selectors })
  debugger
  if (data) {
    await productsDataset.pushData(data);
  }
});

async function resultHandler({
  request,
  page,
  log,
  pushData,
  enqueueLinks,
  addRequests,
  label,
}) {
  const url = await page.url();

  debugger
  console.log(`enqueueing new URLs: ${label}`, url);



  const data = await second({
    page,
    enqueueLinks,
    request,
    log,
    addRequests,
    ...selectors
  });
  if (data) {
    await productsDataset.pushData(data);
  }

}
