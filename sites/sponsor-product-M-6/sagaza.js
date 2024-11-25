
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.header__menu a',
        label: 'first',
    });

    //   await enqueueLinks({
    //         selector: '.pagination-custom a',
    //         label: 'first',
    //     });


    //pagination
    const productItemsCount = await page.$$eval('.collection__content', elements => elements.length);
  //  const productItemsCount = await page.locator('.collection__content').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-grid-item')).map(document => {
                try {
                    const title = document.querySelector('.product__grid__title')?.innerText
                    const price = document.querySelector('.price')?.innerText
                    const img = "https:" + document.querySelector('[srcset]').getAttribute('srcset').trim().split(' ')[0]
                    const link = document.querySelector("a").href
                    return {
                        title,
                        price,
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



const urls = ["https://sagaza.com/"]
export { urls }