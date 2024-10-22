
export default async function first({ page, enqueueLinks }) {

    const url =await page.url()
        await enqueueLinks({
            selector: '.menu a',
            label: 'first',
        });

        
        //pagination
        const productItemsCount = await page.locator('.prd-list').count();
    

    
        if (productItemsCount > 0 ) {
            const data = await page.evaluate(() => {
                const pageTitle = document.title
                const pageURL = document.URL
                const result = Array.from(document.querySelectorAll('.prd')).map(document => {
                    try {
                        const title = document.querySelector('.prd-lnk').getAttribute('title')
                        const price = document.querySelector('.urunListe_satisFiyat').innerText
                        const img1 =document.querySelector('[data-image-src]')?.getAttribute('data-image-src')
                        const img =document.querySelector('[data-large]')?.getAttribute('data-large')
                        const link = document.querySelector('.prd-lnk').href
    
                        return {
                            title,
                            price,
                            img:img?img:img1,
                            link,
                            pageTitle,
                            pageURL
                        }
                    } catch (error) {
                        return { error, message:error.message, content: document.innerHTML, pageURL }
                    }
    
                })
    
                return result
            })
    
          
            return data
    
        } else {
        
            return []
    
    
        }
    
    
    }
    
    
    
    const urls = ["https://www.twist.com.tr/"]
    export { urls }
    
    //https://chatgpt.com/g/g-2DQzU5UZl-code-copilot/c/a5874bbc-35cb-4e6c-a6f9-237d252bdcd0
    
    //https://claude.ai/chat/713c2483-9805-4e58-b28b-adcab68ddfa1