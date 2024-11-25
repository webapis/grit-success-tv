
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('nav a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.divarese.com.tr/'
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
        await page.waitForSelector('.products')
        const productItemsCount = await page.$$eval('.products', elements => elements.length);
       // const productItemsCount = await page.locator('.products').count();
        if (productItemsCount > 0) {
            await autscroll(page, 150)
            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const content = document.innerHTML


                const result = Array.from(document.querySelectorAll('.products__item')).map(element => {
                    try {
                        const title = element.querySelector('.product__title').innerText
                        const basketPrice = element.querySelector('.product__campaignFeaturedArea')?.innerText
                        const price = element.querySelector('.product__price.-actual').innerHTML
                        const img = Array.from(element.querySelectorAll('source[srcset]')).map(m => m.getAttribute('srcset')).filter(f => f.includes('.jpg'))[0]
                        const link = element.querySelector('a.product__badges').href
                        return {
                            title,
                            link,
                            price: basketPrice ? basketPrice : price,
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

    } catch (error) {
        console.log('not produсt page:-', url)
    }


}


const urls = ["https://www.divarese.com.tr/"]
export { urls }