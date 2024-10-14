
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.main-menu a',
        label: 'first',
    });


    //pagination
    const productItemsCount = await page.locator('.product-list').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.pitem')).map(document => {
                try {
                    const title = document.querySelector('.product-name')?.innerText
                    const oldPrice = document.querySelector('.oneprice')?.innerText
                    const newPrice = document.querySelector('.newprice')?.innerText
                    const img = document.querySelector('[data-original]')?.getAttribute('data-original')
                    const link = document.querySelector('.product-image a').href
                    return {
                        title,
                        newPrice,
                        oldPrice,
                        price: newPrice ? newPrice : oldPrice,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result

        })

        return data
    } else {

        return []
    }

}

const urls = ["https://www.nocturne.com.tr/"]
export { urls }