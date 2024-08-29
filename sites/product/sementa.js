export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: ".pagination a",
    label: "first",
  });
  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll("product-block")).map(
      (m) => {
        const title = m.querySelector(".product-block__title")?.innerText;
        const price = m.querySelector(".price__current")?.innerText.trim();
        const img ="https:"+ m.querySelector('[srcset]')?.getAttribute('srcset').split(",")[1].trim().split(" ")[0]
        const link =m.querySelector("a").href
        return {
          title,
          price,
            img,
            link
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

const urls = ["https://www.sementa.com/collections/kadin-buyuk-beden-elbise"];
export { urls };
