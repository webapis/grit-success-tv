export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  await enqueueLinks({
    selector: ".pagination-list a",
    label: "first",
  });

  const data = await page.evaluate(() => {
    const pageTitle = document.title;
    const pageURL = document.URL;
    const result = Array.from(document.querySelectorAll(".card .card-content"))
      .map((m) => {
        const title = m.querySelector(
          ".underline.mt-5.mb-auto.has-text-grey-darken.is-text-truncated.fs-16 "
        )?.innerText;
        const price = m
          .querySelector(".fs-16.has-text-weight-bold.mt-20")
          ?.innerText.split("-");
        return {
          title,
          price,
        };
      })
      .filter((f) => f.title);

    return result.length > 0
      ? result
      : [];
  });

  return data.flatMap((item) => {
    return item.price?.map((price) => ({
      title: item.title,
      price: price.trim(),
      pageTitle,
      pageURL
    }));
  });
}

const urls = ["https://dugun.com/gelinlik"];
export { urls };
