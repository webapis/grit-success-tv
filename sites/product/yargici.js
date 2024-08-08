
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


 
    //pagination
   
    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.prod-card')).map(m=>{
            const title =m.querySelector('.productbox-name')?.innerText
             const price =m.querySelector('.product-box-price')?.innerText
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

const urls = ["https://www.yargici.com/yeni-sezon-elbise"]
export { urls }