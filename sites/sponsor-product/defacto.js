
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: '.page-body-content-sitemap a',
        label: 'first',
    });


    const productItemsCount = await page.locator('[data-documents]').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            try {
                const pageTitle = document.title
                const pageURL = document.URL
                const result = Array.from(document.querySelectorAll('[data-documents]')).map(m => {

                    const title = m.querySelector('.product-card__title a')?.innerText
                    const price = m.querySelector('.product-card__price--new')?.innerText
                    const priceBacket = m.querySelector('.product-card__price--basket div')?.textContent
                    const img = m.querySelector('[data-srcset]')?.getAttribute('data-srcset').split(' ')[0]
                    const img1 = m.querySelector('.product-card__image--item.swiper-slide.swiper-slide-active img')?.getAttribute('src')
                    const color = JSON.parse(m.getAttribute('data-documents')).ColorName
                    const link = m.querySelector('.image-box a').href
                    return {
                        title,
                        link,
                        price: priceBacket ? priceBacket : price,
                        color,
                        img: 'https:' + (img1 || img),
                    }
                })

                return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
            } catch (error) {
                return { error, content: m.innerHTML }
            }
        })
        debugger
        return data.map(m => { return { ...m, price: m.price.replace('\nTL', '') } })
    } else {
        return []
    }

}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

}

const urls = ["https://www.defacto.com.tr/statik/sitemap"]
export { urls }