
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.bds-c-grid-item.vendor')).map(m=>{

            const title =m.querySelector('.vendor-name.f-title-small-font-size.fw-title-small-font-weight.lh-title-small-line-height.ff-title-small-font-family.ffs-title-small-font-feature-settings').innerText
            const detail =m.querySelector('a')?.href
            
            return {
                title,
                detail
            }
            
        })
        return collection
    })
   

    for (let d of [...data]) {
        await addRequests([{ url: d.detail, label: 'second', userData: { firstData: d } }])
    }
    debugger
    // return data

}
export default async function second({ page, enqueueLinks, request, log, addRequests }) {


    const data = await page.evaluate(() => {
        const collection = Array.from(document.querySelectorAll('.bds-c-grid-item.vendor')).map(m=>{

            const title =m.querySelector('.vendor-name.f-title-small-font-size.fw-title-small-font-weight.lh-title-small-line-height.ff-title-small-font-family.ffs-title-small-font-feature-settings').innerText
            const detail =m.querySelector('a')?.href
            
            return {
                title,
                detail
            }
            
        })
        return collection
    })
   

    for (let d of [...data]) {
        await addRequests([{ url: d.detail, label: 'second', userData: { firstData: d } }])
    }
    debugger
    // return data

}
const urls = ["https://www.yemeksepeti.com/city/izmir"]
export { urls }