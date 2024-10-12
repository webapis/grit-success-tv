
import autoscroll from "../../src/autoscroll.js";
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.SitemapSection a',
        label: 'first',
    });
    await autoscroll(page, 200)

    //pagination
    // const countProducts = await page.evaluate(() => parseInt(document.querySelector('.TotalProductCount')?.innerText.replace(/[^\d]/gi, '')))
    // const totalPages = Math.ceil(countProducts / 24)


    // for (let i = 2; i <= totalPages; i++) {

    //     await addRequests([{ url: `${url}?p=${i}`, label: 'second' }])

    // }


}


export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const data = await page.evaluate(() => {

        try {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.Prd')).map(m => {
                const title = m.querySelector('.PName')?.innerText
                const price = m.querySelector('.PPrice')?.innerText
                const img = m.querySelector('[data-src]')?.getAttribute('data-src')
                const link = m.querySelector('.PrdImgsBox a').href
                return {
                    title,
                    price,
                    img,
                    link
                }
            })

            return result.map(m => { return { ...m, pageTitle, pageURL } })
        } catch (error) {
            return { error, content: m.innerHTML }
        }

    })

    debugger
    return data

}

const urls = ["https://www.bsl.com.tr/tr/elbise/gunluk-elbise"]
export { urls }