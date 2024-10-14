
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: 'a.m-siteMap__link',
        label: 'first',
    });


    // const productCount = await page.evaluate(() => parseInt(document.querySelector('.o-productList__top--breadcrumbCount')?.innerText?.replace(/[^\d]/gi, '')))
    // const totalPages = Math.ceil(productCount / 48)
    // await addRequests([{ url, label: 'second' }])
    // if (productCount > 0 && totalPages > 1) {

    //     for (let i = 2; i <= totalPages; i++) {

    //         await addRequests([{ url: `${url}?sayfa=${i}`, label: 'second' }])

    //     }
    // }
    const productItemsCount = await page.locator('.o-productList').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.o-productList__itemWrapper')).map(document => {
                try {
                    const title = document.querySelector('.m-productCard__desc')?.innerText
                    const price = document.querySelector('.m-productCard__newPrice')?.innerText
                    const lastPrice = document.querySelector('.m-productCard__lastPrice')?.innerText
                    const img = document.querySelector('[data-src]')?.getAttribute('data-src')
                    const link = document.querySelector('.m-productCard__photo a').href
                    return {
                        title,
                        price: lastPrice ? lastPrice : price,
                        img,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result
        })




        debugger
        return data.map(m => { return { ...m, price: m.price.replace("Ek İndirimle\n", '') } })
    } else {

        return []
    }



}



const urls = ["https://www.beymen.com/home/sitemap"]
export { urls }