
//import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.page-sitemap')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.page-sitemap a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.wcollection.com.tr/site-haritasi'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    await enqueueLinks({
        selector: '.w-pagination a',
        label: 'second',
    });

    try {

        await page.waitForSelector('.product-item', { timeout: 5000 })
        const productItemsCount = await page.locator('.product-item').count();
        if (productItemsCount > 0) {
            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const content = document.innerHTML
                try {

                    const result = Array.from(document.querySelectorAll('.product-item')).map(document => {

                        const title = document.querySelector('.product-title .title').innerText
                        const price = document.querySelector('.product-item__price--retail').innerText
                        const discountPrice = document.querySelector('.discount-price').innerText
                        const img = document.querySelector('swiper-slide img')?.src
                        const link = document.querySelector('wcollection-swiper').parentElement.href
                        return {
                            title,
                            link,
                            price: discountPrice ? discountPrice : price,
                            img,
                            pageTitle,
                            pageURL
                        }
                    })

                    return result
                } catch (error) {
                    return { error, message: error.message, content, pageURL }
                }
            })
            debugger
            console.log('data.length', data.length)
            return data
        } else {

            console.log('not produсt page:', url)
            return []
        }
    } catch (error) {

        console.log('not produсt page:-', url)
    }

}


const urls = ["https://www.wcollection.com.tr/site-haritasi"]
export { urls }