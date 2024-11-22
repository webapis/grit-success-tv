
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger

    //await page.waitForSelector('.navigation__item')

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

    const productItemsCount = await page.$$eval('article[data-category]', elements => elements.length);
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result =Array.from(document.querySelectorAll('article[data-category]')).map(m=>{
                const title =m.querySelector('a').getAttribute('title')
                const href =m.querySelector('a').href
                const price =m.querySelector('p span')?.innerText
                const img =m.querySelector('[imagetype="PRODUCT_IMAGE"]')?.srcset.split(',')[0].split(' ')[0]
                return {
                    title,
                    price,
                    img,
                    href,
                    pageTitle,
                    pageURL
                }
            })
            return result.filter(f=>f.img)

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
     "https://www2.hm.com/tr_tr/index.html",
 
]
export { urls }