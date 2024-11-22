import dotenv from "dotenv";
import { createPuppeteerRouter, Dataset } from "crawlee";

const local = process.env.local;
dotenv.config({ silent: true });

const site = process.env.site;
const gitFolder = process.env.gitFolder;
const productsDataset = await Dataset.open(gitFolder);



export const router = createPuppeteerRouter();

router.addDefaultHandler(async (props) => {

  await resultHandler({ ...props, label: "default" });
});

router.addHandler("second", async (props) => {

  await resultHandler({ ...props, label: "second" });
});
router.addHandler("third", async (props) => {
  await resultHandler({ ...props, label: "third" });
});
router.addHandler("fourth", async (props) => {
  await resultHandler({ ...props, label: "fourth" });
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
 
 
    const siteVar = await import(`./sites/${gitFolder}/${site}.js`);
 
    const handler = siteVar[label];
    const data = await handler({
      page,
      enqueueLinks,
      request,
      log,
      addRequests,
    });
    if (data) {
        await productsDataset.pushData(data);
    }
  
}
