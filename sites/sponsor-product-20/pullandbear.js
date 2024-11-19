
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

    const productItemsCount = await page.locator('legacy-product').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('legacy-product')).map(document => {
                try {
                    const title = document.querySelector('.name span').innerText
                    const img1 = document.querySelector('.image-responsive').src
                    const price =document.querySelector('.product-price--price')?.innerText
                    const link = document.querySelector('.carousel-item-container').href
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
     "https://www.pullandbear.com/tr/erkek-n6228",
     "https://www.pullandbear.com/tr/kadin-n6417"
]
export { urls }