
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('nav a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.brooksbrothers.com.tr/'
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
        await page.waitForSelector('.max-w-xl.fade-in')
        const productItemsCount = await page.$$eval('.max-w-xl.fade-in', elements => elements.length);
       // const productItemsCount = await page.locator('.max-w-xl.fade-in').count();
        if (productItemsCount > 0) {
            await autscroll(page, 150)
            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const content = document.innerHTML


                const result = Array.from(document.querySelectorAll('.max-w-xl.fade-in')).map(document => {
                    try {
                        const title = document.querySelector('h3.text-primary a.inline-block.line-clamp-2').innerText
                        const price = document.querySelector('.flex.flex-wrap.items-center.gap-2 span.text-primary').innerText
                        const img = document.querySelector('[srcset]')?.getAttribute('srcset').split(',')[7].trim().split(' ')[0]
                        const link = document.querySelector('h3.text-primary a.inline-block.line-clamp-2').href
                        return {
                            title,
                            link,
                            price,
                            img,
                            pageTitle,
                            pageURL

                        }
                    } catch (error) {
                        return { error, message: error.message, content, pageURL }
                    }

                })

                return result

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


const urls = ["https://www.brooksbrothers.com.tr/"]
export { urls }