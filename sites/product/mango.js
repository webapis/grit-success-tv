import autoScroll from "../../src/autoscroll.js";

export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await autoScroll(page, 200);

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(
      document.querySelectorAll('div[class^="ProductCard_"]')
    ).map((m) => {
      const title = m.querySelector('[class^="ProductTitle_"]')?.innerText;
      const price = m.querySelector('span[class^="texts_bodyM"]')?.innerText;
      return {
        title,
        price,
      };
    });

    return result.length > 0
      ? result.map((m) => {
          return { ...m, pageTitle, pageURL };
        })
      : [];
  });

  debugger;
  return data;
}

const urls = [
  "https://shop.mango.com/tr/tr/c/kadin/elbise-ve-tulum/buyuk-beden_d016b2c2",
];

export { urls };
