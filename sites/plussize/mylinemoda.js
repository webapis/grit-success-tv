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
        .querySelector(".appliedFilter.FiltrelemeUrunAdet span")
        ?.innerText.replace(/[^\d]/gi, "")
    )
  );

  const totalPages = Math.ceil(productCount / 36);

  if (productCount > 0 && totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      await addRequests([{ url: `${url}?sayfa=${i}`, label: "second" }]);
    }
  }

  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".ItemOrj")).map(
      (m) => {
        const title = m.querySelector(".productName a")?.innerText;
        const price = m.querySelector(".productPrice")?.innerText;
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
    const result = Array.from(document.querySelectorAll(".ItemOrj")).map(
      (m) => {
        const title = m.querySelector(".productName a")?.innerText;
        const price = m.querySelector(".discountPrice span")?.innerText;
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

const urls = ["https://www.mylinemoda.com/buyuk-beden-elbise"];
export { urls };
