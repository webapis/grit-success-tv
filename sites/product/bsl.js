

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.SitemapSection a',
        label: 'first',
    });
    //await autoscroll(page, 200)

    //pagination
    const countProducts = await page.evaluate(() => parseInt(document.querySelector('.TotalProductCount')?.innerText.replace(/[^\d]/gi, '')))
    const totalPages = Math.ceil(countProducts / 24)


    for (let i = 2; i <= totalPages; i++) {

        await addRequests([{ url: `${url}?p=${i}`, label: 'second' }])

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

    debugger
    return data

}
//.replace(/[^\d]/gi,''))
const urls = ["https://www.bsl.com.tr/tr/site-haritasi"]
export { urls }