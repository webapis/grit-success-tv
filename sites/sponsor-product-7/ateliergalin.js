
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger
    debugger
    await page.waitForSelector('a.header__menu-item')
    debugger
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a.header__menu-item')).map(m => m.href)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

export async function second({ page }) {
    const url = await page.url()
    const productItemsCount = await page.locator('#product-grid').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.grid__item')).map(document => {
                try {
                    const title = document.querySelector('.card__heading a').innerText.trim()

                    // const price = document.querySelector('.price-item.price-item--sale.price-item--last .money.buckscc-money')?.innerText

                    // const img ='https:'+ document.querySelector('.card__media img').srcset.split(',')[4].split(' ')[0]

                    // const link = document.querySelector('h3.card__heading a').href
                    return {
                        title,
                        // price,
                        // img,
                        // link,
                        // pageTitle, pageURL

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

const urls = [
    "https://www.ateliergalin.com/collections/all",
]
export { urls }