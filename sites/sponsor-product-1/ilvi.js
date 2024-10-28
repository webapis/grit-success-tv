

export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.navigation a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.ilvi.com/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

    const productItemsCount = await page.locator('.ProductList').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML
            try {

                const result = Array.from(document.querySelectorAll('.productItem')).map(document => {

                    const title = document.querySelector('.productName a').innerText
                    const price = document.querySelector('.product-price')?.innerText
                    const basketPrice = document.querySelector('.setrowSepetKategori div')?.innerText.replace('Sepetteki Fiyatı', '')
                    const discountPrice = document.querySelector('.discountPriceSpan')?.innerText

                    const img = document.querySelector('[data-original]').getAttribute('data-original')
                    //const img1 = document.querySelector('[src]')?.src
                    const link = document.querySelector('.productName a').href
                    return {
                        title,
                        link,
                        price: basketPrice ? basketPrice : discountPrice,
                        img,
                        pageTitle,
                        pageURL
                    }
                })

                return result
            } catch (error) {
                return { error, message: error.message, content, pageURL }
            }
        })
        debugger
        console.log('data.length', data.length)
        return data
    } else {

        console.log('not produсе page:', url)
        return []
    }
}


const urls = ["https://www.ilvi.com/"]
export { urls }