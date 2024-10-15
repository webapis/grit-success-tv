

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('.menu a')).map(m => m.href)
    })

    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


    




}

export async function second({ page, enqueueLinks, request, log, addRequests }){
    const productItemsCount = await page.locator('.catalogWrapper').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItem')).map(document => {
                try {
                    const title = document.querySelector('.productDetails .detailLink').innerText
                    const price = document.querySelector('.currentPrice').innerText
                    const img =document.querySelector('[itemprop="image"][content]').getAttribute('content')
        
                    const link = document.querySelector('.productDetails .detailLink').href
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
        console.log('not product page:', url)
        return []
    }
}



const urls = ["https://www.fever.com.tr/"]
export { urls }