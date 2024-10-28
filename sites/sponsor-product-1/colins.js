
//import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.menu-container a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.colins.com.tr/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    // await enqueueLinks({
    //     selector: '.paginations a',
    //     label: 'first',
    // });
    //await autscroll(page, 200)

    const productItemsCount = await page.locator('.catalog-category').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML
            try {

                const result = Array.from(document.querySelectorAll('.productCartMain')).map(document => {

                    const title = document.querySelector('.product-name h3').innerText
                    const price = document.querySelector('.product-price')?.innerText
                    const priceNew = document.querySelector('.product-new-price')?.innerText

                    const img = document.querySelector('[data-secondary-image-src]').getAttribute('data-secondary-image-src')
                    //const img1 = document.querySelector('[src]')?.src
                    const link = document.querySelector('a.product-name').href
                    return {
                        title,
                        link,
                        price: priceNew ? priceNew : price,
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

        console.log('not produсе page:', url)
        return []
    }
}


const urls = ["https://www.colins.com.tr/"]
export { urls }