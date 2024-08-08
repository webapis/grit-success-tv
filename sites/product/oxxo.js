
import scrollNTimes from "../../src/scrollNTimes.js";
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.MainMenuOuther a',
        label: 'first',
    });
    
    // await scrollNTimes(page, 5, 400)

    const dataLayer = await page.evaluate(() => {

        window.scrollTo(0, document.body.scrollHeight);

        return dataLayer
    })
    const category = dataLayer.find((f) => f.event === 'ee_productImpression')

    debugger
    // await autoscroll(page,200)
    //pagination
    if (category) {

        const categoryId = category.category_id
        const pageUrl = url + `#wd=1&o=3&prc=&ct=${categoryId}&u=48&g=3,2&p=100`
        debugger
        await addRequests([{ url: pageUrl, label: 'second' }])


        debugger

    } else {
        return []
    }


}


export async function second({ page, enqueueLinks, request, log, addRequests }) {

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

    return data

}

const urls = ["https://www.oxxo.com.tr/"]
export { urls }