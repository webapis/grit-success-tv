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
    const result = Array.from(
      document.querySelectorAll(".product-miniature")
    ).map((m) => {
      const title = m.querySelector(".product-title a")?.textContent.trim();
      const price = m.querySelector(".price")?.innerText.trim();
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

const urls = ["https://www.galaway.co/23-gelin-elbiseleri"];
export { urls };
