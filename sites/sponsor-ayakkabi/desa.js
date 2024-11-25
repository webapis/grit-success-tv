
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.navigation a')
    
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation a')).map(m => m.href).filter(f=>f)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.desa.com.tr/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

    await enqueueLinks({
        selector: ".category_sub_category",
        label: "second",
      });
      const productItemsCount = await page.$$eval('.js-list-content-item-wrapper', elements => elements.length);
   // const productItemsCount = await page.locator('.js-list-content-item-wrapper').count();
    if (productItemsCount > 0) {
       //  await autscroll(page, 150)
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML


            const result = Array.from(document.querySelectorAll('.product-item-box')).map(element => {
                try {
                    const title = element.querySelector('.product-name a').innerText.trim()

                    const price = element.querySelector('.product-sale-price').innerText

                    const img = element.querySelector('.product-item-image-2').src

                    const link = element.querySelector('.product-name a').href
                    return {
                        title,
                        link,
                        price,
                        img,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {

                    return { error, message: error.message, content, pageURL }
                }

            })

            return result

        })
        debugger
        console.log('data.length', data.length)
        return data
    } else {

        console.log('not produсt page:', url)
        return []
    }




}


const urls = ["https://www.desa.com.tr/"]
export { urls }