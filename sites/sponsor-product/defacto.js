
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
    debugger

    const url = await page.url()
    let urls = []
    debugger
    // const varOne = await page.$$('.story__item a')
    // debugger

    // if (varOne) {
    //     urls = await page.evaluate(() => {
    //         return Array.from(document.querySelectorAll('.story__item a')).map(m => m.href).filter(f => f)
    //     })

    // }
    const varTwo = await page.$$('.container.catalog__sub-categories--container .product-card__image')
    if (varTwo) {
        debugger
        urls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.container.catalog__sub-categories--container .product-card__image a')).map(m => m.href).filter(f => f)
        })
    }
    debugger


    if (urls.length === 0) {
        throw `urls.length===0 :${url}:`
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }




}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    try {

        await page.waitForSelector('#product-container')
        const productItemsCount = await page.locator('#product-container').count();
        if (productItemsCount > 0) {
            const data = await page.evaluate(() => {
                try {
                    const pageTitle = document.title
                    const pageURL = document.URL
                    const result = Array.from(document.querySelectorAll('[data-documents]')).map(m => {

                        const title = m.querySelector('.product-card__title a')?.innerText
                        const price = m.querySelector('.product-card__price--new')?.innerText
                        const priceBacket = m.querySelector('.product-card__price--basket div')?.textContent

                        const img1 = JSON.parse(m.getAttribute('data-documents')).PictureName
                        const color = JSON.parse(m.getAttribute('data-documents')).ColorName
                        const link = m.querySelector('.image-box a').href
                        return {
                            title,
                            link,
                            price: priceBacket ? priceBacket : price,
                            color,
                            img: 'https://dfcdn.defacto.com.tr/376/' + img1
                        }
                    })

                    return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
                } catch (error) {
                    return { error, content: m.innerHTML }
                }
            })
            debugger
            console.log('data.length:', data.length, 'url:', url)
            return data.map(m => { return { ...m, price: m.price.replace('\n', ' ') } })
        } else {
            console.log('not product page:', url)
            return []
        }
    } catch (error) {
        console.log('not product page:--', url)
    }

}

const urls = ["https://www.defacto.com.tr/kadin-giyim",
    "https://www.defacto.com.tr/kadin-ayakkabi",
    "https://www.defacto.com.tr/kadin-aksesuar",
    "https://www.defacto.com.tr/erkek-giyim",
    "https://www.defacto.com.tr/erkek-ayakkabi",
    "https://www.defacto.com.tr/erkek-aksesuar",
    "https://www.defacto.com.tr/kiz-cocuk-genc-kiz-giyim",
    "https://www.defacto.com.tr/kiz-cocuk-genc-kiz-aksesuar",
    "https://www.defacto.com.tr/kiz-cocuk-genc-kiz-ayakkabi",
    "https://www.defacto.com.tr/erkek-cocuk-genc-erkek-giyim",
    "https://www.defacto.com.tr/erkek-cocuk-genc-erkek-aksesuar",
    "https://www.defacto.com.tr/erkek-cocuk-genc-erkek-ayakkabi",
    "https://www.defacto.com.tr/kiz-bebek-giyim",
    "https://www.defacto.com.tr/kiz-bebek-aksesuar",
    "https://www.defacto.com.tr/kiz-bebek-ayakkabi",
    "https://www.defacto.com.tr/erkek-bebek-giyim",
    "https://www.defacto.com.tr/yenidogan"]
export { urls }