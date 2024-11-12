
export default async function first({ page, enqueueLinks }) {

    const url =await page.url()


        await page.waitForSelector('.menu a')

        const urls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.menu a')).map(m => m.href)
        })
        if (urls.length === 0) {
            throw 'urls.length===0 :https://www.ipekyol.com.tr/'
        }
        console.log('aggregation urls.length', urls.length)
        console.log('aggregation urls', urls)
        for (let u of urls) {
    
            await addRequests([{ url: u, label: 'second' }])
        }
        //pagination

    
    
    }
    
    export async function second({page}){
        const productItemsCount = await page.locator('.prd-list').count();
    

    
        if (productItemsCount > 0 ) {
            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const result = Array.from(document.querySelectorAll('.product-item')).map(document => {
                    try {
                        const title = document.querySelector('.name').innerText
                        const price = document.querySelector('.salesprice').innerText
                        const img =document.querySelector('[data-image-src]').getAttribute('data-image-src')
                        const link = document.querySelector('.prd-lnk').href
    
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
        
            return []
    
    
        }
    }
    
    const urls = ["https://www.ipekyol.com.tr/"]
    export { urls }
    
    //https://chatgpt.com/g/g-2DQzU5UZl-code-copilot/c/a5874bbc-35cb-4e6c-a6f9-237d252bdcd0
    
    //https://claude.ai/chat/713c2483-9805-4e58-b28b-adcab68ddfa1