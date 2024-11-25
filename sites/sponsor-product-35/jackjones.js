
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
    const productItemsCount = await page.$$eval('.scroll-product-item', elements => elements.length);
    //const productItemsCount = await page.locator('.product-item').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.scroll-product-item')).map(document => {
                try {
                    const title = document.querySelector('.card-title').innerText
                    const price= document.querySelector('.uk-h5.uk-margin-remove.uk-display-block.uk-line-height')?.innerText
                    const img1 = document.querySelector('.card-product img').src
     
                    const link = document.querySelector('.card-product a[data-href]').href
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

            return result//.filter(f => f.img)
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
     "https://jackjones.com.tr/",
 
]
export { urls }