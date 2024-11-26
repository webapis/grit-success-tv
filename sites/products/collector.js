
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    // await page.waitForSelector('.site-map__list a')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href).filter(f => f)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.koton.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


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

    // Check if there are any product items on the page
    const productItemsCount = await page.$$eval(productListSelector, elements => elements.length);

    if (productItemsCount > 0) {
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


const urls = [

    {
        brand: "koton",
        urls: ["https://www.koton.com/"],
        productListSelector: '.list__products',
        productItemSelector: '.product-item',
        titleSelector: '.product-item__info-name',
        imageSelector: '.images.js-images source',
        linkSelector: '.product-link',
    },
    {
        brand: "defacto",
        urls: ["https://www.defacto.com.tr"],
        productListSelector: '#product-container',
        productItemSelector: '[data-documents]',
        titleSelector: '.product-card__title a',
        imageSelector: '.product-card__image--item img',
        linkSelector: '.image-box a',
    }
]

  
export { urls }