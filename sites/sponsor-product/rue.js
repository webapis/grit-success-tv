
import autoscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.rueonline.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }







}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

    const productItemsCount = await page.locator('.ProductList').count();
    if (productItemsCount > 0) {


        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.ProductItem__Wrapper')).map(document => {

                try {

                    const title = document.querySelector('.ProductItem__Wrapper h2').innerText

                    const price = document.querySelector('.ProductItem__Price.Price').innerText
                    const img = document.querySelector('.ProductItem__Image[srcset]') && 'https:' + document.querySelector('.ProductItem__Image[srcset]')?.getAttribute('srcset').split(',')[1].trim().split(' ')[0]
                    const img2 = 'https:' + document.querySelector('[data-src]')?.getAttribute('data-src').replace('{width}', '400')

                    const link = document.querySelector('h2.ProductItem__Title.Heading a').href
                    return {
                        title,
                        price,
                        img: img ? img : img2,
                        link,


                    }
                } catch (error) {
                    return { error, meggage: error.message, content: document.innerHTML }
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

const urls = ["https://www.rueonline.com/"]
export { urls }