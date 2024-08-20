import scrollNTimes from "../../src/scrollNTimes.js";
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const url = await page.url();

  await scrollNTimes(page, 50, 400);
  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".productItem")).map(
      (m) => {
        const title = m.querySelector(".productDescription")?.innerText;
        const price = m.querySelector(".currentPrice .product-price").innerText;
        return {
          title,
          price,
        };
      }
    );

    return result.length > 0
      ? result.map((m) => {
          return { ...m, pageTitle, pageURL, price: "$" + m.price };
        })
      : [];
  });

  debugger;
  return data;
}

const urls = ["https://www.modaselvim.com/buyuk-beden-elbise"];
export { urls };
