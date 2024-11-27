
//import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.menu-container a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.lufian.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    // await enqueueLinks({
    //     selector: '.paginations a',
    //     label: 'first',
    // });
    //await autscroll(page, 200)
    const productItemsCount = await page.$$eval('#product-list-panel', elements => elements.length);
   // const productItemsCount = await page.locator('#product-list-panel').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML
            try {

                const result = Array.from(document.querySelectorAll('.product-item')).map(document => {

                    const title = document.querySelector('.product-title').innerText
                    const price = document.querySelector('.product-price').innerText
                    const priceBasket = document.querySelector('div.cart-discount')?.innerText
                    const img = document.querySelector('[data-src]').getAttribute('data-src')
                    const link = document.querySelector('a.product-title').href
                    return {
                        title,
                        link,
                        price: priceBasket ? priceBasket : price,
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

        console.log('not produсе page:', url)
        return []
    }
}


const urls = ["https://www.lufian.com/"]
export { urls }