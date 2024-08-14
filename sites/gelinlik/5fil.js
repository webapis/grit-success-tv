export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: ".paginate-content a",
    label: "first",
  });

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(
      document.querySelectorAll(".product-grid-item")
    ).map((m) => {
      const title = m.querySelector(".wd-entities-title a")?.innerText;
      const price = m.querySelector(
        ".woocommerce-Price-amount.amount"
      )?.innerText;
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

  return data;
}

const urls = ["https://5fil.com/kategori/kadin/gelinlik/"];
export { urls };
