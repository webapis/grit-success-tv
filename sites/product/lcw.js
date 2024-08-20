export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  //   const result = await enqueueLinks({
  //     selector: ".lcw-site-map-category a",
  //     label: "first",
  //   });
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
export async function second({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".product-card")).map(
      (m) => {
        const title = m.querySelector(".product-card__title")?.innerText;
        const price = m.querySelector(".product-price__price")?.innerText;

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
const urls = [
  // "https://www.lcw.com/site-haritasi",
  "https://www.lcw.com/elbise-t-149?koleksiyon=buyuk-beden",
];
export { urls };
