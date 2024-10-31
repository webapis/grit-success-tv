

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('#mainMenu a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('#mainMenu a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.woody.com.tr/'
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
        selector: '.pagination a',
        label: 'second',
    });




    const productItemsCount = await page.locator('.product-grid').count();
    if (productItemsCount > 0) {
        //  await autscroll(page, 150)
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const content = document.innerHTML
            try {

                const result = Array.from(document.querySelectorAll('.productItem')).map(document => {

                    const title =  document.querySelector('.productName').innerText

                    const price = document.querySelector('.newPrice.active').innerText

                    const img = 'https://www.woody.com.tr'+ document.querySelector('.imgInner.stImage [srcset]').getAttribute('srcset')

                    const link = document.querySelector('.productName').href
                    return {
                        title,
                        link,
                        price,
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

        console.log('not produсt page:', url)
        return []
    }


}


const urls = ["https://www.woody.com.tr/"]
export { urls }