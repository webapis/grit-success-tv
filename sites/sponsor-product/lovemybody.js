
export default async function first({ page, enqueueLinks, request, log, addRequests }) {
debugger

    await enqueueLinks({
        selector: '.navigation a',
        label: 'first',
    });
    // await enqueueLinks({
    //     selector: '.pagination a',
    //     label: 'first',
    // });

    //pagination

    const data = await page.evaluate(() => {
        const pageTitle = document.title
        const pageURL = document.URL
        const result = Array.from(document.querySelectorAll('.product-item-box')).map(m => {
            const title = m.querySelector('.product-name')?.innerText
            const sepeteIndirim = document.querySelector('.product-item__campaign')? Array.from(document.querySelector('.product-item__campaign')?.querySelectorAll('span'))?.reverse()[0]?.innerText:undefined
            const productDiscountPrice = document.querySelector('.product-discounted-price')?.innerText
            const productSalePrice = document.querySelector('.product-sale-price')?.innerText
            const img = m.querySelector("[src]")?.src
            const link = m.querySelector("a.product-name").href
            try {
                return {
                    title,
                    price: sepeteIndirim ? sepeteIndirim : (productDiscountPrice ? productDiscountPrice : productSalePrice),
                    img,
                    link,
                    sepeteIndirim,
                    productDiscountPrice,
                    productSalePrice

                }
            } catch (error) {
                return { error, content: m.innerHTML }
            }

        })

        return result.length > 0 ? result.map(m => { return { ...m, pageTitle, pageURL } }) : []
    })

    debugger
    return data

}

const urls = ["https://www.lovemybody.com.tr/"]
export { urls }