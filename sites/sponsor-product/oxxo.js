

export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#MainMenu a')).map(m => m.href).filter((f) => !f.includes('undefined') && !f.includes('javascript'))
    })
    for (let u of urls) {

        await addRequests([{ url: `${u}?p=100`, label: 'second' }])
    }

    // const dataLayer = await page.evaluate(() => {

    //     return dataLayer
    // })
    // const category = dataLayer.find((f) => f.event === 'ee_productImpression')


    // if (category) {

    //     const pageUrl = url + `?p=100`
    //     debugger
    //     await addRequests([{ url: pageUrl, label: 'second' }])

    // } else {

    //     return []
    // }


}


export async function second({ page, enqueueLinks, request, log, addRequests }) {

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.Prd')).map(m => {
            const title = m.querySelector('.PName')?.innerText
            const price = m.querySelector('.PPrice')?.innerText
             const img =m.querySelector('[data-src]')?.getAttribute('data-src')
             const img1 =m.querySelector('.PImage')?.src
             const link =m.querySelector("a[data-product]").href
            return {
                title,
                price,
                img:img|| img1,
                link
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    return data

}

const urls = ["https://www.oxxo.com.tr/"]
export { urls }