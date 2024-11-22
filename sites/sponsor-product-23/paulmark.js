
export default async function first({ page, enqueueLinks, request, log, addRequests }) {

    const url = await page.url()

    //await autoScroll(page, 200);
    debugger

    //await page.waitForSelector('.navigation__item')

    const urls = await page.evaluate(() => {

        return Array.from(document.querySelectorAll('a')).map(m => m.href)
    })
    console.log('aggregation urls', urls)
    for (let u of urls) {
        await addRequests([{ url: u, label: 'second' }])
    }

}

const getProductCount = async (page) => {
    try {
        await page.waitForSelector('.productItemLayout.ViewProduct', { timeout: 30000 });
        const productItemsCount = await page.$$eval('.productItemLayout.ViewProduct', elements => elements.length);
        return productItemsCount;
    } catch (error) {
        return 0;
    }
};
export async function second({ page }) {
    const url = await page.url()
    const productItemsCount =await getProductCount(page)
    // const productItemsCount = await page.locator('.productItemLayout.ViewProduct').count();
    if (productItemsCount > 0) {
        const data = await page.evaluate(() => {
            const pageTitle = document.title
            const pageURL = document.URL
            const result = Array.from(document.querySelectorAll('.productItemLayout.ViewProduct')).map(document => {
                try {
                    const title = document.querySelector('.product-name').innerText
                    const price = document.querySelector('.second-price.discountActivePrice')?.innerText || document.querySelector('.second-price')?.innerText
                    const img1 = document.querySelector('img.lazy').getAttribute('data-src')


                    const link = document.querySelector('a.item-img').href
                    return {
                        title,
                        price,
                        img: img1,
                        link,
                        pageTitle, pageURL

                    }
                } catch (error) {
                    return { error, message: error.message, content: document.innerHTML, pageURL }
                }

            })

            return result.filter(f => f.img)
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
    "https://www.paulmark.com.tr/",

]
export { urls }