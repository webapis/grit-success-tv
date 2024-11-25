

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation a')).map(m => m.href)
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

export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()


    const productItemsCount = await page.$$eval('.productItem', elements => elements.length);
   // const productItemsCount = await page.locator('.productItem').count();
    if (productItemsCount > 0) {

        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItem')).map(document => {

                try {

                    const title = document.querySelector('.productName a').innerText

                    const price = document.querySelector('.discountPriceSpan').innerText
                    const img = document.querySelector('[data-original]').getAttribute('data-original')
                    const link = document.querySelector('.productName a').href
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
    "https://clothing.beautyomelette.com/",
    "https://cosmetics.beautyomelette.com/"
]
export { urls }