

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('#navigation a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.themolc.com/'
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
    //     selector: '.paginate-content a',
    //     label: 'second',
    // });

    const productItemsCount = await page.$$eval('#product-list-container', elements => elements.length);
   // const productItemsCount = await page.locator('#product-list-container').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.showcase')).map(document => {
                try {
                    const title = document.querySelector('.showcase-image a').getAttribute('title')
                    const price = document.querySelector('.showcase-price-new').innerText
                    const img = 'https:'+document.querySelector('.showcase-image [data-src]').getAttribute('data-src')
                    const link = document.querySelector('.showcase-image a').href
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

        return data
    } else {
        console.log('not product page:', url)
        return []
    }
}



const urls = ["https://www.themolc.com/"]
export { urls }