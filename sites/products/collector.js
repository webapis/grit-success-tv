
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
    titleAttr = "innerText",
    imageSelector,
    imageAttr = 'src',
    imagePrefix = '',
    linkSelector,
    breadcrumb = () => ""

}) {
    const url = await page.url()
    debugger
    // Check if there are any product items on the page
    const productItemsCount = await page.$$eval(productListSelector, elements => elements.length);

    if (productItemsCount > 0) {
        await scroller(page, 150, 5)
        const data = await page.evaluate((params) => {
            const breadcrumb = new Function(`return (${params.breadcrumb})`)(document)
            const pageTitle = document.title + ' ' + breadcrumb
            const pageURL = document.URL

            function isStringAFunction(str) {
                try {
                    // Attempt to create a function from the string
                    const fn = new Function(`return (${str})`)();
                    return typeof fn === 'function';
                } catch (e) {
                    // If an error occurs, it's not a valid function
                    return false;
                }
            }
            const result = Array.from(document.querySelectorAll(params.productItemSelector)).map(m => {
                try {

                    const title = m.querySelector(params.titleSelector).getAttribute(params.titleAttr)
                    const img = isStringAFunction(params.imageSelector) ? new Function(`return (${params.imageSelector})`)(m) : m.querySelector(params.imageSelector).getAttribute(params.imageAttr)
                    const link = isStringAFunction(params.linkSelector) ? new Function(`return (${params.linkSelector})`)(m) : m.querySelector(params.linkSelector).href
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
            titleAttr,
            imageSelector,
            imageAttr,
            imagePrefix,
            linkSelector,
            breadcrumb
        })

        console.log('data.length', data.length)
        console.log('error.length', data.filter(f => f.error).length)
        if (data.filter(f => f.error).length > 0) {
            console.log(data.filter(f => f.error)[0])
        }
        return data
    } else {
        console.log('not product page', url)
        return []
    }
}



