
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: "[data-testid='listing-pagination'] a",
    label: "first",
  });
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(
      document.querySelectorAll('[data-testid="listing-product"]')
    ).map((m) => {
      const title = m.querySelector(
        '[data-testid="listing-product-name"]'
      )?.innerText;
      const price = m.querySelector(
        '[data-testid="listing-product-price"]'
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

  debugger;
  return data;
}

const urls = ["https://www.modanisa.com/buyuk-beden-elbiseler.htm"];
export { urls };
