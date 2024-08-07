
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const result = await enqueueLinks({
        selector: '.page-body-content-sitemap a',
        label: 'first',
    });

   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-card')).map(m => {

            const title = document.querySelector('.product-card__title a')?.innerText
            const price = document.querySelector('.product-card__price--new')?.innerText
            const priceBacket = document.querySelector('.product-card__price--basket div')?.textContent
            return {
                title,
                price: priceBacket ? priceBacket : price
            }

        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.lcw.com/site-haritasi"]
export { urls }