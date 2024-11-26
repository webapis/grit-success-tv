
import scroller from "./scroller.js";
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 5000));
    });
    console.log('inside first route')
    await enqueueLinks({
        selector: 'a',
        label: 'second',
    });

}

export async function second({
    page,
    productListSelector,
    productItemSelector,
    titleSelector,
    imageSelector,
    linkSelector,

}) {
    const url = await page.url()
    debugger
    // Check if there are any product items on the page
    const productItemsCount = await page.$$eval(productListSelector, elements => elements.length);

    if (productItemsCount > 0) {
        await scroller(page, 150, 5)
        const data = await page.evaluate((params) => {
            const pageTitle = document.title
            const pageURL = document.URL

            const result = Array.from(document.querySelectorAll(params.productItemSelector)).map(m => {
                try {

                    const title = m.querySelector(params.titleSelector).innerText
                    const img = m.querySelector(params.imageSelector).srcset
                    const link = m.querySelector(params.linkSelector).href


                    return {
                        title,
                        price: 0,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return {
                        error,
                        message: error.message,
                        content: m.innerHTML
                    }
                }
            })

            return result
        }, {
            productListSelector,
            productItemSelector,
            titleSelector,
            imageSelector,
            linkSelector,
        })

        console.log('data.length', data.length)
        return data
    } else {
        console.log('not product page', url)
        return []
    }
}



