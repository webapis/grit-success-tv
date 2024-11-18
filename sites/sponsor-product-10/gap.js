
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger

    //await page.waitForSelector('.navigation__item')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href).filter((f,i)=>i<5)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

export async function second({ page }) {
    const url = await page.url()

    const productItemsCount = await page.locator('[data-product]').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('[data-product]')).map(document => {
                try {

                    const { product: { name, price, productimage_set, absolute_url } } = JSON.parse(document.querySelector('[data-product]').getAttribute('data-product'))[0]
                    const { image } = productimage_set[0]
                    const link = 'https:/' + absolute_url
                    return {
                        title: name,
                        price,
                        img: image,
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

const urls = [
    "https://gap.com.tr/",
]
export { urls }