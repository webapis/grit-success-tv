export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await page.waitForSelector(".product-list-wrapper");
  await page.waitForSelector(".page");
  await enqueueLinks({
    selector: "a.page",
    label: "first",
  });
  debugger;
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".product-item")).map(
      (m) => {
        const title = m.querySelector(
          ".product-item-content__info h3"
        )?.innerText;
        const price = m.querySelector(".price")?.innerText;
        return {
          title,
          price,
        };
      }
    );

    return result.length > 0
      ? result.map((m) => {
          return { ...m, pageTitle, pageURL };
        })
      : [];
  });
  debugger;
  return data;
}

const urls = ["https://www.vakko.com/wedding-c-305"];
export { urls };
