
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()


    await page.waitForSelector('.nav-links a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.nav-links a') ).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://dericompany.com.tr/kadin-deri-mont'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    await autscroll(page, 200)

    const productItemsCount = await page.locator('.category__list__main').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const breadcrumb = Array.from(document.querySelectorAll('.breadcrumb-item')).map(m => m.innerText).join(' ')
            const pageTitle = document.title + ' ' + breadcrumb
            const pageURL = document.URL
            const content = document.innerHTML

            try {

                const result = Array.from(document.querySelectorAll('a.grid')).map(element => {

                    const title = element.querySelector(".product-name")?.innerText

                    const price = element.querySelector(".price-main")?.innerText

                    const img = element.querySelector('src')?.getAttribute('src') //|| document.querySelector('[srcset]')?.getAttribute('srcset') || document.innerHTML//.split(',')[8].trim().split(' ')[0]
                    //const img1 = document.querySelector('[src]')?.src
                    const link = element.href
                    return {
                        title,
                        link,
                        price,
                        img,
                        pageTitle,
                        pageURL: element.baseURI
                    }
                })

                return result
            } catch (error) {
                return { error, message: error.message, content, pageURL }
            }
        })
        debugger
        return data
    } else {
        return []
    }
}

const urls = ["https://dericompany.com.tr/kadin-deri-mont", "https://dericompany.com.tr/erkek-deri-ceket"]
export { urls }