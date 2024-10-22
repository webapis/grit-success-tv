
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    await enqueueLinks({
        selector: '.first-catogry a',
        label: 'first',
    });

    //pagination
    const productItemsCount = await page.locator('.product-list-container').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const breadcrumb = document.querySelectorAll('.breadcrumb a') ? Array.from(document.querySelectorAll('.breadcrumb a')).map(m => m.innerText).join(' ') : ' '
            const pageTitle = document.title + ' ' + breadcrumb
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.prod-card')).map(document => {
                try {
                    const title = document.querySelector('.productbox-name')?.innerText
                    const price = document.querySelector('.product-box-price')?.innerText
                    const img = document.querySelector("[data-src]").getAttribute('data-src')
                    const link = document.querySelector('a').href
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

        debugger
        return data
    } else {

        return []
    }


}

const urls = ["https://www.yargici.com"]
export { urls }