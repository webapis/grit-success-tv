

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await page.waitForSelector('nav a')
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('nav a')).map(m => m.href)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.brooksbrothers.com.tr/'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }


}
export async function second({ page, enqueueLinks, request, log, addRequests }) {
    const url = await page.url()

        try {
            await page.waitForSelector('.fade-in .block a')
            const productItemsCount = await page.locator('.fade-in .block a').count();
            if (productItemsCount > 0) {
                //  await autscroll(page, 150)
                const data = await page.evaluate(() => {
                    const pageTitle = document.title
                    const pageURL = document.URL
                    const content = document.innerHTML
                    try {
        
                        const result = Array.from(document.querySelectorAll('.fade-in .block a') ).map(document => {
        
                            const title = document.querySelector('h3.text-primary a.inline-block.line-clamp-2').innerText
        
                            const price = document.querySelector('.flex.flex-wrap.items-center.gap-2 span.text-primary').innerText
                            const img = document.querySelector('[srcset]').getAttribute('srcset').split(',')[7].trim().split(' ')[0]
        
                            const link = document.querySelector('h3.text-primary a.inline-block.line-clamp-2').href
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
         
        } catch (error) {
            console.log('not produсt page:-', url)
        }



 

}


const urls = ["https://www.brooksbrothers.com.tr/"]
export { urls }