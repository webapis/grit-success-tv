import autoscroll from "../../src/autoscroll.js";
export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await autoscroll(page, 150);
  //pagination

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".categoryitem")).map(
      (m) => {
        const title = m.querySelector(".categoryname")?.innerText;
        const price = Array.from(
          m.querySelector(".pricenew")?.childNodes
        )
          .reverse()
          .map((node) => {
            const price =
              node.nodeType === Node.TEXT_NODE
                ? node.nodeValue.trim()
                : node.textContent;
            return price;
          })[0];
          const img =m.querySelector("[data-src]").getAttribute('data-src')
          const link ='https://www.patirti.com'+ m.querySelector('.categoryitemlink').href
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

const urls = ["https://www.patirti.com/buyuk-beden/"];
export { urls };
