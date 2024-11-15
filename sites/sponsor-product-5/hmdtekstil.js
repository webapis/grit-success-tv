
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()


    await page.waitForSelector('.menu-item a')

    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.menu-item a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.hmdtekstil.com.tr'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)
    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }





}

export async function second({ page }) {

    const productItemsCount = await page.locator('.main-products.product-grid').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-layout')).map(document => {
                try {
                    const title = document.querySelector('.caption .name  a').innerText
                    const price = document.querySelector('.price-normal')?.innerText
                    const img = document.querySelector('.img-responsive.img-first').srcset.split(' ')[0].trim()
                    const link = document.querySelector('.caption .name  a').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
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

const urls = ["https://www.hmdtekstil.com.tr/index.php?route=product/category&path=59",
    "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=71",
    "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=84",
    "https://www.hmdtekstil.com.tr/index.php?route=product/category&path=78"



]
export { urls }