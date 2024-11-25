

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://lovemetoo.com.tr/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }







}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()


    try {
        await page.waitForSelector('.product-block')
        const productItemsCount = await page.$$eval('.product-block', elements => elements.length);
        //const productItemsCount = await page.locator('.product-block').count();
        if (productItemsCount > 0) {


            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const result = Array.from(document.querySelectorAll('.product-block')).map(document => {

                    try {

                        const title = document.querySelector('.product-block__title').innerText

                        const price = document.querySelector('.money.conversion-bear-money').innerText
                        const img = 'https:' + document.querySelector('[data-lazy-bgset-src]').getAttribute('data-lazy-bgset-src')
                        const link = document.querySelector('.product-link').href
                        return {
                            title,
                            price,
                            img,
                            link,
                            pageTitle,
                            pageURL

                        }
                    } catch (error) {
                        return { error, meggage: error.message, content: document.innerHTML, pageURL }
                    }

                })

                return result
            })
            console.log('data.length', data.length)
            return data
        } else {
            console.log('not product page:', url)
            return []
        }
    } catch (error) {
        console.log('not product page:', url)
        return []
    }

}

const urls = ["https://lovemetoo.com.tr/"]
export { urls }