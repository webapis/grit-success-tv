
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    // await enqueueLinks({
    //     selector: 'a.m-siteMap__link',
    //     label: 'first',
    // });


    const productCount = await page.evaluate(() => parseInt(document.querySelector('.o-productList__top--breadcrumbCount')?.innerText?.replace(/[^\d]/gi, '')))
    const totalPages = Math.ceil(productCount / 48)
    await addRequests([{ url, label: 'second' }])
    if (productCount > 0 && totalPages > 1) {

        for (let i = 2; i <= totalPages; i++) {

            await addRequests([{ url: `${url}?sayfa=${i}`, label: 'second' }])

        }
    }



}

export async function second({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.o-productList__itemWrapper')).map(m => {
            const title = m.querySelector('.m-productCard__desc')?.innerText
            const price = m.querySelector('.m-productCard__newPrice')?.innerText
            const lastPrice = m.querySelector('.m-productCard__lastPrice')?.innerText
            const img = m.querySelector('[data-src]')?.getAttribute('data-src')
            const link = m.querySelector('.m-productCard__photo a').href
            return {
                title,
                price: lastPrice ? lastPrice : price,
                img,
                link

            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })




    debugger
    return data.map(m => {return {...m, price: m.price.replace("Ek İndirimle\n", '')}})
}

const urls = ["https://www.beymen.com/tr/kadin-giyim-triko-kazak-10048"]
export { urls }