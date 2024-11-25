
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
    const productItemsCount = await page.$$eval('.products__items', elements => elements.length);
  //  const productItemsCount = await page.locator('.products__items').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.js-product-wrapper.product-item')).map(document => {
                try {
                    const title = document.querySelector('.product-item__name').innerText
                    const price = document.querySelector('.price__new').innerText

                    const img1 = document.querySelector('[data-src]').getAttribute('data-src')
                    // const img2 = document.querySelector('.product-tile-image__picture  img.swiper-lazy')?.dataset.src
                    //  const img = document.querySelector('.product-tile-image__picture source').dataset.srcset

                    const link = document.querySelector('.js-product-anchor').href
                    return {
                        title,
                        price,
                        img: img1,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result//.filter(f => f.img)
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
    "https://www.converse.com.tr/",
]
export { urls }