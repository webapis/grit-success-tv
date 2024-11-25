
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.nav-item a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.nav-item a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.elleshoes.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

    const productItemsCount = await page.$$eval('.ProductList', elements => elements.length);
   // const productItemsCount = await page.locator('.ProductList').count();
    if (productItemsCount > 0) {
       //  await autscroll(page, 150)
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML


            const result = Array.from(document.querySelectorAll('.productItem')).map(element => {
                try {
                    const title = element.querySelector('.productName a').innerText.trim()

                    const price = element.querySelector('.KatSepetFiyat3 span').innerText

                    const img = element.querySelector('[data-src]').getAttribute('data-src')

                    const link = element.querySelector('.detailLink').href
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


const urls = ["https://www.elleshoes.com/"]
export { urls }