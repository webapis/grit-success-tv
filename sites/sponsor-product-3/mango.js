import autoScroll from "../../src/autoscroll.js";

export default async function first({
  page,
  enqueueLinks,
  request,
  log,
  addRequests,
}) {
  //await autoScroll(page, 200);
  await page.waitForSelector('a.site-map-item')

  const urls = await page.evaluate(() => {

    return Array.from(document.querySelectorAll('a.site-map-item')).map(m => m.href)
  })

  console.log('aggregation urls', urls)

  for (let u of urls) {

    await addRequests([{ url: u, label: 'second' }])
  }


  debugger;

}
export async function second({ page }) {
  const url = await page.url()
  const productItemsCount = await page.$$eval('[class^="Grid_grid"]', elements => elements.length);
 // const productItemsCount = await page.locator('[class^="Grid_grid"]').count();
  if (productItemsCount > 0) {
    const data = await page.evaluate(() => {

      const pageTitle = document.title;
      const pageURL = document.URL;
      const result = Array.from(document.querySelectorAll('[class^="ProductCard_productCard"]')).map(m => {
        try {
          return {
            title: m.querySelector('div[class^="ProductDetails_productInfo"] meta[content]').getAttribute('content'),
            price: m.querySelector('[class^="SinglePrice_start"]')?.innerText,
            img:document.querySelector('[class^="ProductImage_productImage"] img').srcset.split(',')[0],// m.querySelector('[class^="ProductImage_productImage"] img').src,
            link: m.querySelector('[class^="ProductImage_productImage"] a').href,
            pageTitle, pageURL
          }
        } catch (error) {
          return { error, message: error.message, pageURL }
        }

      })

      return result//.filter(f=>f.img)
    });
    console.log('data.length', data.length)
    return data;

  } else {
    console.log('not product page:', url)
  }

}
const urls = [
  "https://shop.mango.com/tr/sitemap",
];

export { urls };
