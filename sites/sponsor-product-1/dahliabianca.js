
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.top-menu a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.top-menu a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.dahliabianca.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()


    try {

        await page.waitForSelector('.product-item', { timeout: 5000 })

        const productItemsCount = await page.locator('.product-grid').count();
        if (productItemsCount > 0) {
            //  await autscroll(page, 150)
            const data = await page.evaluate(() => {
                const breadcrumb=Array.from(document.querySelectorAll('.breadcrumb a')).map(m=>m.innerText).join(' ')
                const pageTitle = document.title +'_ '+breadcrumb
                const pageURL = document.URL
                const content = document.innerHTML
                try {

                    const result = Array.from(document.querySelectorAll('.product-item')).map(document => {

                        const title = document.querySelector('.product-title').innerText

                        const price = document.querySelector('.price.actual-price').innerText

                        const img = document.querySelector('[data-src]').getAttribute('data-src')

                        const link = document.querySelector('.product-title a').href
                        return {
                            title,
                            link,
                            price,
                            img,
                            pageTitle,
                            pageURL
                        }
                    })

                    return result
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
    } catch (error) {
        console.log('not produсt page:-', url)
    }




}


const urls = ["https://www.dahliabianca.com/"]
export { urls }