
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    await enqueueLinks({
        selector: 'ul[role="menu"] li a',
        label: 'first',
    });
    const productItemsCount = await page.$$eval('.col-md-3.col-sm-3.col-xs-6.wow', elements => elements.length);
   // const productItemsCount = await page.locator('.col-md-3.col-sm-3.col-xs-6.wow').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.col-md-3.col-sm-3.col-xs-6.wow')).map(document => {
                try {
                    const title = document.querySelector('.product_name').innerText

                    const price = document.querySelector('.price')?.innerText
                    const turkcellPrice = document.querySelector('.turkcell-price span')?.innerText
                    const img = document.querySelector('.product_image img').src

                    const link = document.querySelector('.product_name').href
                    return {
                        title,
                        price: turkcellPrice ? turkcellPrice : price,
                        img,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, content: document.innerHTML, pageURL }
                }

            })

            return result
        })


        console.log('data.length', data.length)

        debugger
        return data
    } else {
        console.log('not a product page', url)
        return []
    }




}



const urls = [
    "https://www.matras.com/yeni-urun",
    "https://www.matras.com/canta-modelleri",
    "https://www.matras.com/ayakkabi-modelleri",
    "https://www.matras.com/bot",
    "https://www.matras.com/cuzdan-modelleri",
    "https://www.matras.com/kemer-modelleri",
    "https://www.matras.com/aksesuar",
    "https://www.matras.com/seyahat",
    "https://www.matras.com/yeni-urun",
    "https://www.matras.com/canta-modelleri",
    "https://www.matras.com/ayakkabi-modelleri",
    "https://www.matras.com/bot",
    "https://www.matras.com/cuzdan-modelleri",
    "https://www.matras.com/kemer-modelleri",
    "https://www.matras.com/aksesuar",
    "https://www.matras.com/seyahat"
]
export { urls }