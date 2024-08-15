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

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".listeleme_link")).map(
      (m) => {
        const title = m.querySelector(".text-center strong")?.innerText;
        const price = m.querySelector(".indirimli-f")?.innerText;
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

const urls = ["https://aysirashop.com/tr/n/gelinlik/"];
export { urls };
