
export default async function first({ page, enqueueLinks,addRequests }) {

    const url =await page.url()

    await page.waitForSelector('#navigation a')
    
    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('#navigation a')).map(m => m.href).filter(f=>f)
    })
    if (urls.length === 0) {
        throw 'urls.length===0 :https://www.alfa-beta.com.tr'
    }
    console.log('aggregation urls.length', urls.length)
    console.log('aggregation urls', urls)

    for (let u of urls) {

        await addRequests([{ url: u, label: 'second' }])
    }
        await enqueueLinks({
            selector: '#navigation a',
            label: 'first',
        });
        // await enqueueLinks({
        //     selector: '.paginate-content a',
        //     label: 'first',
        // });
        
        //pagination

  
   
    
    
    }
    
    export async function second ({ page, enqueueLinks }){
        try {
            await page.waitForSelector('#product-list-container')
            const productItemsCount = await page.locator('#product-list-container').count();
        
    
        
            if (productItemsCount > 0) {
                const data = await page.evaluate(() => {
                    const pageTitle = document.title
                    const pageURL = document.URL
                    const result = Array.from(document.querySelectorAll('.showcase')).map(document => {
                        try {
                            const title = document.querySelector('.showcase-title a').getAttribute('title')
                            const price = document.querySelector('.showcase-price-new').innerText
                            const img = 'https:'+document.querySelector('.showcase-image [data-src]').getAttribute('data-src')
                            const link = document.querySelector('.showcase-image a').href
        
                            return {
                                title,
                                price,
                                img,
                                link,
                                pageTitle,
                                pageURL
                            }
                        } catch (error) {
                            return { error,message:error.message, content: m.innerHTML,pageURL }
                        }
        
                    })
        
                    return result
                })
        
                console.log('data.length',data.length)
                return data

        
            } else {
                console.log('not product page:-', url)
                return []
        
        
            }
        } catch (error) {
            
            console.log('not product page:-', url)
            return []
        }
    }
    
    const urls = ["https://www.alfa-beta.com.tr"]
    export { urls }
    
    //https://chatgpt.com/g/g-2DQzU5UZl-code-copilot/c/a5874bbc-35cb-4e6c-a6f9-237d252bdcd0
    
    //https://claude.ai/chat/713c2483-9805-4e58-b28b-adcab68ddfa1