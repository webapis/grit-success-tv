import autoscroll from "../../src/autoscroll.js";
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await autoscroll(page, 200);
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".productItem")).map(
      (m) => {
        const title = m.querySelector(".productDescription").innerText;
        const price = m.querySelector(
          ".currentPrice.discoF.simge-tl.yukseklikL"
        ).innerText;
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

const urls = ["https://www.modamerve.com/buyuk-beden-elbise"];
export { urls };
