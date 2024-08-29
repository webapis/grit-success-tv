import autoScroll from "../../src/autoscroll.js";

export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const url = await page.url();
  //   const result = await enqueueLinks({
  //     selector: ".lcw-site-map-category a",
  //     label: "first",
  //   });
  await autoScroll(page, 150)
  const productCount = await page.evaluate(() =>
    parseInt(
      document
        .querySelector(".product-list-heading__product-count")
        ?.innerText.replace(/[^\d]/gi, "")
    )
  );

  const totalPages = Math.ceil(productCount / 96);

  if (productCount > 0 && totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      await addRequests([{ url: `${url}?sayfa=${i}`, label: "second" }]);
    }
  }
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".product-card")).map(
      (m) => {
        const title = m.querySelector(".product-card__title")?.innerText;
        const price = m.querySelector(".product-price__price")?.innerText;
        const img =m.querySelector(".product-image__image")?.src
        const link =m.querySelector("[data-optionid]").href

        return {
          title,
          price,
            img,
            link
        };
      }
    );

    return result.length > 0
      ? result.map((m) => {
        return { ...m, pageTitle, pageURL };
      }).filter(f=>f.img)
      : [];
  });

  debugger;
  return data;
}
export async function second({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {

  await autoScroll(page, 150)
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".product-card")).map(
      (m) => {
        const title = m.querySelector(".product-card__title")?.innerText;
        const price = m.querySelector(".product-price__price")?.innerText;
        const img =m.querySelector(".product-image__image")?.src
        const link =m.querySelector("[data-optionid]").href

        return {
          title,
          price,
            img,
            link
        };
      }
    );

    return result.length > 0
      ? result.map((m) => {
        return { ...m, pageTitle, pageURL };
      }).filter(f=>f.img)
      : [];
  });

  debugger;
  return data;
}
const urls = [
  // "https://www.lcw.com/site-haritasi",

  "https://www.lcw.com/kadin-kazak-t-202",
];
export { urls };
