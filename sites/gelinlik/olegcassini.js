export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  for (let page of Array.from({ length: 11 }, (_, index) => index + 1)) {
    await addRequests([
      {
        url: `https://olegcassini.com.tr/gelinlik?page=${page}`,
        label: "first",
      },
    ]);
  }
  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(
      document.querySelectorAll(".product-container")
    ).map((m) => {
      const title = m.querySelector(".product-name")?.innerText;
      const price = Array.from(
        m.querySelectorAll(".discount-price span")
      ).reverse()[0].innerText;
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

const urls = ["https://olegcassini.com.tr/gelinlik"];
export { urls };
