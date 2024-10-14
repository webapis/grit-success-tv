
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.ems-menu.modal a',
        label: 'first',
    });

    //pagination

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.ems-prd')).map(document => {

            try {
                const title = document.querySelector('.ems-prd-title').innerText
                const price = document.querySelector('.ems-prd-price-last').innerText
                const link = document.querySelector(".item-link").href
                const img = document.querySelector("[data-image-src]").getAttribute("data-image-src")
                return {
                    title,
                    price,
                    link,
                    img,
                    pageTitle,
                    pageURL
                }
            } catch (error) {
                return { error, content: document.innerHTML, pageURL }
            }

        })

        return result
    })

    debugger
    return data

}

const urls = ["https://www.machka.com.tr/"]
export { urls }