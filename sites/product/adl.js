
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });
    await enqueueLinks({
        selector: '.pagination a',
        label: 'first',
    });

    //pagination

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-item')).map(m => {
            const title = m.querySelector('.product-item__name')?.innerText
            const price = m.querySelector('.price__new')?.innerText
            const img = m.querySelector('[srcset]')?.getAttribute('srcset')
            const link = m.querySelector('.list-slider-item__link').href
            return {
                title,
                price,
                img,
                link
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })


    return data

}



const urls = ["https://www.adl.com.tr/kadin-kazak/"]
export { urls }

//https://chatgpt.com/g/g-2DQzU5UZl-code-copilot/c/a5874bbc-35cb-4e6c-a6f9-237d252bdcd0

//https://claude.ai/chat/713c2483-9805-4e58-b28b-adcab68ddfa1