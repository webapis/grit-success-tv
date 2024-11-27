
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
    const productItemsCount = await page.$$eval('.product-item', elements => elements.length);
   // const productItemsCount = await page.locator('.product-item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(document => {
                try {

                    const title = document.querySelector('.product-item__info-product-name').innerText
                    const price = document.querySelector('.no-discount ')?.innerText
                    const img1 = document.querySelector('picture source')?.srcset 
                    const img2 = document.querySelector('picture source')?.getAttribute('data-srcset')

                    const link = document.querySelector('.product-item__body a').href
                    return {
                        title,
                        price,
                        img: img1 || img2,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result
        })


        console.log('data.length', data.length)
        console.log('errors',data.filter(f=>f.error).length)
        console.log('errors',data.filter(f=>f.error)[0])
        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = [
    "https://gap.com.tr/",
]
export { urls }