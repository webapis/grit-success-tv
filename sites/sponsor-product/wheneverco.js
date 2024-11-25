

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation-list a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.wheneverco.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }







}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    const productItemsCount = await page.$$eval('.product-list', elements => elements.length);
 //   const productItemsCount = await page.locator('.product-list').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-list-item')).map(document => {
                try {
                    const title = document.querySelector('.product-name').innerText
                    const price = document.querySelector('.product-current-price').innerText.replaceAll('\n', ' ')
                    const img = 'https:' + document.querySelector('.product-image [data-lazysrc]').getAttribute('data-lazysrc')
                    const link = document.querySelector('.product-image a').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result
        })

        return data
    } else {
        console.log('not product page:', url)
        return []
    }
}



const urls = ["https://www.wheneverco.com/"]
export { urls }