
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.navbar__item a',
        label: 'first',
    });

    // const productCount = await page.evaluate(() => parseInt(document.querySelector('.js-total-products-count')?.innerText))
    // const totalPages = Math.ceil(productCount / 60)
    // if (productCount > 0 && totalPages > 1) {
    //     for (let i = 2; i <= totalPages; i++) {

    //         await addRequests([{ url: `${url}?page=${i}`, label: 'second' }])

    //     }
    // }

    //pagination
    const productItemsCount = await page.locator('.products').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.products__item')).map(document => {
                try {
                    const title = document.querySelector('.product__title ')?.innerText
                    const actual = document.querySelector('.product__price.-actual')?.innerText
                    const basket = document.querySelector('.wis-price-260995')?.innerText
                    const img = document.querySelector("[data-srcset]").getAttribute("data-srcset")
                    const link = document.querySelector('a').href
                    return {
                        title,
                        basket,
                        actual,
                        price: basket ? basket : actual,
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

        debugger
        return data
    } else {
        return []
    }


}



const urls = ["https://www.network.com.tr"]
export { urls }