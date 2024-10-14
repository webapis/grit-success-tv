
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });


    //pagination

    // const productCount = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span')?.innerText.replace(/[^\d]/gi, '')))


    // const totalPages = Math.ceil(productCount / 24)




    // if (productCount > 0 && totalPages > 1) {

    //     for (let i = 1; i <= totalPages; i++) {

    //         await addRequests([{ url: `${url}?sayfa=${i}`, label: 'second' }])

    //     }
    // }
    const productItemsCount = await page.locator('.ProductListContent').count();

    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItem')).map(document => {
                try {
                    const title = document.querySelector('.productName')?.innerText
                   // const price = document.querySelector('.discountPrice')?.innerText
                    const discountPrice =document.querySelector('.discountPriceSpan')?.innerText
                    const img = document.querySelector('[data-original]').getAttribute("data-original")
                    const link = document.querySelector(".detailUrl").href
                    return {
                        title,
                        price:discountPrice,
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

const urls = ["https://www.modalogy.com.tr/"]
export { urls }