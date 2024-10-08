import autoScroll from "../../src/autoscroll.js";

export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  // await enqueueLinks({
  //     selector: '.nav-item a',
  //     label: 'first',
  // });
  await autoScroll(page, 200);

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result =Array.from(document.querySelectorAll(".ItemOrj")).map(
      (m) => {
        const title = m.querySelector(".productName")?.innerText;
        const price = m.querySelector(".discountPrice")?.innerText;
        const link =m.querySelector(".detailLink").href
        const img =m.querySelector("[data-original]").getAttribute('data-original')
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

const urls = ["https://www.bysaygi.com/buyuk-beden-58"];

export { urls };
