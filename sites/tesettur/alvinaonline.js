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
        .querySelector(".TotalProductCountText")
        ?.innerText.replace(/[^\d]/gi, "")
    )
  );

  const totalPages = Math.ceil(productCount / 48);

  if (productCount > 0 && totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      await addRequests([{ url: `${url}?p=${i}`, label: "second" }]);
    }
  }

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".Prd")).map((m) => {
      const title = m.querySelector(".PName")?.innerText;
      const price = m.querySelector(".PPrice")?.innerText;
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
    const result = Array.from(document.querySelectorAll(".Prd")).map((m) => {
      const title = m.querySelector(".PName")?.innerText;
      const price = m.querySelector(".PPrice")?.innerText;
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

const urls = [
  "https://www.alvinaonline.com/tr/buyuk-beden/yaz-kreasyonu/elbise/",
];
export { urls };
