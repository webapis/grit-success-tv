
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: '.page-body-content-sitemap a',
        label: 'first',
    });

    const productCount = await page.evaluate(() => parseInt(document.querySelector('.catalog__meta--product-count')?.innerText.replace(/[^\d]/gi, '')))
    const totalPages = Math.ceil(productCount / 66)




    if (productCount > 0 && totalPages > 1) {

        for (let i = 1; i <= totalPages; i++) {

            await addRequests([{ url: `${url}?page=${i}`, label: 'second' }])

        }
    }


}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const data = await page.evaluate(() => {
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
    })

    debugger
    return data.map(m => { return { ...m, price: m.price.replace('\nTL', '') } })
}

const urls = ["https://www.defacto.com.tr/statik/sitemap"]
export { urls }