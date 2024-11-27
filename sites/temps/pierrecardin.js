
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger

    //await page.waitForSelector('.navigation__item')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

export async function second({ page }) {
    const url = await page.url()
    const productItemsCount = await page.$$eval('.js-product-list-item', elements => elements.length);
 //   const productItemsCount = await page.locator('.js-product-list-item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.js-product-list-item')).map(document => {
                try {
                    const title = document.querySelector('.product__listing--content h3').innerText
                    const img1 = document.querySelector('[data-src]').getAttribute('data-src')
                    const basketPrice =document.querySelector('.product__listing--basket-price span')?.innerText
                    const link = document.querySelector('.product__listing--content h3 a').href
                    return {
                        title,
                        price: basketPrice,
                        img: img1 ,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = ["https://www.pierrecardin.com.tr/"
]
export { urls }