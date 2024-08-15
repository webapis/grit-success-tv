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

const urls = ["https://tuvanam.com/collections/glam-you-bridal"];
export { urls };
