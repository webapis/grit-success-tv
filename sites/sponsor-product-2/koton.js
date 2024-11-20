
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

   // await page.waitForSelector('.site-map__list a')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href).filter(f => f)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.koton.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}

export async function second({ page }) {
    const url = await page.url()
    await page.waitForSelector('.list__products')
    const productItemsCount = await page.locator('.list__products').count();
    if (productItemsCount > 0) {

        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(m => {
                try {
                    const data = JSON.parse(m.querySelector('.js-insider-product').innerText)
                    const { product_image_url, unit_sale_price } = data
                    const title = m.querySelector('.product-item__info-name').innerText
                    // const price = m.querySelector(".product-item__info-price").innerText
                    const img = product_image_url
                    const link = m.querySelector(".product-link").href
                    return {
                        title,
                        price: unit_sale_price,
                        img,
                        link,
                        pageTitle,
                        pageURL

                    }
                } catch (error) {

                    return { error, message: error.message, content: m.innerHTML }
                }


            })

            return result
        })

        debugger
        return data

    } else {
        console.log('not product page', url)
        return []
    }

}


const urls = ["https://www.koton.com/"]
export { urls }