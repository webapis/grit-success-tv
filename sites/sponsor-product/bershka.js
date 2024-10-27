
import autoscroll from "../../src/autoscroll.js";
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: 'nav a',
        label: 'first',
    });



    const productItemsCount = await page.locator('.category-grid').count();

    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            try {

                const result = Array.from(document.querySelectorAll('.product-card')).map(document => {
                    const title = document.querySelector('.product-text p').innerText
                    const price = document.querySelector('.current-price-elem').innerText
                    const img = document.querySelector('[data-original]').getAttribute('data-original')
                    const link = document.querySelector('.grid-card-link').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                })

                return result
            } catch (error) {
                return { error, message: error.message, content: document.innerHTML, pageURL }
            }

        })

        debugger
        return data
    } else {

        return []
    }
}


export async function second({ page, enqueueLinks, request, log, addRequests }) {


}

const urls = ["https://www.bershka.com/tr/h-woman.html", "https://www.bershka.com/tr/h-man.html"]
export { urls }