
import autoscroll from '../../src/autoscroll.js'
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const url = await page.url();


await autoscroll(page,200)
  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".productItem")).map(
      (m) => {
        const title = m
          .querySelector(".productDetails .row a[title]")
          ?.getAttribute("title");
        const price = m.querySelector(".product-price")?.innerText;
        const lastprice = m.querySelector(
          ".LastFiyat.liste-LastFiyat"
        )?.innerText;
        return {
          title,
          price: lastprice || price,
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

const urls = ["https://www.buyukmoda.com/buyuk-beden-elbise-modelleri"];
export { urls };
