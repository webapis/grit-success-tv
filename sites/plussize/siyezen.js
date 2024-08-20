import autoscroll from "../../src/autoscroll.js";
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const url = await page.url();

  await autoscroll(page, 200);
  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".ItemOrj")).map(
      (m) => {
        const title = m.querySelector(".productName a")?.innerText;
        const price = m.querySelector(".enSagFiyatFor")?.innerText;
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

const urls = ["https://www.siyezen.com/buyuk-beden-elbise"];
export { urls };
