

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('.main-nav a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.main-nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.mudo.com.tr/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }




}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const productItemsCount = await page.$$eval('.list__products', elements => elements.length);
  //  const productItemsCount = await page.locator('.list__products').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(document => {
                try {
                    const title = document.querySelector('.product-item__name').innerText
                    const price = Array.from(document.querySelector('.product-item__price').querySelectorAll('pz-price')).reverse()[0].innerText
                    const img = document.querySelector('.pz-image-placeholder [data-srcset]').getAttribute('data-srcset')
                    const link = document.querySelector('.product-item__name').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result
        })

        return data
    } else {

        return []
    }
}



const urls = ["https://www.mudo.com.tr/"]
export { urls }