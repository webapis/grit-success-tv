
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('nav a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://tr.manuatelier.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()


    const productItemsCount = await page.locator('.collection__products').count();
    if (productItemsCount > 0) {
         await autscroll(page, 150)
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML


            const result = Array.from(document.querySelectorAll('.product-item')).map(element => {
                try {
                    const title = element.querySelector('.product-item__title').innerText.trim()
                    const price = element.querySelector('.new-price')?.innerHTML?.trim()

                    const img = element.querySelectorAll('[srcset]')[0].src

                    const link = element.querySelector('.product-link').href
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


const urls = ["https://tr.manuatelier.com/"]
export { urls }