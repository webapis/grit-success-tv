
export default async function first({ page, enqueueLinks, request, log, addRequests }) {


    // await enqueueLinks({
    //     selector: '.navigation a',
    //     label: 'first',
    // });
    await enqueueLinks({
        selector: '.pagination a',
        label: 'first',
    });

    //pagination

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-item-box')).map(m => {
            const title = m.querySelector('.product-name')?.innerText
            const discount = m.querySelector('.product-discounted-price')?.innerText

            const price = m.querySelector('.product-list-price')?.innerText
            const img = m.querySelector("[src]")?.src
            const link = m.querySelector("a").href

            return {
                title,
                price: discount ? discount : price,
                oldPrice: price,
                discount,
                img,
                link
            }
        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.lovemybody.com.tr/"]
export { urls }