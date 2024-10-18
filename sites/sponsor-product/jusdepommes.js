

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.header__menu a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://jusdepommes.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()
    await enqueueLinks({
        selector: 'pagination-custom a',
        label: 'second',
    });

   
    const productItemsCount = await page.locator('.collection__products').count();
    if (productItemsCount > 0) {

        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-grid-item')).map(document => {

                try {

                   const title =document.querySelector('.product__grid__title').innerText

                    const price = document.querySelector('.price').innerText
                    const img = 'https:' + document.querySelector('[data-bgset]').getAttribute('data-bgset').trim().split(',')[2].trim().split(' ')[0]
                    const link = document.querySelector('.product__grid__info a').href
                    return {
                        title,
                        price,
                        img,
                        link,
                        pageTitle,
                        pageURL
                    }
                } catch (error) {
                    return { error, meggage: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result
        })

        return data
    } else {
        console.log('not product page:', url)
        return []
    }
}

const urls = [
    "https://jusdepommes.com/"
]
export { urls }