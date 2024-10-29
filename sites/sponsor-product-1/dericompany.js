
import autscroll from '../../src/autoscroll.js'
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: '.nav-links a',
        label: 'first',
    });
    // await enqueueLinks({
    //     selector: '.paginations a',
    //     label: 'first',
    // });
    await autscroll(page, 200)

    const productItemsCount = await page.locator('.category__list__main').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const breadcrumb = Array.from(document.querySelectorAll('.breadcrumb-item')).map(m => m.innerText).join(' ')
            const pageTitle = document.title + ' ' + breadcrumb
            const pageURL = document.URL
            const content = document.innerHTML

            try {

                const result = Array.from(document.querySelectorAll('a.grid')).map(document => {

                    const title = document.querySelector(".product-name")?.innerText

                    const price = document.querySelector(".price-main")?.innerText

                    const img = document.querySelector('src')?.getAttribute('src') //|| document.querySelector('[srcset]')?.getAttribute('srcset') || document.innerHTML//.split(',')[8].trim().split(' ')[0]
                    //const img1 = document.querySelector('[src]')?.src
                    const link = document.href
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
        return data
    } else {
        return []
    }

}



const urls = ["https://dericompany.com.tr/kadin-deri-mont", "https://dericompany.com.tr/erkek-deri-ceket", "https://dericompany.com.tr/deri-kemer-deri-cuzdan"]
export { urls }