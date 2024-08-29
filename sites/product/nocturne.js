
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


  await enqueueLinks({
        selector: '.main-menu a',
        label: 'first',
    });


    //pagination
   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result =Array.from(document.querySelectorAll('.pitem')).map(m=>{
            const title =m.querySelector('.product-name')?.innerText
            const oldPrice = m.querySelector('.oneprice')?.innerText
            const newPrice = m.querySelector('.newprice')?.innerText
            const img =m.querySelector('[data-original]')?.getAttribute('data-original')
            const link =m.querySelector('.product-image a').href
                return {
                    title,
                    newPrice,
                    oldPrice,
                    price:newPrice?newPrice:oldPrice,
                    img,
                    link
                }
            })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.nocturne.com.tr/"]
export { urls }