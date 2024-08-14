export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".card-container")).map(
      (m) => {
        const title = m.querySelector(".card__title-text")?.innerText;
        const price = m.querySelector(".money")?.innerText;
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

const urls = ["https://cengizakturk.com/collections/gelinlik-modelleri"];
export { urls };
