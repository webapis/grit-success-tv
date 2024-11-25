
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()


    await page.waitForSelector('nav a')

    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://clothing.beautyomelette.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)
    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }





}

export async function second({ page }) {
    const productItemsCount = await page.$$eval('.o-productList', elements => elements.length);
 //   const productItemsCount = await page.locator('.o-productList').count();
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


        console.log('data.length', data.length)

        debugger
        return data.map(m => { return { ...m, price: m.price.replace("Ek İndirimle\n", '') } })
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = ["https://www.beymen.com/tr"]
export { urls }