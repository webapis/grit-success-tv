
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.navbar__item a',
        label: 'first',
    });

    const productCount = await page.evaluate(() => parseInt(document.querySelector('.js-total-products-count')?.innerText))
    const totalPages = Math.ceil(productCount / 60)
    if (productCount > 0 && totalPages > 1) {
        for (let i = 2; i <= totalPages; i++) {

            await addRequests([{ url: `${url}?page=${i}`, label: 'second' }])

        }
    }

    //pagination



}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.products__item')).map(m => {
            const title = m.querySelector('.product__title ')?.innerText
            const actual = m.querySelector('.product__price.-actual')?.innerText
            const basket = m.querySelector('.wis-price-260995')?.innerText
            return {
                title,
                basket,
                actual,
                price: basket ? basket : actual
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data
}

const urls = ["https://www.network.com.tr"]
export { urls }