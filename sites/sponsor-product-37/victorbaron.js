
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()



    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

export async function second({ page }) {
    const url = await page.url()
    const productItemsCount = await page.$$eval('.product-item', elements => elements.length);
    //const productItemsCount = await page.locator('.product-item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(document => {
                try {
                    const title = document.querySelector('.product-title').innerText
                    const price= document.querySelector('.product-price')?.innerText
                    const img1 = document.querySelector('[data-src]').getAttribute('data-src')
     
                    const link = document.querySelector('.product-title').href
                    return {
                        title,
                        price,
                        img: img1,
                        link,
                        pageTitle, pageURL
                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result.filter(f => f.img)
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }

}

const urls = [
     "https://victorbaron.com.tr/",
 
]
export { urls }