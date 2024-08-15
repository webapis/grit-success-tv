export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: "a.page-numbers",
    label: "first",
  });

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(
      document.querySelectorAll(".product-warp-item")
    ).map((m) => {
      const title = m.querySelector(
        ".woocommerce-loop-product__title"
      ).innerText;
      const price = Array.from(
        m.querySelectorAll(".price .woocommerce-Price-amount.amount")
      ).reverse()[0].textContent;

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

const urls = ["https://www.rosegelinlik.com/urunlerimiz/"];
export { urls };
