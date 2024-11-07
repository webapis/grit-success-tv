
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('nav a')
    // const urls = await page.evaluate(() => {

    //     return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    // })
    // if (urls.length === 0) {
    //     throw 'urls.length===0 :https://tr.manuatelier.com/'
    // }
    // console.log('aggregation urls.length', urls.length)
    // console.log('aggregation urls', urls)

    // for (let u of urls) {

    //     await addRequests([{ url: u, label: 'first' }])
    // }
    await enqueueLinks({
        selector: 'nav a',
        label: 'first',
    });
    
    const pageURL = await page.url()


    const productItemsCount = await page.locator('.collection__products').count();
    if (productItemsCount > 0) {
        await autscroll(page, 150)
        const data = await page.evaluate((_pageURL) => {
            const pageTitle = document.title

            const content = document.innerHTML


            const result = Array.from(document.querySelectorAll('.grid-item.product-item')).map( element => {
                try {
                    const title = element.querySelector('.product-item__title').innerText.trim().replace('From', "")
                    const price = element.querySelector('.price .new-price').innerText.trim()

                    const img = element.querySelectorAll('[srcset]')[0].src

                    const link = element.querySelector('.product-link').href
                    return {
                        title,
                        link,
                        price,
                        img,
                        pageURL: _pageURL,
                        pageTitle
                    }
                } catch (error) {

                    return { error, message: error.message, content, pageURL:_pageURL }
                }

            })

            return result

        },pageURL)
        debugger
        console.log('data.length', data.length)
        return data
    } else {

        console.log('not produсt page:', pageURL)
        return []
    }

}
export async function second({ page, enqueueLinks, request, log, addRequests }) {




}


const urls = ["https://tr.manuatelier.com/"]
export { urls }