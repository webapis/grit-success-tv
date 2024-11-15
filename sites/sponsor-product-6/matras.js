
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()


    await page.waitForSelector('.nav.navbar-nav a')

    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.nav.navbar-nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw `urls.length===0 :${url}`
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)
    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }





}

export async function second({ page, enqueueLinks }) {
    await enqueueLinks({
        selector: 'ul[role="menu"] li a',
        label: 'second',
    });
    const productItemsCount = await page.locator('.col-md-3.col-sm-3.col-xs-6.wow').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.col-md-3.col-sm-3.col-xs-6.wow')).map(document => {
                try {
                    const title = document.querySelector('.product_name').innerText

                    const price = document.querySelector('.price')?.innerText
                    const turkcellPrice = document.querySelector('.turkcell-price span')?.innerText
                    const img = document.querySelector('.product_image img').src

                    const link = document.querySelector('.product_name').href
                    return {
                        title,
                        price: turkcellPrice ? turkcellPrice : price,
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

const urls = ["https://www.matras.com/"]
export { urls }