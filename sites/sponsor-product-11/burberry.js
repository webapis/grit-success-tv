
import autoscroll from "../../src/autoscroll.js"

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()


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

    const productItemsCount = await page.locator('.product-listing-shelf__product-card').count();
    if (productItemsCount > 0) {

        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-listing-shelf__product-card')).map(document => {
                try {
                    const title = document.querySelector('.product-card-v2-title').innerText
                    //lazyloaded        
                    //swiper-lazy
                    const img1 = document.querySelector('.media-carousel-container__media.product-card-v2-carousel-container__media__source').src
                    const img2 = document.querySelector('picture source ')?.srcset.split(' ')[0]
                    const price = document.querySelector('.product-card-v2-price__current')?.innerText
                    //  const img = document.querySelector('.product-tile-image__picture source').dataset.srcset

                    const link = document.querySelector('a').href
                    return {
                        title,
                        price,
                        img: img1, //|| img2 ,
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

const urls = [
    "https://tr.burberry.com/",
]
export { urls }