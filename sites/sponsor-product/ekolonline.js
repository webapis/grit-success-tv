export default async function first({
    page,
    enqueueLinks,
    request,
    log,
    addRequests,
  }) {
    const url = await page.url();
  
    await enqueueLinks({
      selector: "#navbar-content a",
      label: "first",
    });
  
    const productItemsCount = await page.locator(".productList").count();
    if (productItemsCount > 0) {
      const data = await page.evaluate(() => {
        const pageTitle = document.title;
        const pageURL = document.URL;
        const result = Array.from(
          document.querySelectorAll(".product-list-item")
        ).map((document) => {
          try {
            const title = document.querySelector(".mainTitle").innerText;
            const priceOne = document.querySelector(".mainFiyat span")?.innerText;
            const price = document.querySelector(".mainFiyat2")?.innerText;
            const img = document
              .querySelector("[data-img]")
              .getAttribute("data-img");
            const link = document.querySelector("a.product-figure").href;
  
            return {
              title,
              link,
              price: priceOne ? priceOne : price,
              img,
              pageTitle,
              pageURL,
            };
          } catch (error) {
            return {
              error,
              message: error.message,
              content: document.innerHTML,
              pageURL,
            };
          }
        });
  
        return result;
      });
      debugger;
      return data;
    } else {
      return [];
    }
  }
  
  const urls = ["https://www.ekolonline.com"];
  export { urls };
  