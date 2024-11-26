import dotenv from "dotenv";
import { createPuppeteerRouter, Dataset } from "crawlee";
import { second, urls } from "./sites/products/collector.js";
const local = process.env.local;
dotenv.config({ silent: true });

const site = process.env.site;
const gitFolder = process.env.gitFolder;
const productsDataset = await Dataset.open(site);

const selectors = urls.find(f => f.brand === site)

export const router = createPuppeteerRouter();

router.addDefaultHandler(async (props) => {

  await resultHandler({ ...props, label: "default" });
});

router.addHandler("second", async (props) => {

  await resultHandler({ ...props, label: "second" });
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
