export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: ".paginate-content a",
    label: "first",
  });

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".product-card")).map(
      (m) => {
        const title = m.querySelector(".product-card-meta h4").innerText;
        const price = m.querySelector(".n-price.orange").innerText;
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

const urls = [
  "https://www.kiyafetsepeti.com.tr/gelinlik?_gl=1*1bdl89i*_up*MQ..&gclid=Cj0KCQjwq_G1BhCSARIsACc7Nxqq2t6dja8RrwtQD27heS5aX6uCsGuJc5P9GM-dJdy48akAvWBWCiEaArL4EALw_wcB",
];
export { urls };
