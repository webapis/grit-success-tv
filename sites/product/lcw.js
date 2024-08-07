
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const result = await enqueueLinks({
        selector: '.lcw-site-map-category a',
        label: 'first',
    });

   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-card')).map(m => {

            const title =m.querySelector('.product-card__title')?.innerText
            const price =  m.querySelector('.product-price__price')?.innerText
    
            return {
                title,
                price
            }

        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.lcw.com/site-haritasi"]
export { urls }