
export default async function first({ page, enqueueLinks }) {

const url =await page.url()
    await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });
    // await enqueueLinks({
    //     selector: '.pagination a',
    //     label: 'first',
    // });
    
    //pagination
    const productItemsCount = await page.$$eval('.product-item', elements => elements.length);
  //  const productItemsCount = await page.locator('.product-item').count();

    const homepageElements = await page.locator('.homepage').count();

    if (productItemsCount > 0 && homepageElements===0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.product-item')).map(m => {
                try {
                    const title = m.querySelector('.product-item__name').innerText
                    const price = m.querySelector('.price__new').innerText
                    const img = m.querySelector('[srcset]').getAttribute('srcset')
                    const link = m.querySelector('.product-item__name').href

                    return {
                        title,
                        price,
                        img,
                        link
                    }
                } catch (error) {
                    return { error, content: m.innerHTML }
                }

            })

            return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
        })

        console.log('.product-item exists');
        return data

    } else {
        console.log('.product-item does not exist');
        return []


    }


}



const urls = ["https://www.adl.com.tr"]
export { urls }

//https://chatgpt.com/g/g-2DQzU5UZl-code-copilot/c/a5874bbc-35cb-4e6c-a6f9-237d252bdcd0

//https://claude.ai/chat/713c2483-9805-4e58-b28b-adcab68ddfa1