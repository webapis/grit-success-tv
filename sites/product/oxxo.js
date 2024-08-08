

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()
    await enqueueLinks({
        selector: '.MainMenuOuther a',
        label: 'first',
    });
    
  

    const dataLayer = await page.evaluate(() => {

       

        return dataLayer
    })
    const category = dataLayer.find((f) => f.event === 'ee_productImpression')


    if (category) {

        
        const pageUrl = url + `?p=100`
        debugger
        await addRequests([{ url: pageUrl, label: 'second' }])


        

    } else {
        return []
    }


}


export async function second({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.Prd')).map(m => {
            const title = m.querySelector('.PName')?.innerText
            const price = m.querySelector('.PPrice')?.innerText
            return {
                title,
                price
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    return data

}

const urls = ["https://www.oxxo.com.tr/"]
export { urls }