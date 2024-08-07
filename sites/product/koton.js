
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const result = await enqueueLinks({
        selector: '.site-map__list a',
        label: 'first',
    });

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-item')).map(m => {

            const title = m.querySelector('.product-item__info-name').innerText
            const price = m.querySelector(".product-item__info-price").innerText
            return {
                title,
                price
            }

        })

        return result.map(m => { return { ...m, pageTitle, pageURL } })
    })

    debugger
    return data

}

const urls = ["https://www.koton.com/site-haritasi"]
export { urls }