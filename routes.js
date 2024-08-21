import dotenv from "dotenv";
import { createPlaywrightRouter, Dataset } from "crawlee";
import findFile from "./src/findFile.js";
import getBaseDomain from "./src/getBaseDomain.js";
import getObjectsFromUrls from "./src/getObjectsFromUrls.js";
import normalizeTurkish from "./src/normalizeTurkish.js";
const local = process.env.local;
dotenv.config({ silent: true });

const site = process.env.site;
const gitFolder = process.env.gitFolder;
const URL_CATEGORIES = process.env.URL_CATEGORIES;
const productsDataset = await Dataset.open(gitFolder);
const urls1 =
  URL_CATEGORIES &&
  (await import(`./url-categories/${URL_CATEGORIES}.js`)).default;

debugger;
export const router = createPlaywrightRouter();

router.addDefaultHandler(async (props) => {
  debugger;
  await resultHandler({ ...props, label: "default" });
});

router.addHandler("second", async (props) => {
  debugger;
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
  const filters =
    urls1 &&
    getObjectsFromUrls(urls1).find(
      (f) => getBaseDomain(f.url) === getBaseDomain(url)
    )?.filter;
  debugger;
  console.log(`enqueueing new URLs: ${label}`, url);
  if (URL_CATEGORIES) {
    debugger;
    const fileName = getBaseDomain(url);
    debugger;
    const handlerUrl = await findFile("sites", fileName + ".js");
    debugger;
    const siteVar = await import("./" + handlerUrl);
    debugger;
    const handler = siteVar[label];

    const data = await handler({
      page,
      enqueueLinks,
      request,
      log,
      addRequests,
    });
    if (data) {
      if (filters) {
        debugger;
        const filteredData = data.filter((f) => {
          const result = normalizeTurkish(f.title)
            .split(" ")
            .find((f) => {
              const result = filters
                .map((m) => normalizeTurkish(m))
                .includes(f);
              return result;
            });

          return result;
        });
        await productsDataset.pushData(filteredData);
        debugger;
      } else {
        await productsDataset.pushData(data);
      }
    }
  } else {
    debugger;
    const siteVar = await import(`./sites/${gitFolder}/${site}.js`);
    debugger;
    const handler = siteVar[label];
    const data = await handler({
      page,
      enqueueLinks,
      request,
      log,
      addRequests,
    });
    if (data) {
      if (filters) {
        debugger;
        const filteredData = data.filter((f) =>
          f.title.split(" ").find((f) => filters.includes(f))
        );
        await productsDataset.pushData(filteredData);
      } else {
        await productsDataset.pushData(data);
      }
    }
  }
}
