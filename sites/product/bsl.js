
import autoscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.SitemapSection a',
        label: 'first',
    });
    await autoscroll(page, 200)

    //pagination

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.Prd')).map(m => {
            const title = m.querySelector('.PName')?.innerText
            const price = m.querySelector('.PPrice')?.innerText
            return {
                title,
                price
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.bsl.com.tr/tr/site-haritasi"]
export { urls }