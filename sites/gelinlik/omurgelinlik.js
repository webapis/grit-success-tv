export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: "a.page-link",
    label: "first",
  });

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".card-product")).map(
      (m) => {
        const title = m.querySelector("div.title")?.innerText;
        const price = m.querySelector(".sale-price")?.innerText;
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

const urls = ["https://www.omurgelinlik.com/gelinlik"];
export { urls };
