
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.main-menu a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.main-menu a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.penti.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
/*     await enqueueLinks({
        selector: '.w-pagination a',
        label: 'second',
    });
 */


    const productItemsCount = await page.$$eval('.prd-link', elements => elements.length);
  //  const productItemsCount = await page.locator('.prd-link').count();
    if (productItemsCount > 0) {
        //  await autscroll(page, 150)
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML
            try {

                const result = Array.from(document.querySelectorAll('.prd-link')).map(document => {

                    const title = document.querySelector('.prd-title').innerText.trim()
                    const price = document.querySelector('.prc.prc-last').innerText.trim()
                    const img = document.querySelector('[data-src]').getAttribute('data-src')
                    const link = document.href
                    return {
                        title,
                        link,
                        price,
                        img,
                        pageTitle,
                        pageURL
                    }
                })

                return result.filter(f => f.link)
            } catch (error) {
                return { error, message: error.message, content, pageURL }
            }
        })
        debugger
        console.log('data.length', data.length)
        return data
    } else {

        console.log('not produсt page:', url)
        return []
    }


}


const urls = ["https://www.penti.com/"]
export { urls }