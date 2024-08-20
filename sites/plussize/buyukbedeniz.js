export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const url = await page.url();
  const productCount = await page.evaluate(() =>
    parseInt(
      document
        .querySelector(".pagination-info-bar")
        ?.innerText.replace(/[^\d]/gi, "")
    )
  );

  const totalPages = Math.ceil(productCount / 8);

  if (productCount) {
    await addRequests([{ url: `${url}?ps=${totalPages}`, label: "second" }]);
  }

  //pagination
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
    const result = Array.from(document.querySelectorAll(".product-item")).map(
      (m) => {
        const title = m.querySelector(".product-title")?.innerText;
        const price = m.querySelector(".product-price")?.innerText;
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

  return data;
}

const urls = [
  "https://www.buyukbedeniz.com/buyuk-beden-kadin-elbise-modelleri",
];
export { urls };
