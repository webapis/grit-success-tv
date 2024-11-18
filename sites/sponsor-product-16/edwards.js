
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

    const productItemsCount = await page.locator('.product-grid-item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-grid-item')).map(document => {
                try {
                    const title = document.querySelector('.product-tile-body__link').innerText
                    //lazyloaded        
                    //swiper-lazy
                    const img1 = document.querySelector('.product-tile-image__picture  img.lazyloaded')?.scr
                    const img2 = document.querySelector('.product-tile-image__picture  img.swiper-lazy')?.dataset.src
                    //  const img = document.querySelector('.product-tile-image__picture source').dataset.srcset

                    const link = document.querySelector('.product-tile-body__link').href
                    return {
                        title,
                        price: 0,
                        img: img1 || img2,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result.filter(f => f.img)
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = ["https://www.edwards.com.tr/kadin/","https://www.edwards.com.tr/erkek/"
]
export { urls }