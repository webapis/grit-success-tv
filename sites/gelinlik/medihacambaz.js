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
    const result = Array.from(document.querySelectorAll(".ProductItem")).map(
      (m) => {
        const title = m.querySelector(".ProductItem__Title")?.innerText;
        const price = m.querySelector(".ProductItem__Price")?.innerText;
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

const urls = ["https://medihacambaz.com/collections/shop-tum-gelinlikler"];
export { urls };
