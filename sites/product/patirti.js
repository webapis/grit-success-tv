
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


  await enqueueLinks({
        selector: '.navbar a',
        label: 'first',
    });


    //pagination
   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.categoryitem')).map(m=>{
            const title = m.querySelector('.categoryname')?.innerText
                const price = m.querySelector('.pricenew')?.innerText
                return{
                    title,
                    price
                    
                }
            })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.patirti.com"]
export { urls }