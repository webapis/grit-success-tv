export default async function first({
    page,
    enqueueLinks,
    request,
    log,
    addRequests,
  }) {
    const url = await page.url();
  
    await enqueueLinks({
      selector: "#main-menu a",
      label: "first",
    });
    const productItemsCount = await page.$$eval('#catalog-list', elements => elements.length);
  //  const productItemsCount = await page.locator("#catalog-list").count();
    if (productItemsCount > 0) {
      const data = await page.evaluate(() => {
        const pageTitle = document.title;
        const pageURL = document.URL;
        const result = Array.from(
          document.querySelectorAll(".product-item")
        ).map((document) => {
          try {
            const title = document.querySelector('.product-title a').innerText
            const cartPrice =document.querySelector('.cart-price')?.innerText
            const price = document.querySelector('.current-price')?.innerText
            const img = document.querySelector('.image-inner source').getAttribute('srcset')
            const link =document.querySelector('.product-title a').href
            return {
              title,
              link,
              price: cartPrice ? cartPrice : price,
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
  
  const urls = ["https://gustoeshop.com/"];
  export { urls };
  