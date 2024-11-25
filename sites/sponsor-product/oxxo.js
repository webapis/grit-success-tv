

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    // Array.from(document.querySelectorAll('#MainMenu li a[href^="/tr/"]')).map(m=>m.href).filter(f=>f.split('/').length<8 )
    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#MainMenu li a[href^="/tr/"]')).map(m => m.href).filter(f => f.split('/').length < 8)
    })
    for (let u of urls) {

        await addRequests([{ url: u, label: 'first' }])
    }
    const productItemsCount = await page.$$eval('.Products', elements => elements.length);

   // const productItemsCount = await page.locator('.Products').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.Prd')).map(document => {
                try {
                    const title = document.querySelector('.PName')?.innerText
                    const price = document.querySelector('.PPrice')?.innerText
                    const img = document.querySelector('[data-src]')?.getAttribute('data-src')
                    const img1 = document.querySelector('.PImage')?.src
                    const link = document.querySelector("a[data-product]").href
                    return {
                        title,
                        price,
                        img: img || img1,
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



const urls = ["https://www.oxxo.com.tr/"]
export { urls }