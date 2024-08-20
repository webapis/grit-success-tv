import autoscroll from "../../src/autoscroll.js";
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: ".paginate a",
    label: "first",
  });
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".showcase")).map(
      (m) => {
        const title = m.querySelector(".showcase-title")?.innerText;
        const price = m.querySelector(".showcase-price-new")?.innerText;
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

const urls = ["https://www.buyukbedenstil.com/kategori/elbise"];
export { urls };
