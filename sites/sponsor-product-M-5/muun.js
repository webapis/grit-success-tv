

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.nav-item a',
        label: 'first',
    });


    const productItemsCount = await page.$$eval('.ProductList', elements => elements.length);
  //  const productItemsCount = await page.locator('.ProductList').count();

    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {

            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItem')).map(document => {
                try {
                    const title = document.querySelector('.detailLink.detailUrl').getAttribute('title')
                    const price = document.querySelector('.discountPriceSpan').innerText
                    const img = document.querySelector('.productImage img[data-original]').getAttribute('data-original')
                    const link = document.querySelector('.detailLink.detailUrl').href

                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    
                    return { error, message: error.message, pageURL, content: document.innerHTML }
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



const urls = ["https://www.muun.com.tr/"]
export { urls }