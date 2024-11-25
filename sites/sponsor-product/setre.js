
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });

    const productItemsCount = await page.$$eval('.ProductListContent', elements => elements.length);
  //  const productItemsCount = await page.locator('.ProductListContent').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {

            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItem')).map(document => {
                try {
                    const title = document.querySelector('.productName.detailUrl').innerText

                    const lastPrice = document.querySelector('.productPrice .lastprice')?.innerText
                    const price = document.querySelector('.discountPriceSpan').innerText
                    const img = document.querySelector('.productImage [data-original]').getAttribute('data-original')


                    const link = document.querySelector('.productName.detailUrl a').href
                    return {
                        title,
                        link,
                        price: lastPrice ? lastPrice : price,
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
    } else {
        return []
    }

}


const urls = ["https://www.setre.com"]
export { urls }